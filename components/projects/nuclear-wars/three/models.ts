import {
  AdditiveBlending,
  BoxGeometry,
  CanvasTexture,
  Color,
  ConeGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  SRGBColorSpace,
  WebGLRenderer,
  type BufferGeometry,
  type Object3D,
} from "three";
import type { UnitKind } from "@/content/landings/nuclear-wars";

/**
 * The game's unit and missile models, ported 1:1 from NuclearComand/Globe/UnitEntityFactory.swift and
 * MissileLayer.swift: the same primitives, proportions (fractions of the unit size, here 1) and colors. The game
 * draws them unlit; here they are lit so the shape reads on a page without the globe around it.
 */

export const OWN = "#39ff14";
export const ENEMY = "#ff3b30";
const STEEL = "#8c8c8c";
const FLAME = "#ff8c1a";

const SEGMENTS = 40;

/** Options of every glow, flash and trail: added onto what is behind, never occluding. */
export const ADDITIVE = { blending: AdditiveBlending, depthWrite: false, transparent: true } as const;

/** Canvas with a transparent background; `destroy` should end with `releaseRenderer`. */
export function createRenderer(canvas: HTMLCanvasElement) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setClearColor(0x000000, 0);
  return renderer;
}

/** Frees the context with everything uploaded to it (`dispose` alone keeps the context until GC). */
export function releaseRenderer(renderer: WebGLRenderer) {
  renderer.dispose();
  renderer.forceContextLoss();
}

/** A square canvas drawn once into a texture. */
export function canvasTexture(size: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  draw(canvas.getContext("2d")!);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

/** RealityKit's `blendTowardWhite`. */
function towardWhite(hex: string, amount: number) {
  return `#${new Color(hex).lerp(new Color("#ffffff"), amount).getHexString()}`;
}

const materials = new Map<string, MeshStandardMaterial>();
function material(hex: string, kind: "paint" | "steel" | "glow" = "paint") {
  const key = `${hex}-${kind}`;
  let m = materials.get(key);
  if (!m) {
    m =
      kind === "steel"
        ? new MeshStandardMaterial({ color: hex, metalness: 0.65, roughness: 0.35, emissive: hex, emissiveIntensity: 0.04 })
        : kind === "glow"
          ? new MeshStandardMaterial({ color: hex, roughness: 0.6, emissive: hex, emissiveIntensity: 0.45 })
          : new MeshStandardMaterial({ color: hex, metalness: 0.25, roughness: 0.45, emissive: hex, emissiveIntensity: 0.28 });
    materials.set(key, m);
  }
  return m;
}

function part(geometry: BufferGeometry, mat: MeshStandardMaterial, [x, y, z]: [number, number, number], rotate?: (o: Object3D) => void) {
  const mesh = new Mesh(geometry, mat);
  mesh.position.set(x, y, z);
  rotate?.(mesh);
  return mesh;
}

const cylinder = (height: number, radius: number) => new CylinderGeometry(radius, radius, height, SEGMENTS);
const cone = (height: number, radius: number) => new ConeGeometry(radius, height, SEGMENTS);
const box = (w: number, h: number, d: number) => new BoxGeometry(w, h, d);

/** Unit model in the player's color on the ground plane (y = 0); `dish` is the radar plate the game spins. */
export function buildUnit(kind: UnitKind): { root: Group; dish?: Object3D } {
  const root = new Group();
  const body = material(OWN);
  const accent = material(towardWhite(OWN, 0.35));
  const steel = material(STEEL, "steel");

  switch (kind) {
    case "silo": {
      // Concrete ring, dome and the tip of the ICBM out of the hatch.
      root.add(part(cylinder(0.15, 0.5), steel, [0, 0.075, 0]));
      root.add(part(new SphereGeometry(0.32, SEGMENTS, SEGMENTS / 2), body, [0, 0.16, 0]));
      root.add(part(cylinder(0.5, 0.11), accent, [0, 0.55, 0]));
      root.add(part(cone(0.2, 0.11), accent, [0, 0.9, 0]));
      return { root };
    }
    case "radar": {
      // Base, pylon and a tilted dish — a flattened cone, apex down toward the pylon.
      root.add(part(box(0.6, 0.2, 0.6), steel, [0, 0.1, 0]));
      root.add(part(cylinder(0.5, 0.09), steel, [0, 0.45, 0]));
      const dish = new Group();
      dish.position.set(0, 0.75, 0);
      dish.add(part(cone(0.16, 0.45), body, [0, 0, 0], (o) => o.rotateX(Math.PI * 0.72)));
      root.add(dish);
      return { root, dish };
    }
    case "abm": {
      // Base and a launch rack at 45° with three tubes.
      root.add(part(box(0.7, 0.2, 0.7), steel, [0, 0.1, 0]));
      const rack = new Group();
      rack.position.set(0, 0.32, 0);
      rack.rotateX(Math.PI * 0.25);
      rack.add(part(box(0.5, 0.06, 0.24), accent, [0, -0.06, 0]));
      for (const i of [-1, 0, 1]) rack.add(part(cylinder(0.65, 0.08), body, [i * 0.16, 0.05, 0]));
      root.add(rack);
      return { root };
    }
    case "submarine": {
      // Hull lying along X, nose and stern cones, sail, rudder.
      const y = 0.3;
      const lay = (o: Object3D) => o.rotateZ(Math.PI / 2);
      root.add(part(cylinder(1.3, 0.28), body, [0, y, 0], lay));
      root.add(part(cone(0.35, 0.28), body, [-0.82, y, 0], lay));
      root.add(part(cone(0.35, 0.28), body, [0.82, y, 0], (o) => o.rotateZ(-Math.PI / 2)));
      root.add(part(box(0.3, 0.26, 0.14), accent, [-0.15, y + 0.32, 0]));
      root.add(part(box(0.1, 0.3, 0.04), accent, [0.7, y + 0.2, 0]));
      return { root };
    }
    case "airbase": {
      // Runway with a center line, control tower, a parked plane.
      const white = material("#f2f2f2");
      root.add(part(box(2.8, 0.05, 1.0), steel, [0, 0.025, 0]));
      root.add(part(box(2.6, 0.02, 0.1), white, [0, 0.06, 0]));
      root.add(part(cylinder(0.45, 0.07), steel, [-0.5, 0.27, -0.32]));
      root.add(part(box(0.2, 0.12, 0.2), body, [-0.5, 0.55, -0.32]));
      root.add(part(cylinder(0.4, 0.05), body, [0.25, 0.1, 0.1], (o) => o.rotateZ(Math.PI / 2)));
      root.add(part(box(0.12, 0.02, 0.36), body, [0.25, 0.1, 0.1]));
      return { root };
    }
  }
}

/** Game sizes (mm): hull 6, nose 2.5, flame 2.2, radius 1.1 — scaled to a total length of 1. */
const MM = 1 / 10.1;
let missileGeometry: { hull: CylinderGeometry; nose: ConeGeometry; flame: ConeGeometry } | null = null;

/**
 * The game's ICBM "pencil" — hull, nose cone, flame — along +Y with its center at the origin, 1 long; scale it to
 * the wanted length. The geometry is shared by every missile, so a missile owns nothing to dispose.
 */
export function buildMissile(color: string): Group {
  missileGeometry ??= { hull: cylinder(6 * MM, 1.1 * MM), nose: cone(2.5 * MM, 1.1 * MM), flame: cone(2.2 * MM, 0.8 * MM) };
  const { hull, nose, flame } = missileGeometry;
  const body = material(color);
  const root = new Group();
  root.add(part(hull, body, [0, 0, 0]));
  root.add(part(nose, body, [0, 4.25 * MM, 0]));
  root.add(part(flame, material(FLAME, "glow"), [0, -4.1 * MM, 0], (o) => o.rotateX(Math.PI)));
  return root;
}

let glow: CanvasTexture | null = null;
/** Soft white radial falloff; tinted by the material color and blended additively. */
export function glowTexture() {
  glow ??= canvasTexture(128, (ctx) => {
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.25, "rgba(255,255,255,0.55)");
    g.addColorStop(0.6, "rgba(255,255,255,0.12)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
  });
  return glow;
}
