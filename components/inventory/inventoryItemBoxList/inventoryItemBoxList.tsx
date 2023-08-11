import React from 'react'

import ItemBox from '@/components/itemBox/itemBox'

import { Item } from '../inventory.types'
import { InventoryItemBoxListProps } from './inventoryItemBoxList.types'

export function InventoryItemBoxList({
  selectedCategoryItems,
}: InventoryItemBoxListProps) {
  return (
    <>
      {selectedCategoryItems.map((item: Item) => (
        <ItemBox key={item.id} imgUrl={item.showCase} />
      ))}
    </>
  )
}
