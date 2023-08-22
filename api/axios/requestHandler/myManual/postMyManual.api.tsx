import {
  IAnswerItem,
  IPercentWithId,
} from '@/components/makeMyManual/makeMyManual.types'

import { postRequest } from '@/api/axios/common.apis'

/**
 *
 * @example
 * ```js
 try {
 *  const response = await postMyManual({
        userType,
        token,
        nickname,
        selectedFaceItem,
        selectedBodyItem,
        selectedExpressionItem,
        selectedSet,
        answers,
        statsGraphValue,
        )
 *
 *  return response
 * } catch (error) {
 *  return error as Error
 * }
 * ```
 */
const postMyManual = async ({
  userType,
  nickname,
  selectedFaceItem,
  selectedBodyItem,
  selectedExpressionItem,
  selectedSet,
  answers,
  keywordPercents,
}: {
  userType: string
  nickname: string
  selectedFaceItem?: number
  selectedBodyItem?: number
  selectedExpressionItem?: number
  selectedSet?: number
  answers: IAnswerItem[]
  keywordPercents: IPercentWithId[]
}): Promise<string> => {
  console.log({
    nickname,
    characterItems: {
      ...(selectedFaceItem ? { face: selectedFaceItem } : {}),
      ...(selectedBodyItem ? { body: selectedBodyItem } : {}),
      ...(selectedExpressionItem ? { expression: selectedExpressionItem } : {}),
      ...(selectedSet ? { set: selectedSet } : {}),
    },
    answers,
    keywordPercents,
  })
  const response = await postRequest<string>(`/api/${userType}/my-manual`, {
    nickname,
    characterItems:
      ((selectedFaceItem || selectedBodyItem || selectedExpressionItem) && {
        face: {
          id: selectedFaceItem,
        },
        body: {
          id: selectedBodyItem,
        },
        expression: {
          id: selectedExpressionItem,
        },
      }) ||
      (selectedSet && {
        set: selectedSet,
      }),
    answers,
    keywordPercents,
  })

  return response
}

export { postMyManual }
