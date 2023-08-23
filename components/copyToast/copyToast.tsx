import classNames from 'classnames/bind'

import styles from './copyToast.module.scss'

const cx = classNames.bind(styles)

export default function CopyToast() {
  return (
    <div className={cx('copyToast')}>
      <p className={cx('heading')}>링크 복사 완료!</p>
      <p className={cx('content')}>붙여넣어 보세요.</p>
    </div>
  )
}
