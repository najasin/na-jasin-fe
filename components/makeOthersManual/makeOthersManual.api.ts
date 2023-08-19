import { getRequest, postRequest } from '@/api/axios/common.apis'

export interface IKeyword {
  [key: string]: number
}
export interface Answer {
  id: number
  answer: string
}

export interface FormData {
  data: {
    nickname: string
    answers: Answer[]
    otherKeywordPercents: IKeyword
  }
  userType: string
  userId: string
}

export type Item = {
  id: number
  showCase: string
  layoutCase: string
}

export interface ICharacterItems {
  face: Item
  body: Item
  expression: Item
  set: Item
}

export interface GetData {
  nickname: string
  baseImage: string
  characterItems: ICharacterItems
  questions: Array<{
    id: number
    question: string
  }>
  myManualQAPair: Array<{
    id: number
    question: string
    answer: string
  }>
  originKeywordPercents: IKeyword
  otherKeywordPercents: IKeyword
}

/* page get 요청 */
export const fetchOthersManual = async () => {
  const response: GetData = await getRequest('api/jff/others-manual?userId=1')

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
