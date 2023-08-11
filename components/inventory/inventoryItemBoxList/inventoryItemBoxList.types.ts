import { Item } from '../inventory.types'
import { Category } from '../inventoryCategoryBtnList/inventoryCategoryBtnList.types'

export interface InventoryItemBoxListProps {
  selectedCategory: Category
  selectedCategoryItems: Item[]
}
