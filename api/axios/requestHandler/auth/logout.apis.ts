import axios from 'axios'

import { postRequest } from '../../common.apis'
import { LogoutResponse } from './auth.types'

const logout = async () => {
  try {
    const response = await postRequest<LogoutResponse>('/auth2/logout')

    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response?.data.message) {
        return error as Error
      }
      return error.response?.data.message
    }
    return error as Error
  }
}

export default logout
