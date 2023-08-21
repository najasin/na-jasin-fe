import { postRequest } from '@/api/axios/common.apis'

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

/* page post 요청 */
export const postOthersManual = async (data: FormData) => {
  const response = await postRequest<string>(
    '/api/jff/others-manual?userId=1',
    data.data,
  )

  return response
}
