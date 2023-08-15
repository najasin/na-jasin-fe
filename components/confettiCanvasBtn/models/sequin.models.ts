import { cfg, randomRange } from '../confetti.helpers'

class Sequin {
  color: string

  radius: number

  position: { x: number; y: number }

  velocity: { x: number; y: number }

  constructor(
    colorList: Array<{ front: string; back: string }>,
    canvas: HTMLCanvasElement,
    button: HTMLButtonElement,
  ) {
    this.color =
      colorList[Math.floor(randomRange<number>(0, colorList.length))].back
    this.radius = randomRange<number>(1, 2)
    this.position = {
      x: randomRange<number>(
        canvas.width / 2 - button.offsetWidth / 3,
        canvas.width / 2 + button.offsetWidth / 3,
      ),
      y: randomRange<number>(
        canvas.height / 2 + button.offsetHeight / 2 + 8,
        canvas.height / 2 + 1.5 * button.offsetHeight - 8,
      ),
    }
    this.velocity = {
      x: randomRange<number>(-6, 6),
      y: randomRange<number>(-8, -12),
    }
  }

  update() {
    this.velocity.x -= this.velocity.x * cfg.dragSequins
    this.velocity.y += cfg.gravitySequins

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

export default Sequin
