export type ClickHandler = (e: React.MouseEvent) => void
export interface FormBoxProps {
  title: string
  children?: React.ReactNode
  showBack?: boolean
  onBackClick?: ClickHandler
  paddingTop?: number
}
