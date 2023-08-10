import classNames from 'classnames/bind'

import Image from 'next/image'

import styles from './itemBox.module.scss'

const cx = classNames.bind(styles)

export default function ItemBox({ imgUrl }: { imgUrl: string }) {
  return (
    <div className={cx('itemBox')}>
      <div className={cx('img')}>
        <Image
          className={cx('img')}
          src={imgUrl}
          alt="캐릭터 item"
          fill={true}
        />
      </div>
    </div>
  )
}
