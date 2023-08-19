import classNames from 'classnames/bind'

import Image from 'next/image'

import { Item } from '../inventory/inventory.types'
import { ICharacterItemIdSet } from '../makeMyManual/makeMyManual.types'
import styles from './itemBox.module.scss'

const cx = classNames.bind(styles)

export default function ItemBox({
  data,
  onSelectedItem,
}: {
  data: Item
  onSelectedItem: (data: ICharacterItemIdSet) => void
}) {
  const handleItemClick = () => {
    onSelectedItem({
      id: data.id,
      layoutCase: data.layoutCase,
    })
  }
  return (
    <div className={cx('itemBox')} onClick={handleItemClick}>
      <Image
        className={cx('img')}
        src={data.showCase}
        alt="캐릭터 item"
        fill={true}
        priority={true}
      />
    </div>
  )
}
