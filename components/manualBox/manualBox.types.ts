export interface IManualBoxProps {
  myDatas: Array<{
    id: number
    question: string
    answer?: string
  }>
  othersDatas: Array<{
    nickname: string
    qas: Array<{ id: number; question: string; answer: string }>
  }>
}

export interface IFormData {
  answers: Record<string, string>
}
