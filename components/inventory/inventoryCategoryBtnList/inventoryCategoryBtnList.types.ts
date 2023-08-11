export type Category = 'face' | 'body' | 'expression' | 'set'

export interface InventoryCategoryBtnProps {
  selectedCategory: Category
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>
}
