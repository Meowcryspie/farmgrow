// Isometric projection helper for EC Link 2.5D graphics
export const U = 22;
export const ORIGIN_X = 159;
export const ORIGIN_Y = 48;

export function project(a: number, b: number, z: number): [number, number] {
  const x = ORIGIN_X + (a - b) * U;
  const y = ORIGIN_Y + ((a + b) * U) / 2 - z;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

export function ptStr(p: [number, number]): string {
  return `${p[0]},${p[1]}`;
}
