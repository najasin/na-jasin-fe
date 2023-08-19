import { getRequest, postRequest } from '@/api/axios/common.apis'

interface Answer {
  id: string
  answer: string
}

interface KeywordPercents {
  [keyword: string]: number
}

interface FormData {
  data: {
    nickname: string
    answers: Answer[]
    otherKeywordPercents: KeywordPercents
  }
  userType: string
  userId: number
}

/* page get 요청 */
export const fetchOthersManual = async () => {
  const response = await getRequest<any>('/api/jff/others-manual?userId=1')

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
