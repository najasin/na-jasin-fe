'use client'

import { atom } from 'recoil'

import { TrimmedDataProps } from '@/components/shared/radarChart/radarChart.types'

export const nicknameState = atom({
  key: 'nicknameState',
  default: '',
})

export const statsGraphValueState2 = atom<TrimmedDataProps>({
  key: 'statsGraphValue2',
  default: {},
})
