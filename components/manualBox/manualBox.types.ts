export interface IManualBoxProps {
  myDatas: Array<{
    question: { id: string; question: string }
    answer?: string
    defaultValue?: string
  }>
  othersDatas: Array<{
    nickname: string
    qas: Array<{ id: string; question: string; answer: string }>
  }>
  type: string
  onClickMyTypeBtn: () => void
  onClickOthersTypeBtn: () => void
}
