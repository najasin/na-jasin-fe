export interface ISelectedCharacter {
  baseImage: string
  characterItems:
    | {
        face: string
        body: string
        expression: string
      }
    | {
        set: string
      }
}
