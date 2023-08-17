import { putRequest } from '../../common.apis'

/**
 *
 * @example 외부에서 try catch 처리
 * ```js
 * try {
 *  const response = await updateNickname({nickname: 'hi', userType: 'jff', token: 'token' })
 *
 *  return response
 * } catch (error) {
 *  return error as Error
 * }
 * ```
 */
const updateNickname = async ({
  nickname,
  userType,
  token,
}: {
  nickname: string
  userType: string
  token: string
}): Promise<string> => {
  const response = await putRequest<string>(
    `/api/${userType}/nickname`,
    {
      nickname,
      userType,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response
}

/**
 *
 * @example 외부에서 try catch 처리
 * ```js
 * try {
 *  const data = await updateAnswers({ answers: [{ id: 'dasda', answer: 'dasda' }], userType: 'jff', token: 'token' })
 *
 *  return response
 * } catch (error) {
 *  return error as Error
 * }
 * ```
 */
const updateAnswers = async ({
  answers,
  userType,
  token,
}: {
  answers: Array<{ id: string; answer: string }>
  userType: string
  token: string
}): Promise<string> => {
  const response = await putRequest<string>(
    '/api/answers',
    {
      answers,
      userType,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response
}

export { updateNickname, updateAnswers }
