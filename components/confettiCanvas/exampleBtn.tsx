'use client'

import classNames from 'classnames/bind'

import styles from './confettiCanvas.module.scss'

const cx = classNames.bind(styles)

export default function ButtonWithRefAndClick({
  onClick,
  buttonRef,
}: {
  onClick: () => void
  buttonRef: React.MutableRefObject<HTMLButtonElement | null>
}) {
  return (
    <button className={cx('button')} ref={buttonRef} onClick={onClick}>
      예시 버튼
    </button>
  )
}
