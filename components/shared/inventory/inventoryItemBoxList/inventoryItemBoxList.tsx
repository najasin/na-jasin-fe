import classNames from 'classnames/bind'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { ICharacterItemIdSet } from '@/components/makeMyManual/makeMyManual.types'
import {
  selectedBodyItemState,
  selectedCategoryState,
  selectedExpressionItemState,
  selectedFaceItemState,
  selectedSetState,
} from '@/components/makeMyManual/store/makeMyManual.atom'
import ItemBox from '@/components/shared/itemBox/itemBox'

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
  const handleItemSelectClick = (data: ICharacterItemIdSet) => {
    switch (selectedCategory) {
      case 'face':
        setSelectedFaceItem(data)
        setSelectedSet({ id: undefined, layoutCase: '' })
        break
      case 'body':
        setSelectedBodyItem(data)
        setSelectedSet({ id: undefined, layoutCase: '' })
        break
      case 'expression':
        setSelectedExpressionItem(data)
        setSelectedSet({ id: undefined, layoutCase: '' })
        break
      case 'set':
        setSelectedSet(data)
        setSelectedFaceItem({ id: undefined, layoutCase: '' })
        setSelectedBodyItem({ id: undefined, layoutCase: '' })
        setSelectedExpressionItem({ id: undefined, layoutCase: '' })
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
          data={item}
          onSelectedItem={handleItemSelectClick}
        />
      ))}
    </div>
  )
}
