const calcPosition = (
  num: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin

export { calcPosition }
