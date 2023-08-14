import { ButtonStyle } from '@/components/commonBtn/commonBtn.types'

export type ClickHandler = (e: React.MouseEvent) => void

export interface IKeywordBtnProps {
  type?: 'button' | 'submit'
  style?: ButtonStyle
  children: React.ReactNode
  onClick?: ClickHandler
}
