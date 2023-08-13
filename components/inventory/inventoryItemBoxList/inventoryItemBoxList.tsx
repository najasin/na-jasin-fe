import classNames from 'classnames/bind'

import ItemBox from '@/components/itemBox/itemBox'

import { Item } from '../inventory.types'
import styles from './inventoryItemBoxList.module.scss'
import { InventoryItemBoxListProps } from './inventoryItemBoxList.types'

const cx = classNames.bind(styles)

export function InventoryItemBoxList({
  selectedCategoryItems,
  onSelectedItem,
}: InventoryItemBoxListProps) {
  return (
    <div className={cx('boxList')}>
      {selectedCategoryItems.map((item: Item) => (
        <ItemBox
          key={item.id}
          imgUrl={item.showCase}
          onSelectedItem={onSelectedItem}
        />
      ))}
    </div>
  )
}
