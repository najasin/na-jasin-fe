export interface IManualBoxProps {
  myDatas: Array<{
    question: { id: string; question: string }
    answer?: string
    defaultValue?: string
  }>
  othersDatas: Array<{ id: string; question: string; answer: string }>
  type: string
  nickname: string
  onClickMyTypeBtn: () => void
  onClickOthersTypeBtn: () => void
}
