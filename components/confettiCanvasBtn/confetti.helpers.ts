const cfg = {
  confettiCount: 20,
  sequinCount: 10,
  gravityConfetti: 0.3, // 중력 값 조정
  gravitySequins: 0.55,
  dragConfetti: 0.075, // 마찰 값
  dragSequins: 0.02,
  terminalVelocity: 3, // 최대 속도 값 조정
}

const CONFETTI_COLORS = [
  { front: '#7b5cff', back: '#6245e0' }, // Purple
  { front: '#b3c7ff', back: '#8fa5e5' }, // Light Blue
  { front: '#5c86ff', back: '#345dd1' }, // Darker Blue
]

const randomRange = <T extends number>(min: T, max: T): number =>
  Math.random() * (max - min) + min

// 일정한 크기의 값을 순차적으로 선택하는 함수
const sequentialSize = <T extends number>(
  current: T,
  step: T,
  min: T,
  max: T,
): number => {
  const newSize = current + step
  return newSize > max ? min : newSize
}

const initConfettoVelocity = <T extends number>(
  xRange: T[],
  yRange: T[],
): { x: number; y: number } => {
  const x = randomRange(xRange[0], xRange[1])
  const range = yRange[1] - yRange[0] + 1
  let y =
    yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range)
  if (y >= yRange[1] - 1) {
    y += Math.random() < 0.25 ? randomRange(1, 3) : 0
  }
  return { x, y: -y }
}

export {
  cfg,
  CONFETTI_COLORS,
  randomRange,
  sequentialSize,
  initConfettoVelocity,
}
