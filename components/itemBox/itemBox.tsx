import classNames from 'classnames/bind'
import { motion } from 'framer-motion'

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
    <motion.button
      type="button"
      className={cx('itemBox')}
      onClick={handleItemClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Image
        className={cx('img')}
        src={data.showCase}
        alt="캐릭터 item"
        fill={true}
        priority={true}
      />
    </motion.button>
  )
}
