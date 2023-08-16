export function splitQuestion(question: string) {
  const parts = question.split('---')
  return [parts[0], parts[1]]
}
