import classNames from 'classnames/bind'

import styles from './contentModalLayout.module.scss'
import { ContentModalLayoutProps } from './contentModalLayout.types'

const cx = classNames.bind(styles)

export default function ContentModalLayout({
  title,
  closeBtn,
  children,
  completeBtn,
}: ContentModalLayoutProps) {
  return (
    <div className={cx('modal')}>
      <div className={cx('header')}>
        <p className={cx('title')}>{title}</p>
        {closeBtn}
      </div>
      <div className={cx('contents')}>
        <div className={cx('content')}>{children}</div>
        <div>{completeBtn}</div>
      </div>
    </div>
  )
}
