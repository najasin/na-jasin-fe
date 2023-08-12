import classNames from 'classnames/bind'

import styles from './descriptionCard.module.scss'
import { DescriptionCardProps } from './descriptionCard.types'

const cx = classNames.bind(styles)

export default function DescriptionCard({
  qa,
  nickname,
}: DescriptionCardProps) {
  return (
    <div className={cx('card')}>
      {nickname && (
        <div className={cx('nicknameChip')}>{`${nickname}님 작성`}</div>
      )}
      <div className={cx('answerBox')}>
        {qa.map((pair, index) => (
          // API 요청 시 질문과 답변이 각각 오므로, 질문과 답변을 조합하여 한 문장으로 만들어주는 helper 함수 구현 예정
          <div key={index}>{pair.question}</div>
        ))}
      </div>
    </div>
  )
}
