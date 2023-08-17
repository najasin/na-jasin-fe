export interface ICharacterItemsWithParts {
  face: string
  body: string
  expression: string
}

export interface ICharacterItemsWithSet {
  set: string
}

export type CharacterItems = ICharacterItemsWithParts | ICharacterItemsWithSet

export interface ISelectedCharacter {
  baseImage: string
  selectedItems?: CharacterItems
  editBtn?: React.ReactNode
}
