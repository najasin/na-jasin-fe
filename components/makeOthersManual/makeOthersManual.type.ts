import { IAnswerItem } from '../makeMyManual/makeMyManual.types'

export interface IFormInputs {
  nickname: string
  answers: Record<string, IAnswerItem>
}
