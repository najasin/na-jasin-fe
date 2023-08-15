import {
  cfg,
  initConfettoVelocity,
  randomRange,
  sequentialSize,
} from '../confetti.helpers'

/**
 * Confetto 생성자 함수
 * @constructor
 */
class Confetto {
  randomModifier: number

  color: { front: string; back: string }

  dimensions: { x: number; y: number }

  position: { x: number; y: number }

  rotation: number

  scale: { x: number; y: number }

  velocity: { x: number; y: number }

  constructor(
    colorList: Array<{ front: string; back: string }>,
    canvas: HTMLCanvasElement,
    button: HTMLButtonElement,
  ) {
    this.randomModifier = randomRange<number>(0, 99)
    this.color = colorList[Math.floor(randomRange<number>(0, colorList.length))]
    this.dimensions = {
      // x: randomRange<number>(5, 7),
      x: sequentialSize<number>(5, 0.1, 5, 9),
      y: randomRange<number>(8, 15),
    }
    this.position = {
      x: randomRange<number>(
        canvas.width / 2 - button.offsetWidth / 4,
        canvas.width / 2 + button.offsetWidth / 4,
      ),
      y: randomRange<number>(
        canvas.height / 2 + button.offsetHeight / 2 + 8,
        canvas.height / 2 + 1.5 * button.offsetHeight - 8,
      ),
    }
    this.rotation = randomRange<number>(0, 2 * Math.PI)
    this.scale = {
      x: 1,
      y: 1,
    }
    this.velocity = initConfettoVelocity<number>([-9, 9], [6, 11])
  }

  update() {
    this.velocity.x -= this.velocity.x * cfg.dragConfetti
    this.velocity.y = Math.min(
      this.velocity.y + cfg.gravityConfetti,
      cfg.terminalVelocity,
    )
    this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09)
  }
}

export default Confetto
