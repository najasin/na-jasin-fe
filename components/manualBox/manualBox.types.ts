export interface IManualBoxProps {
  myDatas: Array<{
    id: string
    question: { question: string }
    answer?: string
  }>
  othersDatas: Array<{
    nickname: string
    qas: Array<{ id: string; question: string; answer: string }>
  }>
  type: string
  onClickMyTypeBtn: () => void
  onClickOthersTypeBtn: () => void
}

export interface IFormData {
  answers: Record<string, string>
}
