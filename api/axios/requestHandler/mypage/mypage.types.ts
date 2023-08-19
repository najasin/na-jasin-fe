interface IMyPageDatas {
  nickname: string
  baseImage: string
  characterItems: {
    face: {
      id: number
      showCase: string
      layoutCase: string
    }
    body: {
      id: number
      showCase: string
      layoutCase: string
    }
    expression: {
      id: number
      showCase: string
      layoutCase: string
    }
    set: {
      id: number
      showCase: string
      layoutCase: string
    }
  }
  myManualQAPair: Array<{ id: number; question: string; answer: string }>
  othersManualQAPairs: Array<{
    nickname: string
    qas: Array<{ id: number; question: string; answer: string }>
  }>
  originKeywordPercents: {
    [keyword: string]: number
  }
  otherKeywordPercents: {
    [keyword: string]: number
  }
}

export type { IMyPageDatas }
