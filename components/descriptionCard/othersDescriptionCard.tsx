import classNames from 'classnames/bind'

import styles from './othersDescriptionCard.module.scss'
import { DescriptionCardProps } from './othersDescriptionCard.types'

const cx = classNames.bind(styles)

export default function OthersDescriptionCard({
  answers,
  nickname,
}: DescriptionCardProps) {
  return (
    <div className={cx('card')}>
      {nickname && (
        <div className={cx('nicknameChip')}>{`${nickname}님 작성`}</div>
      )}
      <div className={cx('answerBox')}>
        {answers.map((answer) => (
          <p key={answer.id} className={cx('answer')}>
            {answer.answer}
          </p>
        ))}
      </div>
    </div>
  )
}
