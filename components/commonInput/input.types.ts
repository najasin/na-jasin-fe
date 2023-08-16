import { InputHTMLAttributes } from 'react'

import { UseFormRegisterReturn } from 'react-hook-form'

/**
 * 버튼 타입 enum입니다.
 * @DEACTIVE 비활성화 버튼
 * @ACTIVE 활성화 버튼
 */
export enum InputStyle {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export type ChangeHandler = (e: React.ChangeEvent) => void

export interface TextFeildProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onChange?: ChangeHandler
  register?: UseFormRegisterReturn
}
