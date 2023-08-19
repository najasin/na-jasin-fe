export interface IManualBoxProps {
  myDatas: Array<{
    id: number
    question: { question: string }
    answer?: string
  }>
  othersDatas: Array<{
    nickname: string
    qas: Array<{ id: number; question: string; answer: string }>
  }>
  type: string
  onClickMyTypeBtn: () => void
  onClickOthersTypeBtn: () => void
}

export interface IFormData {
  answers: Record<string, string>
}
