import { getRequest } from '@/api/axios/common.apis'

export interface IKeyword {
  [key: string]: number
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
  try {
    const response = await getRequest<GetData>('api/jff/others-manual?userId=1')
    if (!response) {
      throw new Error('no response')
    }
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
