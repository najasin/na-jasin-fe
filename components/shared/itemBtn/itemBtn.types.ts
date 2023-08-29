import { ButtonStyle } from '@/components/shared/commonBtn/commonBtn.types'

export type ClickHandler = (e: React.MouseEvent) => void

export interface IItemBtnProps {
  type?: 'button' | 'submit'
  style?: ButtonStyle
  children: React.ReactNode
  onClick?: ClickHandler
}
