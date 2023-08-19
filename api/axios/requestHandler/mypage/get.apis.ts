import { getRequest } from '../../common.apis'
import { IMyPageDatas } from './mypage.types'

/**
 *
 * @example 외부에서 try catch 처리
 * ```js
 * try {
 *  const data = await const data = await getMypage({ userType: 'jff', userId: 'dasdas' })
 *
 *  return response
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
  userId: number
}): Promise<IMyPageDatas> => {
  const response = await getRequest<IMyPageDatas>(
    `/api/${userType}/mypage?userId=${userId}`,
  )

  return response
}

export { getMypage }
