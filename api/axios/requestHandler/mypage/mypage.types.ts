interface IMyPageDatas {
  nickname: string
  baseImage: string
  characterItems: {
    face: {
      id: string
      showCase: string
      layoutCase: string
    }
    body: {
      id: string
      showCase: string
      layoutCase: string
    }
    expression: {
      id: string
      showCase: string
      layoutCase: string
    }
  }
  myManualQAPair: Array<{ id: string; question: string; answer: string }>
  othersManualQAPairs: Array<{
    nickname: string
    qas: Array<{ id: string; question: string; answer: string }>
  }>
  originalKeywordPercents: {
    [keyword: string]: number
  }
  otherKeywordPercents: {
    [keyword: string]: number
  }
}

export type { IMyPageDatas }
