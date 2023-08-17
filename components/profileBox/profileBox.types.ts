export interface IProfileBoxProps {
  data: {
    itemsData: {
      baseImage: string
      selectedItems: { face: string; body: string; expression: string }
    }
  }
  myKeywordPercents: { [key: string]: number }
  othersKeywordPercents: { [key: string]: number }
}
