import { CharacterItems } from '../characterBox/characterBox.types'
import { TrimmedDataProps } from '../radarChart/radarChart.types'

export interface IQuestions {
  id: number
  question: string
}

export interface IAnswerItem {
  answer: string
}

export interface ITransformedAnswerItem {
  id: number
  answer: string
}

export interface IFormInputs {
  nickname: string
  answers: Record<string, IAnswerItem>
  keyword: string[]
  character: CharacterItems
  statGraph: TrimmedDataProps
}
