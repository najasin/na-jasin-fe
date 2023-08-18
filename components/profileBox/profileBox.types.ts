export interface IProfileBoxProps {
  nickname: string
  data: {
    itemsData: {
      baseImage: string
      selectedItems: {
        face: string
        body: string
        expression: string
        set: string
      }
    }
  }
  myKeywordPercents: { [key: string]: number }
  othersKeywordPercents: { [key: string]: number }
}
