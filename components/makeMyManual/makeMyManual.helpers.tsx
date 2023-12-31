import { ITransformedAnswerItem } from './makeMyManual.types'

export const getSelectedItemsFromSet = (selectedSet: string) => {
  if (selectedSet) {
    return { set: selectedSet }
  }
  return undefined
}

export const getSelectedItemsFromOtherItems = ({
  selectedFaceItem,
  selectedBodyItem,
  selectedExpressionItem,
}: {
  selectedFaceItem: string
  selectedBodyItem: string
  selectedExpressionItem: string
}) => {
  if (selectedFaceItem || selectedBodyItem || selectedExpressionItem) {
    return {
      face: selectedFaceItem,
      body: selectedBodyItem,
      expression: selectedExpressionItem,
    }
  }
  return undefined
}

export const transformData = (
  data: Record<number, string>,
): ITransformedAnswerItem[] =>
  Object.entries(data).map(([key, value]) => ({
    id: parseInt(key, 10),
    answer: value,
  }))
