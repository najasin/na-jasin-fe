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
  token?: string
}): Promise<string> => {
  const response = await putRequest<string>(
    `/api/user/${userType}/nickname`,
    {
      nickname,
    },
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {},
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
  answers: Array<{ id: number; answer: string }>
  userType: string
  token?: string
}): Promise<string> => {
  const response = await putRequest<string>(
    `/api/user/${userType}/answer`,
    {
      answers,
    },

    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {},
  )

  return response
}

/**
 *
 * @example 외부에서 try catch 처리
 * ```js
 * try {
 *  const data = await updateCharacter({ characterItems, userType, token, })
 *
 *  return response
 * } catch (error) {
 *  return error as Error
 * }
 * ```
 */
const updateCharacter = async ({
  face,
  body,
  expression,
  set,
  userType,
  token,
}: {
  face: number | null
  body: number | null
  expression: number | null
  set: number | null
  userType: string
  token?: string
}): Promise<string> => {
  console.log(face, body, expression, set)
  const characterItems = { face, body, expression, set }
  console.log(characterItems)
  const response = await putRequest<string>(
    `/api/user/${userType}/character`,
    {
      characterItems,
    },

    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {},
  )

  return response
}

export { updateNickname, updateAnswers, updateCharacter }
