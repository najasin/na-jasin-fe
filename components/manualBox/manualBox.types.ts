export interface IManualBoxProps {
  ownerNickname: string
  myDatas: Array<{
    id: number
    question: string
    answer?: string
  }>
  othersDatas: Array<{
    nickname: string
    qas: Array<{ id: number; question: string; answer: string }>
  }>
  isOwner: boolean
}

export interface IFormData {
  answers: Record<string, string>
}
