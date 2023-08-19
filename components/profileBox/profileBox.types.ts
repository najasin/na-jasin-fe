export interface IProfileBoxProps {
  nickname: string
  data: {
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
  }
  myKeywordPercents: { [key: string]: number }
  othersKeywordPercents: { [key: string]: number }
}
