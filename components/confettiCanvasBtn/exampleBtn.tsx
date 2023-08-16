'use client'

import classNames from 'classnames/bind'

import styles from './confettiCanvasBtn.module.scss'

const cx = classNames.bind(styles)

export default function ButtonWithRefAndClick({
  onClickInitBurst,
  buttonRef,
}: {
  onClickInitBurst: () => void
  buttonRef: React.MutableRefObject<HTMLButtonElement | null>
}) {
  const handleClickButton = () => {
    // 버튼의 원래 로직 ... 요청 완료 후
    onClickInitBurst()
  }

  return (
    <button
      className={cx('button')}
      ref={buttonRef}
      onClick={handleClickButton}
    >
      예시 버튼
    </button>
  )
}
