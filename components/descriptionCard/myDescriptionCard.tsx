import classNames from 'classnames/bind'

import styles from './myDescriptionCard.module.scss'

const cx = classNames.bind(styles)

export default function MyDescriptionCard({ answer }: { answer: string }) {
  return (
    <div className={cx('card')}>
      <p className={cx('answer')}>{answer}</p>
    </div>
  )
}
