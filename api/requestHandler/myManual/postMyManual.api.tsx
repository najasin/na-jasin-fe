import { TrimmedDataProps } from '@/components/radarChart/radarChart.types'

import { postRequest } from '@/api/axios/common.apis'

/**
 *
 * @example 외부에서 try catch 처리
 * ```js

 * ```
 */
const postMyManual = async ({
  userType,
  token,
  nickname,
  selectedFaceItem,
  selectedBodyItem,
  selectedExpressionItem,
  selectedSet,
  answers,
  statsGraphValue,
}: {
  userType: string
  token: string
  nickname: string
  selectedFaceItem: string
  selectedBodyItem: string
  selectedExpressionItem: string
  selectedSet: string
  answers: []
  statsGraphValue: TrimmedDataProps
}): Promise<string> => {
  const response = await postRequest<string>(
    `/api/${userType}/my-manual`,
    {
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
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response
}

export { postMyManual }
