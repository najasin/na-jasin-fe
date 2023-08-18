import { CharacterItems } from '@/components/characterBox/characterBox.types'
import { IQuestions } from '@/components/makeMyManual/makeMyManual.types'

interface IMyManualDatas {
  nickname: string
  baseImage: string
  characterItems: CharacterItems
  questions: IQuestions[]
  exampleKeywords: string[]
}

export type { IMyManualDatas }
