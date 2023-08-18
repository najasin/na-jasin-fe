import classNames from 'classnames/bind'

import styles from './othersDescriptionCard.module.scss'
import { IOthersDescriptionCardProps } from './othersDescriptionCard.types'

const cx = classNames.bind(styles)

export default function OthersDescriptionCard({
  cardDatas,
}: IOthersDescriptionCardProps) {
  return cardDatas.map((cardData) => {
    const { nickname, datas } = cardData
    return (
      <div key={cardData.nickname} className={cx('card')}>
        <div className={cx('nicknameChip')}>{`${nickname}님 작성`}</div>
        <div className={cx('answerBox')}>
          {datas.map((answer) => (
            <p key={answer.id} className={cx('answer')}>
              {answer.sentence}
            </p>
          ))}
        </div>
      </div>
    )
  })
}
