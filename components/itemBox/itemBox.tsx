import classNames from 'classnames/bind'

import styles from './itemBox.module.scss'

const cx = classNames.bind(styles)

export default function ItemBox() {
  return <div className={cx('itemBox')}></div>
}
