import { getRequest } from '../../common.apis'
import { AuthResponse } from './auth.types'

const loginInKakao = async (): Promise<AuthResponse | Error> => {
  try {
    const response = await getRequest<AuthResponse>('/auth2/authorize/kakao')

    return response
  } catch (error) {
    return error as Error
  }
}

export default loginInKakao
