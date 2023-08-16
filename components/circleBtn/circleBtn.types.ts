export type ClickHandler = (e: React.MouseEvent) => void

export interface ICircleBtnProps {
  type?: 'button' | 'submit'
  children: React.ReactNode
  onClick?: ClickHandler
}
