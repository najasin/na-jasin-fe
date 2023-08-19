import { getRequest } from '../../common.apis'
import { IMyPageDatas } from './mypage.types'

/**
 *
 * @example 외부에서 try catch 처리
 * ```js
 * try {
 *  const data = await getMypage({ userType: 'JFF', userId: 'dasdas' })
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
}: {
  userType: string
  userId: string
}): Promise<IMyPageDatas> => {
  const response = await getRequest<IMyPageDatas>(
    `/api/${userType}/mypage?userId=${userId}`,
  )

  return response
}

export { getMypage }
