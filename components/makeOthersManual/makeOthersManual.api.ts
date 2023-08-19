import axios from 'axios'

import {
  CommonResponse,
  CustomAxiosInterface,
} from '@/api/axios/instance/instance.types'

interface Answer {
  id: number
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
  userId: string
}

const instance: CustomAxiosInterface = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://na-jasin.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  timeout: 30000,
})

/* get 요청 */
export const getRequest = async <T>(url: string): Promise<T> => {
  const response = await instance.get<CommonResponse<T>>(url)
  return response.data
}

/* post 요청 */
export const postRequest = async <T>(url: string, data?: any): Promise<T> => {
  const response = await instance.post<CommonResponse<T>>(url, data)
  return response.data
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
