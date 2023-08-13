import { Item } from '../inventory.types'

export interface InventoryItemBoxListProps {
  selectedCategoryItems: Item[]
  onSelectedItem: (img: string) => void
}
