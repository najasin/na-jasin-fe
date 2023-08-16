// 'use client'
import { atom } from 'recoil'

export const featureState = atom({
  key: 'featureState',
  default: '',
})

export const fullScreenState = atom({
  key: 'fullScreenState',
  default: '',
})
