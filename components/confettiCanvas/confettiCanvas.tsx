'use client'

import React, { useEffect, useRef } from 'react'

import classNames from 'classnames/bind'

import { CONFETTI_COLORS, cfg, randomRange } from './confetti.helpers'
import styles from './confettiCanvas.module.scss'
import ButtonWithRefAndClick from './exampleBtn'
import Confetto from './models/confetto.models'
import Sequin from './models/sequin.models'

const cx = classNames.bind(styles)

export default function ConfettiButton() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const confettiRef = useRef<Confetto[]>([])
  const sequinsRef = useRef<Sequin[]>([])

  const renderConfetti = () => {
    const button = buttonRef.current as HTMLButtonElement

    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    confettiRef.current.forEach((confetto) => {
      const width = confetto.dimensions.x * confetto.scale.x
      const height = confetto.dimensions.y * confetto.scale.y

      ctx.translate(confetto.position.x, confetto.position.y)
      ctx.rotate(confetto.rotation)

      confetto.update()

      ctx.fillStyle =
        confetto.scale.y > 0 ? confetto.color.front : confetto.color.back
      ctx.fillRect(-width / 2, -height / 2, width, height)

      ctx.setTransform(1, 0, 0, 1, 0, 0)

      if (confetto.velocity.y < 0) {
        ctx.clearRect(
          canvas.width / 2 - button.offsetWidth / 2,
          canvas.height / 2 + button.offsetHeight / 2,
          button.offsetWidth,
          button.offsetHeight,
        )
      }
    })

    sequinsRef.current.forEach((sequin) => {
      ctx.translate(sequin.position.x, sequin.position.y)

      sequin.update()

      ctx.fillStyle = sequin.color
      ctx.beginPath()
      ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI)
      ctx.fill()

      ctx.setTransform(1, 0, 0, 1, 0, 0)

      if (sequin.velocity.y < 0) {
        ctx.clearRect(
          canvas.width / 2 - button.offsetWidth / 2,
          canvas.height / 2 + button.offsetHeight / 2,
          button.offsetWidth,
          button.offsetHeight,
        )
      }
    })

    confettiRef.current.forEach((confetto, index) => {
      if (confetto.position.y >= canvas.height) {
        confettiRef.current = confettiRef.current.filter((_, i) => i !== index)
      }
    })

    sequinsRef.current.forEach((sequin, index) => {
      if (sequin.position.y >= canvas.height) {
        sequinsRef.current = sequinsRef.current.filter((_, i) => i !== index)
      }
    })

    /**
     * requestAnimationFrame을 통해 매 프레임마다 renderConfetti 함수가 호출되므로
     * 아래와 같이 renderConfetti 함수 호출을 멈추도록하는 조건을 설정해야 합니다.
     * 그러지 않으면 renderConfetti 함수 호출이 너무 많아져 앱이 느려집니다.
     */

    confettiRef.current.forEach((confetto, index) => {
      if (confetto.position.y >= canvas.height) {
        confettiRef.current.splice(index, 1) // 요소 제거
      }
    })

    sequinsRef.current.forEach((sequin, index) => {
      if (sequin.position.y >= canvas.height) {
        sequinsRef.current.splice(index, 1) // 요소 제거
      }
    })

    // 모든 요소가 제거되면 애니메이션 중지
    if (confettiRef.current.length === 0 && sequinsRef.current.length === 0) {
      return
    }

    requestAnimationFrame(renderConfetti)
  }

  const initBurst = () => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const button = buttonRef.current as HTMLButtonElement

    const newConfetti = []
    const newSequins = []

    for (let i = 0; i < cfg.confettiCount; i++) {
      newConfetti.push(new Confetto(CONFETTI_COLORS, canvas, button))
    }
    for (let i = 0; i < cfg.sequinCount; i++) {
      newSequins.push(new Sequin(CONFETTI_COLORS, canvas, button))
    }

    confettiRef.current = [...confettiRef.current, ...newConfetti]
    sequinsRef.current = [...sequinsRef.current, ...newSequins]

    requestAnimationFrame(renderConfetti)
  }

  const resizeCanvas = () => {
    const button = buttonRef.current as HTMLButtonElement
    const canvas = canvasRef.current as HTMLCanvasElement
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // 캔버스 사이즈가 변경될 때 confetti와 Sequins를 변경합니다.
    confettiRef.current.forEach((confetto) => {
      const newPositionX = randomRange<number>(
        canvas.width / 2 - button.offsetWidth / 4,
        canvas.width / 2 + button.offsetWidth / 4,
      )
      const newPositionY = randomRange<number>(
        canvas.height / 2 + button.offsetHeight / 2 + 8,
        canvas.height / 2 + 1.5 * button.offsetHeight - 8,
      )

      Object.assign(confetto.position, { x: newPositionX, y: newPositionY })
    })

    sequinsRef.current.forEach((sequin) => {
      const newPositionX = randomRange<number>(
        canvas.width / 2 - button.offsetWidth / 3,
        canvas.width / 2 + button.offsetWidth / 3,
      )
      const newPositionY = randomRange<number>(
        canvas.height / 2 + button.offsetHeight / 2 + 8,
        canvas.height / 2 + 1.5 * button.offsetHeight - 8,
      )

      Object.assign(sequin.position, { x: newPositionX, y: newPositionY })
    })
  }

  const handleClickInitBurst = () => {
    initBurst()
  }

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className={cx('buttonContainer')}>
      <ButtonWithRefAndClick
        buttonRef={buttonRef}
        onClickInitBurst={handleClickInitBurst}
      />
      <canvas className={cx('canvas')} ref={canvasRef}></canvas>
    </div>
  )
}
