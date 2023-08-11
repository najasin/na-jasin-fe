export enum GnbChipStyle {
  GREY = 'grey',
  LIGHTBLUE = 'lightBlue',
  DEEPBLUE = 'deepBlue',
}

export type ClickHandler = (e: React.MouseEvent) => void

export interface GnbChipProps {
  type?: 'button' | 'submit'
  style?: GnbChipStyle
  children: React.ReactNode
  onClick?: ClickHandler
}
