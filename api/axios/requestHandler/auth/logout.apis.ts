import { postRequest } from '../../common.apis'
import { LogoutResponse } from './auth.types'

/**
 *
 * @example 외부에서 try catch 처리
 * ```js
 * try {
 *  const data = await logout()
 *
 *  return response
 * } catch (error) {
 *  return error as Error
 * }
 * ```
 */
const logout = async (): Promise<LogoutResponse> => {
  const response = await postRequest<LogoutResponse>('/auth2/logout')

  return response
}

export default logout
