import {
  CharacterItem,
  KeywordPercents,
} from '@/api/axios/requestHandler/mypage/mypage.types'

export interface IProfileBoxProps {
  nickname: string
  data: {
    baseImage: string
    characterItems: {
      face: CharacterItem
      body: CharacterItem
      expression: CharacterItem
      set: CharacterItem
    }
  }
  myKeywordPercents: KeywordPercents
  othersKeywordPercents: KeywordPercents
  isOwner: boolean
}
