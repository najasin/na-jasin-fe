import classNames from 'classnames/bind'

import Image from 'next/image'

import styles from './itemBox.module.scss'

const cx = classNames.bind(styles)

export default function ItemBox({
  imgUrl,
  onSelectedItem,
}: {
  imgUrl: string
  onSelectedItem: (img: string) => void
}) {
  const handleItemClick = () => {
    onSelectedItem(imgUrl)
  }
  return (
    <div className={cx('itemBox')} onClick={handleItemClick}>
      <Image
        className={cx('img')}
        src={imgUrl}
        alt="캐릭터 item"
        fill={true}
        priority={true}
      />
    </div>
  )
}
