import { atom } from 'recoil'

import { Category } from '@/components/inventory/inventoryCategoryBtnList/inventoryCategoryBtnList.types'
import { TrimmedDataProps } from '@/components/radarChart/radarChart.types'

import { ICharacterItemIdSet } from '../makeMyManual.types'

// eslint-disable-next-line import/no-cycle
// import { originKeywordPercentsSelector } from './originKeywordPercents.selecter'

export const selectedCategoryState = atom<Category>({
  key: 'selectedCategoryState',
  default: 'face',
})

export const selectedFaceItemState = atom<ICharacterItemIdSet>({
  key: 'selectedFaceItemState',
  default: { id: '', layoutCase: '' },
})

export const selectedBodyItemState = atom<ICharacterItemIdSet>({
  key: 'selectedBodyItemState',
  default: { id: '', layoutCase: '' },
})

export const selectedExpressionItemState = atom<ICharacterItemIdSet>({
  key: 'selectedExpressionItemState',
  default: { id: '', layoutCase: '' },
})

export const selectedSetState = atom<ICharacterItemIdSet>({
  key: 'selectedSetState',
  default: { id: '', layoutCase: '' },
})

export const selectedKeywordsState = atom<string[]>({
  key: 'selectedKeywords',
  default: [],
})

export const statsGraphValueState = atom<TrimmedDataProps>({
  key: 'statsGraphValue',
  default: {},

  // default: originKeywordPercentsSelector,
})
