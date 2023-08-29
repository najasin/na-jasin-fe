import { atom } from 'recoil'

import { Category } from '@/components/shared/inventory/inventoryCategoryBtnList/inventoryCategoryBtnList.types'
import { TrimmedDataProps } from '@/components/shared/radarChart/radarChart.types'

import { ICharacterItemIdSet, IKeywordWithId } from '../makeMyManual.types'

export const selectedCategoryState = atom<Category>({
  key: 'selectedCategoryState',
  default: 'face',
})

export const selectedFaceItemState = atom<ICharacterItemIdSet>({
  key: 'selectedFaceItemState',
  default: { id: undefined, layoutCase: '' },
})

export const selectedBodyItemState = atom<ICharacterItemIdSet>({
  key: 'selectedBodyItemState',
  default: { id: undefined, layoutCase: '' },
})

export const selectedExpressionItemState = atom<ICharacterItemIdSet>({
  key: 'selectedExpressionItemState',
  default: { id: undefined, layoutCase: '' },
})

export const selectedSetState = atom<ICharacterItemIdSet>({
  key: 'selectedSetState',
  default: { id: undefined, layoutCase: '' },
})

export const selectedKeywordsState = atom<IKeywordWithId[]>({
  key: 'selectedKeywords',
  default: [],
})

export const statsGraphValueState = atom<TrimmedDataProps>({
  key: 'statsGraphValue',
  default: {},
})
