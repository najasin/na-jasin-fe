import { atom } from 'recoil'

interface Step1DataState {
  [key: string]: string
}

interface Step2DataState {
  [key: string]: number
}

export const initialstep1Data = {
  nickname: '',
  answer1: '',
  answer2: '',
}

export const currentStepState = atom({
  key: 'currentStepState',
  default: 1,
})

export const totalStepsState = atom({
  key: 'totalStepsState',
  default: 2,
})

export const step1DataState = atom<Step1DataState>({
  key: 'step1DataState',
  default: initialstep1Data,
})

export const step2DataState = atom<Step2DataState>({
  key: 'step2DataState',
  default: {
    키워드1: 3,
    키워드2: 3,
    키워드3: 3,
    키워드4: 3,
    키워드5: 3,
  },
})
