import {
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  Group,
  MathUtils,
  PerspectiveCamera,
  Points,
  QuadraticBezierCurve3,
  Quaternion,
  Scene,
  ShaderMaterial,
  Sprite,
  SpriteMaterial,
  Vector3,
  type WebGLRenderer,
} from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { ADDITIVE, ENEMY, OWN, buildMissile, canvasTexture, createRenderer, glowTexture, releaseRenderer } from "./models";

/**
 * WebGL sky behind the Nuclear Wars landing: the game's ICBMs fly ballistic arcs through depth, each with its
 * whole trajectory dashed ahead of it (as on the globe), an exhaust trail behind and a reticle on the target.
 * About a third get intercepted by an ABM round; the rest land as a flash and a mushroom cloud.
 *
 * World units on the z = 0 plane equal CSS pixels, so screen points map straight into the scene. Everything
 * lives under `root`, which follows a share of the page scroll (the far layer of a parallax).
 */

type Side = "own" | "enemy" | "interceptor";
type V = Vector3;

const SIDE_COLOR: Record<Side, Color> = { own: new Color(OWN), enemy: new Color(ENEMY), interceptor: new Color("#c8ffb8") };
const FOV = 40;
const SEGMENTS = 120;
const MAX_MISSILES = 5;
const MAX_PUFFS = 1600;
/** Pull on sparks (puffs spawned with `falls`), px/s². */
const GRAVITY = 40;
/** Share of the scroll the sky follows. */
const PARALLAX = 0.25;

type Rgb = [number, number, number];
type Rgba = [number, number, number, number];
/** Exhaust: the side's color washed toward warm white; every puff cools to a dim gray-green. */
const EXHAUST: Record<Side, Rgba> = {
  own: exhaust(SIDE_COLOR.own),
  enemy: exhaust(SIDE_COLOR.enemy),
  interceptor: [0.75, 1, 0.7, 0.55],
};
const SMOKE: Rgb = [0.12, 0.16, 0.12];
function exhaust(c: Color): Rgba {
  return [0.55 + c.r * 0.45, 0.45 + c.g * 0.4, 0.3 + c.b * 0.3, 0.32];
}

const rand = MathUtils.randFloat;
const easeOut = (p: number) => 1 - (1 - p) ** 3;
const UP = new Vector3(0, 1, 0);

type Flight = {
  side: Side;
  /** Ballistic arc: launch point, apex control point, target (`v0`, `v1`, `v2`). */
  path: QuadraticBezierCurve3;
  /** Seconds before it leaves the ground, and in the air. */
  delay: number;
  duration: number;
  t: number;
  /** Share of the path where the interceptor meets it; `null` — it lands. */
  interceptAt: number | null;
  hunter?: Flight;
  head: Group | Sprite;
  flame?: Sprite;
  arc?: Line2;
  reticle?: Sprite;
  /** Seconds since the arc started drawing; after the end — since it started fading. */
  age: number;
  fading: number;
  emit: number;
  spin: number;
  /** Missile length, px at z = 0. */
  length: number;
  done: boolean;
};

type Blast = { age: number; life: number; size: number; big: boolean; flash: Sprite };

/** Additive soft points: exhaust, fireball, smoke and sparks in one draw call. */
class Puffs {
  readonly points: Points;
  private pos = new Float32Array(MAX_PUFFS * 3);
  private vel = new Float32Array(MAX_PUFFS * 3);
  private col = new Float32Array(MAX_PUFFS * 4);
  private size = new Float32Array(MAX_PUFFS);
  private life = new Float32Array(MAX_PUFFS);
  private age = new Float32Array(MAX_PUFFS);
  private grow = new Float32Array(MAX_PUFFS);
  private drag = new Float32Array(MAX_PUFFS);
  private falls = new Uint8Array(MAX_PUFFS);
  private start = new Float32Array(MAX_PUFFS * 4);
  private end = new Float32Array(MAX_PUFFS * 3);
  private base = new Float32Array(MAX_PUFFS);
  private next = 0;
  readonly material: ShaderMaterial;

  constructor() {
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(this.pos, 3));
    g.setAttribute("tint", new BufferAttribute(this.col, 4));
    g.setAttribute("size", new BufferAttribute(this.size, 1));
    this.material = new ShaderMaterial({
      uniforms: { scale: { value: 1 } },
      vertexShader: `
        attribute vec4 tint; attribute float size; uniform float scale; varying vec4 vTint;
        void main() {
          vTint = tint;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * scale / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec4 vTint;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          float a = pow(clamp(1.0 - d, 0.0, 1.0), 1.6);
          gl_FragColor = vec4(vTint.rgb, vTint.a * a);
        }`,
      ...ADDITIVE,
    });
    this.points = new Points(g, this.material);
    this.points.frustumCulled = false;
  }

  /**
   * Color goes from `rgba` to `endRgb` over the life, alpha fades out; size grows by `grow` per second; velocity
   * decays by `drag` per second. Only puffs that `falls` (sparks) feel gravity — smoke stays where it was left.
   */
  spawn(p: V, vx: number, vy: number, vz: number, rgba: Rgba, endRgb: Rgb, size: number, life: number, grow = 0, drag = 0, falls = false) {
    const i = this.next;
    this.next = (this.next + 1) % MAX_PUFFS;
    this.pos[i * 3] = p.x;
    this.pos[i * 3 + 1] = p.y;
    this.pos[i * 3 + 2] = p.z;
    this.vel[i * 3] = vx;
    this.vel[i * 3 + 1] = vy;
    this.vel[i * 3 + 2] = vz;
    this.start.set(rgba, i * 4);
    this.end.set(endRgb, i * 3);
    this.base[i] = size;
    this.size[i] = size;
    this.life[i] = life;
    this.age[i] = 0;
    this.grow[i] = grow;
    this.drag[i] = drag;
    this.falls[i] = falls ? 1 : 0;
  }

  step(dt: number) {
    for (let i = 0; i < MAX_PUFFS; i++) {
      if (this.age[i] >= this.life[i]) {
        // Zero size: a dead point covers no pixels (a transparent one would still be blended).
        this.size[i] = 0;
        continue;
      }
      const age = (this.age[i] += dt);
      const p = Math.min(age / this.life[i], 1);
      const k = Math.max(1 - this.drag[i] * dt, 0);
      this.vel[i * 3] *= k;
      this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * k - GRAVITY * dt * this.falls[i];
      this.vel[i * 3 + 2] *= k;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      this.size[i] = this.base[i] + this.grow[i] * age;
      for (let c = 0; c < 3; c++) this.col[i * 4 + c] = this.start[i * 4 + c] + (this.end[i * 3 + c] - this.start[i * 4 + c]) * p;
      // Quick fade-in, long fade-out.
      this.col[i * 4 + 3] = this.start[i * 4 + 3] * Math.min(p * 8, 1) * (1 - p) ** 1.5;
    }
    const g = this.points.geometry;
    g.attributes.position.needsUpdate = true;
    g.attributes.tint.needsUpdate = true;
    g.attributes.size.needsUpdate = true;
  }
}

/** Target crosshair; its own texture — a clone of the glow would share (and overwrite) the glow's image. */
const reticleTexture = () => canvasTexture(64, (ctx) => {
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(32, 32, 17, 0, Math.PI * 2);
  for (const [x1, y1, x2, y2] of [[4, 32, 18, 32], [46, 32, 60, 32], [32, 4, 32, 18], [32, 46, 32, 60]]) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(32, 32, 2.5, 0, Math.PI * 2);
  ctx.fill();
});

export class Sky {
  private renderer: WebGLRenderer;
  private scene = new Scene();
  private camera = new PerspectiveCamera(FOV, 1, 1, 6000);
  private root = new Group();
  private puffs = new Puffs();
  private flights: Flight[] = [];
  private blasts: Blast[] = [];
  private w = 1;
  private h = 1;
  private untilNext = 1.2;
  private scroll = 0;
  private time = 0;
  private reticleMap = reticleTexture();
  /** A faint ember behind the hull — barely there, as in the game. */
  private flameMaterial = new SpriteMaterial({ map: glowTexture(), color: "#ffb35c", opacity: 0.35, ...ADDITIVE });
  private tmp = new Vector3();
  private tmp2 = new Vector3();
  private quat = new Quaternion();
  private spinQuat = new Quaternion();

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = createRenderer(canvas);
    this.scene.add(this.root);
    this.root.add(this.puffs.points);
    this.scene.add(new AmbientLight("#9fb89a", 1.4));
    const key = new DirectionalLight("#ffffff", 2.6);
    key.position.set(-0.4, 1, 0.9);
    this.scene.add(key);
    const rim = new DirectionalLight("#7dff6a", 1.4);
    rim.position.set(0.8, -0.3, -1);
    this.scene.add(rim);
  }

  resize(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.position.set(0, 0, h / 2 / Math.tan(MathUtils.degToRad(FOV / 2)));
    this.camera.updateProjectionMatrix();
    this.puffs.material.uniforms.scale.value = this.camera.position.z * this.renderer.getPixelRatio();
    for (const f of this.flights) (f.arc?.material as LineMaterial | undefined)?.resolution.set(w, h);
  }

  /** Screen point → a point of the root group on the z = 0 plane. */
  private local(x: number, y: number, z: number): V {
    return new Vector3(x - this.w / 2, this.h / 2 - y - this.root.position.y, z);
  }

  /** Two flights already in the air so the first frame isn't an empty sky. */
  seed(scroll: number) {
    this.scroll = scroll;
    for (let i = 0; i < 2; i++) {
      const f = this.launch(this.randomTarget(), i ? "enemy" : "own", true);
      if (f) {
        f.t = rand(0.15, 0.45);
        f.age = 10;
      }
    }
  }

  /** Launch at a screen point (a click). */
  launchAt(x: number, y: number) {
    this.launch(this.local(x, y, rand(-80, 40)), "own", false);
  }

  private randomTarget(): V {
    return this.local(rand(0.08, 0.92) * this.w, rand(0.5, 0.9) * this.h, rand(-500, 60));
  }

  private launch(to: V, side: "own" | "enemy", mayIntercept: boolean): Flight | null {
    if (this.flights.filter((f) => f.side !== "interceptor" && !f.done).length >= MAX_MISSILES) return null;
    const { w, h } = this;
    const bottom = -h / 2 - this.root.position.y;
    // From below the edge opposite the target, so the arcs cross the screen.
    const fromLeft = to.x > 0;
    const from = new Vector3(fromLeft ? rand(-0.75, -0.35) * w : rand(0.35, 0.75) * w, bottom - rand(0.05, 0.2) * h, rand(-700, -100));
    const apex = new Vector3((from.x + to.x) / 2 + rand(-0.1, 0.1) * w, Math.max(from.y, to.y) + rand(0.75, 1.1) * h, (from.z + to.z) / 2 + rand(-200, 200));
    const path = new QuadraticBezierCurve3(from, apex, to);
    const duration = rand(9, 14);
    const interceptAt = mayIntercept && Math.random() < 0.3 ? rand(0.62, 0.85) : null;
    const color = SIDE_COLOR[side];
    const length = MathUtils.clamp(w / 30, 34, 50);
    const head = buildMissile(`#${color.getHexString()}`);
    head.scale.setScalar(length);
    // In the head's units (length 1): just behind the tail.
    const flame = new Sprite(this.flameMaterial);
    flame.position.set(0, -0.55, 0);
    head.add(flame);
    const flight: Flight = { side, path, delay: 0, duration, t: 0, interceptAt, head, flame, age: 0, fading: 0, emit: 0, spin: rand(0, 6), length, done: false };
    flight.arc = this.arc(path, color);
    flight.reticle = new Sprite(new SpriteMaterial({ map: this.reticleMap, color, ...ADDITIVE }));
    flight.reticle.position.copy(to);
    flight.reticle.scale.setScalar(26);
    head.visible = false;
    this.root.add(head, flight.arc, flight.reticle);
    this.flights.push(flight);

    if (interceptAt !== null) {
      // Leaves the ground ~2 s before the meeting point and arrives exactly there.
      const meet = path.getPoint(interceptAt);
      const hunterTime = 2;
      const hunterFrom = new Vector3(to.x + rand(-0.15, 0.15) * w, bottom - 20, meet.z + rand(-60, 60));
      const sprite = new Sprite(new SpriteMaterial({ map: glowTexture(), color: SIDE_COLOR.interceptor, ...ADDITIVE }));
      sprite.scale.setScalar(22);
      sprite.visible = false;
      flight.hunter = {
        side: "interceptor",
        path: new QuadraticBezierCurve3(hunterFrom, new Vector3((hunterFrom.x + meet.x) / 2, Math.max(hunterFrom.y, meet.y) + 0.08 * h, (hunterFrom.z + meet.z) / 2), meet),
        delay: Math.max(interceptAt * duration - hunterTime, 0),
        duration: hunterTime,
        t: 0,
        interceptAt: null,
        head: sprite,
        age: 0,
        fading: 0,
        emit: 0,
        spin: 0,
        length: 0,
        done: false,
      };
      this.root.add(sprite);
      this.flights.push(flight.hunter);
    }
    return flight;
  }

  /** The whole trajectory, dashed like the game's arc; drawn on at launch. */
  private arc(path: QuadraticBezierCurve3, color: Color): Line2 {
    const geometry = new LineGeometry();
    geometry.setPositions(path.getPoints(SEGMENTS).flatMap((p) => [p.x, p.y, p.z]));
    geometry.instanceCount = 0;
    const material = new LineMaterial({
      color,
      linewidth: 1.6,
      dashed: true,
      dashSize: 9,
      gapSize: 8,
      opacity: 0.5,
      ...ADDITIVE,
    });
    material.resolution.set(this.w, this.h);
    const line = new Line2(geometry, material);
    line.computeLineDistances();
    line.frustumCulled = false;
    return line;
  }

  step(dt: number, scroll: number) {
    this.time += dt;
    this.root.position.y += (scroll - this.scroll) * PARALLAX;
    this.scroll = scroll;

    this.untilNext -= dt;
    if (this.untilNext <= 0) {
      this.launch(this.randomTarget(), Math.random() < 0.55 ? "enemy" : "own", true);
      this.untilNext = rand(3, 6) * (this.w < 640 ? 1.5 : 1);
    }

    for (const f of this.flights) this.advance(f, dt);
    this.flights = this.flights.filter((f) => {
      if (!f.done || f.fading < 1.2) return true;
      this.dispose(f);
      return false;
    });
    for (const b of this.blasts) this.animateBlast(b, dt);
    this.blasts = this.blasts.filter((b) => {
      if (b.age < b.life) return true;
      this.root.remove(b.flash);
      b.flash.material.dispose();
      return false;
    });
    this.puffs.step(dt);
    this.renderer.render(this.scene, this.camera);
  }

  private advance(f: Flight, dt: number) {
    f.age += dt;
    const arcMaterial = f.arc?.material as LineMaterial | undefined;
    if (f.arc) f.arc.geometry.instanceCount = Math.min(Math.ceil((f.age / 0.7) * SEGMENTS), SEGMENTS);
    if (f.done) {
      f.fading += dt;
      if (arcMaterial) arcMaterial.opacity = 0.5 * Math.max(1 - f.fading / 1.2, 0);
      if (f.reticle) f.reticle.material.opacity = Math.max(1 - f.fading * 2, 0);
      return;
    }
    if (f.reticle) f.reticle.material.opacity = 0.45 + 0.4 * Math.sin(this.time * 6);
    if (f.delay > 0) {
      f.delay -= dt;
      return;
    }
    f.head.visible = true;
    f.t = Math.min(f.t + dt / f.duration, 1);
    const pos = f.path.getPoint(f.t, this.tmp);
    f.head.position.copy(pos);
    const dir = f.path.getTangent(f.t, this.tmp2);

    if (f.side === "interceptor") {
      this.emit(f, dt, pos, 0.012, 7, 0.7);
    } else {
      // Nose along the course, a slow roll so the light plays over the hull.
      f.spin += dt * 1.2;
      this.quat.setFromUnitVectors(UP, dir);
      this.spinQuat.setFromAxisAngle(UP, f.spin);
      f.head.quaternion.copy(this.quat).multiply(this.spinQuat);
      f.flame!.scale.setScalar(0.32 * (0.85 + 0.15 * Math.sin(this.time * 23 + f.spin * 7)));
      const tail = this.tmp2.copy(dir).multiplyScalar(-f.length * 0.55).add(pos);
      this.emit(f, dt, tail, 0.03, 4.5, 2.4);
    }

    if (f.interceptAt !== null && f.t >= f.interceptAt) {
      this.finish(f);
      if (f.hunter) this.finish(f.hunter);
      this.explode(f.head.position.clone(), false);
    } else if (f.t >= 1) {
      this.finish(f);
      if (f.side !== "interceptor") this.explode(f.path.v2.clone(), true);
    }
  }

  private emit(f: Flight, dt: number, at: V, every: number, size: number, life: number) {
    f.emit -= dt;
    while (f.emit <= 0) {
      f.emit += every;
      // Barely any drift: the trail stays on the trajectory, as a real exhaust trail does.
      this.puffs.spawn(at, rand(-1, 1), rand(-1, 1), rand(-1, 1), EXHAUST[f.side], SMOKE, size, life, size * 1.4);
    }
  }

  private finish(f: Flight) {
    f.done = true;
    f.head.visible = false;
  }

  private explode(at: V, big: boolean) {
    const size = big ? rand(34, 52) * Math.min(1, 0.6 + this.w / 2400) : rand(10, 14);
    const flash = new Sprite(new SpriteMaterial({ map: glowTexture(), color: "#fff2d0", ...ADDITIVE }));
    flash.position.copy(at);
    this.root.add(flash);
    this.blasts.push({ age: 0, life: big ? 0.9 : 0.4, size, big, flash });

    const s = size;
    if (!big) {
      for (let i = 0; i < 14; i++) {
        const a = rand(0, Math.PI * 2);
        const v = rand(30, 90);
        this.puffs.spawn(at, Math.cos(a) * v, Math.sin(a) * v, rand(-40, 40), [0.85, 1, 0.8, 0.9], [0.2, 0.4, 0.2], 4, rand(0.4, 0.8), 0, 0, true);
      }
      return;
    }
    // Fireball.
    for (let i = 0; i < 26; i++) {
      this.puffs.spawn(at, rand(-1, 1) * s * 0.6, rand(0, 1) * s * 0.5, rand(-1, 1) * s * 0.6, [1, 0.78, 0.4, 0.38], [0.45, 0.08, 0.02], s * rand(0.5, 0.8), rand(1.6, 2.6), s * 0.2, 1.6);
    }
    // Stem.
    for (let i = 0; i < 18; i++) {
      const p = at.clone().add(new Vector3(rand(-0.12, 0.12) * s, 0, rand(-0.12, 0.12) * s));
      this.puffs.spawn(p, rand(-3, 3), s * rand(0.9, 1.5), rand(-3, 3), [1, 0.62, 0.28, 0.22], [0.25, 0.06, 0.02], s * 0.32, rand(3, 4), s * 0.04, 0.55);
    }
    // Cap: rises with the stem, then rolls outward.
    for (let i = 0; i < 34; i++) {
      const a = rand(0, Math.PI * 2);
      const r = rand(0.5, 1.1) * s;
      this.puffs.spawn(at, Math.cos(a) * r * 0.9, s * rand(1.9, 2.4), Math.sin(a) * r * 0.5, [1, 0.7, 0.35, 0.24], [0.3, 0.05, 0.02], s * rand(0.45, 0.7), rand(3.4, 4.4), s * 0.12, 0.62);
    }
    // Sparks.
    for (let i = 0; i < 30; i++) {
      const a = rand(0, Math.PI * 2);
      const v = rand(60, 220);
      this.puffs.spawn(at, Math.cos(a) * v, Math.abs(Math.sin(a)) * v, rand(-80, 80), [1, 0.9, 0.6, 0.95], [0.6, 0.15, 0.02], 3.5, rand(0.6, 1.3), 0, 0, true);
    }
  }

  private animateBlast(b: Blast, dt: number) {
    b.age += dt;
    const flashP = Math.min(b.age / b.life, 1);
    b.flash.scale.setScalar(b.size * (b.big ? 5 : 3) * easeOut(Math.min(flashP * 3, 1)));
    b.flash.material.opacity = Math.max(1 - flashP, 0) ** 1.4;
  }

  private dispose(f: Flight) {
    this.root.remove(f.head);
    if (f.arc) {
      this.root.remove(f.arc);
      f.arc.geometry.dispose();
      f.arc.material.dispose();
    }
    if (f.reticle) {
      this.root.remove(f.reticle);
      f.reticle.material.dispose();
    }
    if (f.head instanceof Sprite) f.head.material.dispose();
  }

  destroy() {
    releaseRenderer(this.renderer);
  }
}
