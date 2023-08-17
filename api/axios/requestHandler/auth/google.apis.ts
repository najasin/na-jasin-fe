import axios from 'axios'

import { getRequest } from '../../common.apis'
import { AuthResponse } from './auth.types'

const loginInGoogle = async () => {
  try {
    const response = await getRequest<AuthResponse>('/auth2/authorize/google')

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

export default loginInGoogle
