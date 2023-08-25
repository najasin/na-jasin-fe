import { CharacterItems } from '@/components/characterBox/characterBox.types'
import {
  IKeywordWithId,
  IQuestions,
} from '@/components/makeMyManual/makeMyManual.types'

interface IMyManualDatas {
  nickname: string
  baseImage: string
  characterItems: CharacterItems
  questions: IQuestions[]
  exampleKeywords: IKeywordWithId[]
}

interface IMyManualPostResponse {
  userId: string
  userType: string
}

interface IRequestOptions {
  headers?: {
    Authorization: string
  }
}

export type { IMyManualDatas, IMyManualPostResponse, IRequestOptions }
