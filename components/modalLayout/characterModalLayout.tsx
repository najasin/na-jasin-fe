import classNames from 'classnames/bind'

import styles from './characterModalLayout.module.scss'
import { CharacterModalLayoutProps } from './characterModalLayout.types'

const cx = classNames.bind(styles)

export default function CharacterModalLayout({
  title,
  closeBtn,
  children,
}: CharacterModalLayoutProps) {
  return (
    <div className={cx('modal')}>
      <div className={cx('header')}>
        <p className={cx('title')}>{title}</p>
        {closeBtn}
      </div>
      <div className={cx('contentContainer')}>
        <div className={cx('contents')}>{children}</div>
      </div>
    </div>
  )
}
