/**
 * 버튼 타입 enum입니다.
 * @DEACTIVE 비활성화 버튼
 * @ACTIVE 활성화 버튼
 */
export enum ButtonStyle {
  DEACTIVE = 'deactive',
  ACTIVE = 'active',
}

export type ClickHandler = (e: React.MouseEvent) => void

export interface CommonBtnProps {
  type?: 'button' | 'submit'
  style?: ButtonStyle
  children: React.ReactNode
  onClick?: ClickHandler | undefined
  confetti?: boolean
}
