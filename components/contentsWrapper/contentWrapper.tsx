import classNames from 'classnames/bind'

import styles from './contentWrapper.module.scss'

const cx = classNames.bind(styles)

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={cx('wrapper')}>{children}</div>
}
