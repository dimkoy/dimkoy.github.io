import {
  Box3,
  CircleGeometry,
  DirectionalLight,
  Group,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  RingGeometry,
  Scene,
  Sphere,
  Vector3,
  type Object3D,
  type WebGLRenderer,
} from "three";
import type { UnitKind } from "@/content/landings/nuclear-wars";
import { ADDITIVE, OWN, buildUnit, createRenderer, glowTexture, releaseRenderer } from "./models";

/**
 * Turntable of the game's unit models. One WebGL canvas covers the whole card grid; each model is drawn with a
 * scissor into its card's `[data-unit-slot]` box, so five models cost one context and the grid can wrap freely.
 */

/** `box` — the slot in canvas pixels from the bottom left (WebGL viewport), measured on resize. */
type Slot = { el: HTMLElement; box: { x: number; y: number; w: number; h: number }; model: Group; dish?: Object3D; radius: number; center: Vector3; shownAt: number | null };

const FOV = 28;
const ELEVATION = 0.38;
/** The radar dish spins on top of the turntable, as in the game. */
const DISH_SPEED = 1.6;

const HALF_FOV = MathUtils.degToRad(FOV / 2);

const easeOutBack = (p: number) => 1 + 2.2 * (p - 1) ** 3 + 1.2 * (p - 1) ** 2;

export class UnitTurntable {
  private renderer: WebGLRenderer;
  private scene = new Scene();
  private camera = new PerspectiveCamera(FOV, 1, 0.05, 50);
  private slots: Slot[];
  private time = 0;
  /** Canvas size, CSS px — what setViewport/setScissor take. */
  private size = { w: 0, h: 0 };

  constructor(
    private canvas: HTMLCanvasElement,
    /** `[data-unit-slot]` elements, the attribute holding the unit kind. */
    slots: HTMLElement[],
    /** Models wait for `show` and scale in; otherwise they are there from the first frame. */
    private animated: boolean,
  ) {
    this.renderer = createRenderer(canvas);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setScissorTest(true);
    // One clear of the whole canvas per frame, not another one per slot.
    this.renderer.autoClear = false;

    this.scene.add(new HemisphereLight("#e8ffe0", "#06140a", 1.6));
    const key = new DirectionalLight("#ffffff", 2.8);
    key.position.set(3, 5, 4);
    this.scene.add(key);
    const rim = new DirectionalLight(OWN, 2.2);
    rim.position.set(-3, 2, -4);
    this.scene.add(rim);

    this.slots = slots.map((el) => {
      const { root, dish } = buildUnit(el.dataset.unitSlot as UnitKind);
      const model = new Group();
      model.add(root);
      const bounds = new Box3().setFromObject(root).getBoundingSphere(new Sphere());
      const r = bounds.radius;
      // Neon pad under the model: a soft glow and a thin ring.
      const pad = new Mesh(
        new CircleGeometry(r * 1.15, 64),
        new MeshBasicMaterial({ map: glowTexture(), color: OWN, opacity: 0.35, ...ADDITIVE }),
      );
      pad.rotation.x = -Math.PI / 2;
      const ring = new Mesh(
        new RingGeometry(r * 0.98, r * 1.0, 96),
        new MeshBasicMaterial({ color: OWN, opacity: 0.5, ...ADDITIVE }),
      );
      ring.rotation.x = -Math.PI / 2;
      model.add(pad, ring);
      model.visible = false;
      this.scene.add(model);
      return { el, box: { x: 0, y: 0, w: 0, h: 0 }, model, dish, radius: r, center: bounds.center, shownAt: null };
    });
  }

  /**
   * Sizes the canvas and measures the slots against it. The canvas covers the grid and moves with it, so the
   * boxes only change when the grid is resized — no layout reads per frame.
   */
  resize(w: number, h: number) {
    this.renderer.setSize(w, h, false);
    this.size = { w, h };
    const canvas = this.canvas.getBoundingClientRect();
    for (const s of this.slots) {
      const r = s.el.getBoundingClientRect();
      s.box = { x: r.left - canvas.left, y: canvas.bottom - r.bottom, w: r.width, h: r.height };
    }
  }

  /** Starts the scale-in of each model, staggered. */
  show() {
    this.slots.forEach((s, i) => (s.shownAt ??= this.time + i * 0.12));
  }

  /** `dt` 0 renders a still frame. */
  render(dt: number) {
    this.time += dt;
    this.renderer.setScissor(0, 0, this.size.w, this.size.h);
    this.renderer.setViewport(0, 0, this.size.w, this.size.h);
    this.renderer.clear();

    for (const [i, s] of this.slots.entries()) {
      const { x, y, w, h } = s.box;
      if (!w || !h) continue;
      this.renderer.setScissor(x, y, w, h);
      this.renderer.setViewport(x, y, w, h);

      const shown = s.shownAt === null ? (this.animated ? 0 : 1) : MathUtils.clamp((this.time - s.shownAt) / 0.8, 0, 1);
      if (shown <= 0) continue;
      s.model.scale.setScalar(Math.max(easeOutBack(shown), 0.001));
      s.model.rotation.y = 0.6 + i * 0.9 + this.time * 0.45;
      if (s.dish) s.dish.rotation.y = this.time * DISH_SPEED;

      // Fit the bounding sphere into the box, looking down a little.
      this.camera.aspect = w / h;
      const distance = (s.radius * 1.12) / Math.sin(Math.min(HALF_FOV, Math.atan(Math.tan(HALF_FOV) * this.camera.aspect)));
      this.camera.position.set(0, s.center.y + Math.sin(ELEVATION) * distance, Math.cos(ELEVATION) * distance);
      this.camera.lookAt(0, s.center.y * 0.8, 0);
      this.camera.updateProjectionMatrix();

      for (const other of this.slots) other.model.visible = other === s;
      this.renderer.render(this.scene, this.camera);
    }
  }

  destroy() {
    releaseRenderer(this.renderer);
  }
}
