import { atom } from 'recoil'

import { Category } from '@/components/inventory/inventoryCategoryBtnList/inventoryCategoryBtnList.types'
import { TrimmedDataProps } from '@/components/radarChart/radarChart.types'

// eslint-disable-next-line import/no-cycle
import { originKeywordPercentsSelector } from './originKeywordPercents.selecter'

export const selectedCategoryState = atom<Category>({
  key: 'selectedCategoryState',
  default: 'face',
})

export const selectedFaceItemState = atom<string>({
  key: 'selectedFaceItemState',
  default: '',
})

export const selectedBodyItemState = atom<string>({
  key: 'selectedBodyItemState',
  default: '',
})

export const selectedExpressionItemState = atom<string>({
  key: 'selectedExpressionItemState',
  default: '',
})

export const selectedSetState = atom<string>({
  key: 'selectedSetState',
  default: '',
})

export const selectedKeywordsState = atom<string[]>({
  key: 'selectedKeywords',
  default: [],
})

export const statsGraphValueState = atom<TrimmedDataProps>({
  key: 'statsGraphValue',
  default: originKeywordPercentsSelector,
})
