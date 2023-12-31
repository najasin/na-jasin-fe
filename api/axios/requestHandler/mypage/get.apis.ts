import { getRequest } from '../../common.apis'
import { IMyPageDatas } from './mypage.types'

/**
 *
 * @example 외부에서 try catch 처리
 * ```js
 * try {
 *  const data = await getMypage({ userType: 'jff', userId: 'dasdas' })
 *
 *  return data
 * } catch (error) {
 *  return error as Error
 * }
 * ```
 */
const getMypage = async ({
  userType,
  userId,
  token,
}: {
  userType: string
  userId: string
  token?: string
}): Promise<IMyPageDatas> => {
  const config = token ? { headers: { Authorization: `${token}` } } : {}

  const response = await getRequest<IMyPageDatas>(
    `/api/user/${userType}/mypage?userId=${userId}`,
    config
  )

  return response
}

export { getMypage }
