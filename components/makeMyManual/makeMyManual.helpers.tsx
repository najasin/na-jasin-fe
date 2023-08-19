import { IAnswerItem, ITransformedAnswerItem } from './makeMyManual.types'

export const getSelectedItemsFromSet = (selectedSet: string) => {
  if (selectedSet) {
    return { set: selectedSet }
  }
  return undefined
}

export const getSelectedItemsFromOtherItems = ({
  selectedFaceItemId,
  selectedBodyItemId,
  selectedExpressionItemId,
}: {
  selectedFaceItemId: string
  selectedBodyItemId: string
  selectedExpressionItemId: string
}) => {
  if (selectedFaceItemId || selectedBodyItemId || selectedExpressionItemId) {
    return {
      face: selectedFaceItemId,
      body: selectedBodyItemId,
      expression: selectedExpressionItemId,
    }
  }
  return undefined
}

export const transformData = (
  data: Record<number, IAnswerItem>,
): ITransformedAnswerItem[] =>
  Object.keys(data).map((key: string) => ({
    id: +key,
    answer: data[+key].answer,
  }))
