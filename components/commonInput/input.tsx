import React, {
  Children,
  ForwardedRef,
  HTMLAttributes,
  ReactElement,
  cloneElement,
  forwardRef,
} from 'react'

import classNames from 'classnames/bind'

import { gmarketSans } from '@/styles/local.fonts'

import styles from './input.module.scss'
import { TextFeildProps } from './input.types'

const cx = classNames.bind(styles)

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement
  variant: string
}

export function Input({ children, variant }: InputProps) {
  const child = Children.only(children)

  return (
    <div className={cx('inputWrapper', gmarketSans.className)}>
      {cloneElement(child, {
        className: cx('inputTextField', [variant]),
        ...child.props,
        variant,
      })}
    </div>
  )
}

Input.TextField = forwardRef(function TextField(
  { onChange, ...props }: TextFeildProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      className={cx('inputTextField')}
      ref={ref}
      onChange={onChange}
      {...props}
    />
  )
})
