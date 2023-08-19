import { IAnswerItem } from '@/components/makeMyManual/makeMyManual.types'
import { TrimmedDataProps } from '@/components/radarChart/radarChart.types'

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
  statsGraphValue,
}: {
  userType: string
  nickname: string
  selectedFaceItem?: number
  selectedBodyItem?: number
  selectedExpressionItem?: number
  selectedSet?: number
  answers: IAnswerItem[]
  statsGraphValue: TrimmedDataProps
}): Promise<string> => {
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
    originKeywordPercents: statsGraphValue,
  })

  return response
}

export { postMyManual }
