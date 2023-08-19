import { postRequest } from '@/api/axios/common.apis'

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

const postOthersManual = async (data: FormData) => {
  const response = await postRequest<string>(
    `/api/${data.userType}/others-manual?userId=${data.userId}`,
    data.data,
  )

  return response
}

export { postOthersManual }
