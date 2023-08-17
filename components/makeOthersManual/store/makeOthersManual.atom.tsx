'use client'

import { atom } from 'recoil'

import { TrimmedDataProps } from '@/components/radarChart/radarChart.types'

export const nicknameState = atom({
  key: 'nicknameState',
  default: '',
})

export const statsGraphValueState = atom<TrimmedDataProps>({
  key: 'statsGraphValue',
  default: {},
})
