import classNames from 'classnames/bind'

import styles from './contentModalLayout2.module.scss'
import { ContentModalLayoutProps } from './contentModalLayout.types'

const cx = classNames.bind(styles)

export default function ContentModalLayout2({
  title,
  closeBtn,
  content,
  completeBtn,
}: ContentModalLayoutProps) {
  return (
    <div className={cx('modalOverlay')}>
      <div className={cx('modal')}>
        <div className={cx('header')}>
          <p className={cx('title')}>{title}</p>
          {closeBtn}
        </div>
        <div className={cx('contents')}>
          <div className={cx('content')}>{content}</div>
          <div>{completeBtn}</div>
        </div>
      </div>
    </div>
  )
}
