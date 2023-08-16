import classNames from 'classnames/bind'
import { useRecoilState, useSetRecoilState } from 'recoil'

import ItemBox from '@/components/itemBox/itemBox'
import {
  selectedBodyItemState,
  selectedCategoryState,
  selectedExpressionItemState,
  selectedFaceItemState,
  selectedSetState,
} from '@/components/makeMyManual/store/makeMyManual.atom'

import { Item } from '../inventory.types'
import styles from './inventoryItemBoxList.module.scss'
import { InventoryItemBoxListProps } from './inventoryItemBoxList.types'

const cx = classNames.bind(styles)

export function InventoryItemBoxList({
  selectedCategoryItems,
}: InventoryItemBoxListProps) {
  const [selectedCategory] = useRecoilState(selectedCategoryState)
  const setSelectedFaceItem = useSetRecoilState(selectedFaceItemState)
  const setSelectedBodyItem = useSetRecoilState(selectedBodyItemState)
  const setSelectedExpressionItem = useSetRecoilState(
    selectedExpressionItemState,
  )
  const setSelectedSet = useSetRecoilState(selectedSetState)
  const handleItemSelectClick = (img: string) => {
    switch (selectedCategory) {
      case 'face':
        setSelectedFaceItem(img)
        setSelectedSet('')
        break
      case 'body':
        setSelectedBodyItem(img)
        setSelectedSet('')
        break
      case 'expression':
        setSelectedExpressionItem(img)
        setSelectedSet('')
        break
      case 'set':
        setSelectedSet(img)
        setSelectedFaceItem('')
        setSelectedBodyItem('')
        setSelectedExpressionItem('')
        break
      default:
        break
    }
  }
  return (
    <div className={cx('boxList')}>
      {selectedCategoryItems.map((item: Item) => (
        <ItemBox
          key={item.id}
          imgUrl={item.showCase}
          onSelectedItem={handleItemSelectClick}
        />
      ))}
    </div>
  )
}
