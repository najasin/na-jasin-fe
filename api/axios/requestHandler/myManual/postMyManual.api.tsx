import {
  IAnswerItem,
  IPercentWithId,
} from '@/components/makeMyManual/makeMyManual.types'

import { postRequest } from '@/api/axios/common.apis'

import { IMyManualPostResponse } from './myManual.types'

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
  baseImage,
  selectedFaceItem,
  selectedBodyItem,
  selectedExpressionItem,
  selectedSet,
  answers,
  keywordPercents,
}: {
  userType: string
  nickname: string
  baseImage?: string
  selectedFaceItem?: number
  selectedBodyItem?: number
  selectedExpressionItem?: number
  selectedSet?: number
  answers: IAnswerItem[]
  keywordPercents: IPercentWithId[]
}): Promise<IMyManualPostResponse> => {
  const response = await postRequest<IMyManualPostResponse>(
    `/api/${userType}/my-manual`,
    {
      nickname,
      baseImage,
      characterItems: {
        ...(selectedFaceItem ? { face: selectedFaceItem } : {}),
        ...(selectedBodyItem ? { body: selectedBodyItem } : {}),
        ...(selectedExpressionItem
          ? { expression: selectedExpressionItem }
          : {}),
        ...(selectedSet ? { set: selectedSet } : {}),
      },
      answers,
      keywordPercents,
    },
  )

  return response
}

export { postMyManual }
