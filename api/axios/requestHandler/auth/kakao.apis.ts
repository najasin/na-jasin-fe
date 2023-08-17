import { getRequest } from '../../common.apis'
import { AuthResponse } from './auth.types'

/**
 *
 * @example 외부에서 try catch 처리
 * ```js
 * try {
 *  const data = await loginWithKakao()
 *
 *  return response
 * } catch (error) {
 *  return error as Error
 * }
 * ```
 */
const loginWithKakao = async (): Promise<AuthResponse> => {
  const response = await getRequest<AuthResponse>('/auth2/authorize/kakao')

  return response
}

export default loginWithKakao
