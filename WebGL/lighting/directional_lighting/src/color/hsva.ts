export const hsva = (h: number, s: number, v: number, a: number) => {
  if (s > 1 || v > 1 || a > 1) {
    return;
  }
  const th = h % 360;
  const i = Math.floor(th / 60);
  const f = th / 60 - i;
  const m = v * (1 - s);
  const n = v * (1 - s * f);
  const k = v * (1 - s * (1 - f));
  const color: number[] = [];
};
