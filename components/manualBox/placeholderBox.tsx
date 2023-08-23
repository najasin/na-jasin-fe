import classNames from 'classnames/bind'

import styles from './placeholderBox.module.scss'

const cx = classNames.bind(styles)

export default function PlaceholderBox() {
  return (
    <div className={cx('box')}>
      <p>주변 사람에게 설명서를 받아보세요!</p>
    </div>
  )
}
