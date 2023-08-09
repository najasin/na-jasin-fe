import React, {
  Children,
  ForwardedRef,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  cloneElement,
  forwardRef,
} from 'react'

import classNames from 'classnames/bind'

import { gmarketSans } from '@/styles/local.fonts'

import styles from './input.module.scss'

const cx = classNames.bind(styles)

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement
  size: string
}

export function Input({ children, size }: InputProps) {
  const child = Children.only(children)

  return (
    <div className={cx('inputWrapper', gmarketSans.className)}>
      {cloneElement(child, {
        className: cx('inputTextField', [size]),
        ...child.props,
      })}
    </div>
  )
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>

Input.TextField = forwardRef(function TextField(
  { onChange, size, ...props }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      className={cx('inputTextField')}
      ref={ref}
      onChange={onChange}
      size={size}
      {...props}
    />
  )
})
