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
  token: string | undefined
}): Promise<IMyPageDatas> => {
  const response = await getRequest<IMyPageDatas>(
    `/api/user/${userType}/mypage?userId=${userId}`,
    {
      headers: {
        Authorization: `${token}`,
      },
    },
  )

  return response
}

export { getMypage }
