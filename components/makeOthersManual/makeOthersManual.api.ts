import { getRequest, postRequest } from '@/api/axios/common.apis'

import { Item } from '../inventory/inventory.types'

interface Answer {
  id: number
  answer: string
}

interface FormData {
  data: {
    nickname: string
    answers: Answer[]
    otherKeywordPercents: KeywordPercents
  }
  userType: string
  userId: string
}

export interface UserData {
  data: {
    nickname: string
    answers: Answer[]
    otherKeywordPercents: KeywordPercents
  }
  userType: string
  userId: string
}

interface CharacterItems {
  face: Item
  body: Item
  expression: Item
  set: Item
}

interface Question {
  id: number
  question: string
}

interface MyManualQAPair {
  id: number
  question: string
  answer: string
}

interface KeywordPercents {
  [key: string]: number
}

interface CharacterData {
  nickname: string
  baseImage: string
  characterItems: CharacterItems
  questions: Question[]
  myManualQAPair: MyManualQAPair[]
  originKeywordPercents: KeywordPercents
  otherKeywordPercents: KeywordPercents
}

/* page get 요청 */
export const fetchOthersManual = async () => {
  const response = await getRequest<CharacterData>(
    '/api/jff/others-manual?userId=1',
  )

  return response
}

/* page post 요청 */
export const postOthersManual = async (data: FormData) => {
  const response = await postRequest<string>(
    '/api/jff/others-manual?userId=1',
    data.data,
  )

  return response
}
