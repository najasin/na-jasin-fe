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
  originKeywordPercents: IKeyword[]
  otherKeywordPercents: IKeyword[]
}

/* page get 요청 */

export const fetchOthersManualById = async (
  userType: string,
  userId: string,
): Promise<GetData> => {
  try {
    const response = await getRequest<GetData>(
      `api/${userType}/others-manual?userId=${userId}`,
    )
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
