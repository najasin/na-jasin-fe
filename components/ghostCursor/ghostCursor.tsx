'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import classNames from 'classnames/bind'

import { throttleHelper } from '@/helpers/throttle.helpers'

import { calcPosition } from './ghostCursor.helpers'
import styles from './ghostCursor.module.scss'
import { IGhostCursorProps } from './ghostCursor.types'

const cx = classNames.bind(styles)

/**
 *
 * @example
 * ```tsx
 * const GhostCursor = dynamic(
 *   () => import('@/components/ghostCursor/ghostCursor'),
 * {
 *   ssr: false,
 * })
 * ```
 */
export default function GhostCursor({
  mouse,
  setMouse,
  position,
  setPosition,
}: IGhostCursorProps) {
  const [clicked, setClicked] = useState<boolean>(false)

  const ghostElemRef = useRef<HTMLDivElement>(null)
  const ghostMouthRef = useRef<HTMLDivElement>(null)
  const ghostEyesRef = useRef<HTMLDivElement>(null)

  const getMousePosition = useCallback(
    (e: MouseEvent) => {
      const x = e.clientX || e.pageX || window.innerWidth / 2
      // e.touches[0].pageX
      const y = e.clientY || e.pageY || window.innerHeight / 2
      // e.touches[0].pageY
      const dir = mouse.x > x ? 'left' : 'right'

      setMouse({
        x,
        y,
        dir,
      })
    },
    [mouse.x],
  )

  const handleMouseDown = () => {
    // e.preventDefault()
    setClicked(true)
  }

  const handleMouseUp = () => {
    // e.preventDefault()
    setClicked(false)
  }

  useEffect(() => {
    // 모바일 대응 시 touchstart, touchmove 추가
    // ;['mousemove', 'touchstart', 'touchmove'].forEach((eventType) => {
    //   window.addEventListener(eventType, getMousePosition)
    // })
    window.addEventListener('mousemove', throttleHelper(500, getMousePosition))
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.addEventListener(
        'mousemove',
        throttleHelper(500, getMousePosition),
      )
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [mouse, getMousePosition])

  useEffect(() => {
    const animate = () => {
      const distX = mouse.x - position.x
      const distY = mouse.y - position.y

      const velX = distX / 8
      const velY = distY / 8

      const newPos = {
        x: position.x + distX / 10,
        y: position.y + distY / 10,
      }

      const skewX = calcPosition(velX, 0, 100, 0, -50)
      const scaleY = calcPosition(velY, 0, 100, 1, 2.0)
      const scaleEyeX = calcPosition(Math.abs(velX), 0, 100, 1, 1.2)
      let scaleEyeY = calcPosition(Math.abs(velX * 2), 0, 100, 1, 0.1)
      let scaleMouth = Math.min(
        Math.max(
          calcPosition(Math.abs(velX * 1.5), 0, 100, 0, 10),
          calcPosition(Math.abs(velY * 1.2), 0, 100, 0, 5),
        ),
        2,
      )

      if (clicked) {
        scaleEyeY = 0.4
        scaleMouth = -scaleMouth
      }

      return {
        newPos,
        skewX,
        scaleY,
        scaleEyeX,
        scaleEyeY,
        scaleMouth,
      }
    }

    const updateAnimation = () => {
      const { newPos, skewX, scaleY, scaleEyeX, scaleEyeY, scaleMouth } =
        animate()

      if (
        ghostElemRef.current &&
        ghostMouthRef.current &&
        ghostEyesRef.current
      ) {
        ghostElemRef.current.style.transform = `translate(${newPos.x}px, ${
          newPos.y
        }px) scale(.7) skew(${skewX}deg) rotate(${-skewX}deg) scaleY(${scaleY})`
        ghostMouthRef.current.style.transform = `translateX(-50%) scale(${scaleEyeX}, ${scaleEyeY})`
        ghostEyesRef.current.style.transform = `translate(${
          -skewX * 0.5 - 10
        }px) scale(${scaleMouth})`

        setPosition(newPos)
      }
    }

    const animationId = requestAnimationFrame(updateAnimation)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [mouse, clicked, position.x, position.y])

  return (
    <>
      <div id="ghost" className={cx('ghost')} ref={ghostElemRef}>
        <div className={cx('ghostHead')}>
          <div className={cx('ghostEyes')} ref={ghostMouthRef}></div>
          <div className={cx('ghostMouth')} ref={ghostEyesRef}></div>
        </div>
        <div className={cx('ghostTail')}>
          <div className={cx('ghostRip')}></div>
        </div>
      </div>

      <svg
        style={{ position: 'absolute', bottom: '0' }}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="ghost-blur"
            />
            <feColorMatrix
              in="ghost-blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 16 -7"
              result="ghost-gooey"
            />
          </filter>
        </defs>
      </svg>
    </>
  )
}
