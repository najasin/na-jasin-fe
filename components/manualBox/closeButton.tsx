import classNames from 'classnames/bind'

import Image from 'next/image'

import styles from './closeButton.module.scss'

const cx = classNames.bind(styles)

export default function CloseButton({
  onClickModalClose,
}: {
  onClickModalClose: () => void
}) {
  return (
    <button onClick={onClickModalClose}>
      <Image
        className={cx('image')}
        src="/images/x.svg"
        alt="close"
        width={20}
        height={20}
      />
    </button>
  )
}
