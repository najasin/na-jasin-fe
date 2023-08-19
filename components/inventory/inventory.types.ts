export type Item = {
  id: number
  showCase: string
  layoutCase: string
}

export interface ICharacterItems {
  characterItems: {
    face: Item[]
    body: Item[]
    expression: Item[]
    set: Item[]
  }
}
