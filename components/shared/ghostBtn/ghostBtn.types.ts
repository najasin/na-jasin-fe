export type ClickHandler = (e: React.MouseEvent) => void

export interface IGhostBtnProps {
  type?: 'button' | 'submit'
  onClick?: ClickHandler
}
