import { postRequest } from '@/api/axios/common.apis'

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
  userId: string
}

// export const postRequest = async <T>(
//   url: string,
//   data?: any,
//   config?: AxiosRequestConfig,
// ): Promise<T> => {
//   const response = await instance.post<CommonResponse<T>>(
//     url,
//     data,
//     config as InternalAxiosRequestConfig,
//   )
//   return response.data
// }

const postOthersManual = async (data: FormData) => {
  try {
    const response = await postRequest<string>(
      `/api/${data.userType}/others-manual?userId=${data.userId}`,
      data.data,
    )
    console.log(response)
  } catch (err) {
    console.log('실패')
  }
}

export { postOthersManual }
