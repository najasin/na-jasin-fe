interface IMyPageDatas {
  userTypes: string[]
  nickname: string
  baseImage: string
  characterItems: {
    face: CharacterItem
    body: CharacterItem
    expression: CharacterItem
    set: CharacterItem
  }
  myManualQAPair: QAs
  othersManualQAPairs: Array<{
    nickname: string
    qas: QAs
  }>
  originKeywordPercents: KeywordPercents
  otherKeywordPercents: KeywordPercents
  isOwner: boolean
}

type CharacterItem = { id: number; showCase: string; layoutCase: string }

type KeywordPercents = Array<{ id: number; keyword: string; percent: number }>

type QAs = Array<{ id: number; question: string; answer: string }>

export type { IMyPageDatas }
