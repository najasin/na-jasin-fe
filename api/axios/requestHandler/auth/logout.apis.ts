import { postRequest } from '../../common.apis'
import { LogoutResponse } from './auth.types'

const logout = async (): Promise<LogoutResponse | Error> => {
  try {
    const response = await postRequest<LogoutResponse>('/auth2/logout')

    return response
  } catch (error) {
    return error as Error
  }
}

export default logout
