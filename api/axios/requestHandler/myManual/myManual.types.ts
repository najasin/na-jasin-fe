import {
  IKeywordWithId,
  IQuestions,
} from '@/components/makeMyManual/makeMyManual.types'
import { CharacterItems } from '@/components/shared/characterBox/characterBox.types'

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
