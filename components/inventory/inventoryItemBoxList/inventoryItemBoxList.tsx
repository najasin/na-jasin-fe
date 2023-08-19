import classNames from 'classnames/bind'
import { useRecoilState, useSetRecoilState } from 'recoil'

import ItemBox from '@/components/itemBox/itemBox'
import { ICharacterItemIdSet } from '@/components/makeMyManual/makeMyManual.types'
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
  const handleItemSelectClick = (data: ICharacterItemIdSet) => {
    switch (selectedCategory) {
      case 'face':
        setSelectedFaceItem(data)
        setSelectedSet({ id: '', layoutCase: '' })
        break
      case 'body':
        setSelectedBodyItem(data)
        setSelectedSet({ id: '', layoutCase: '' })
        break
      case 'expression':
        setSelectedExpressionItem(data)
        setSelectedSet({ id: '', layoutCase: '' })
        break
      case 'set':
        setSelectedSet(data)
        setSelectedFaceItem({ id: '', layoutCase: '' })
        setSelectedBodyItem({ id: '', layoutCase: '' })
        setSelectedExpressionItem({ id: '', layoutCase: '' })
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
