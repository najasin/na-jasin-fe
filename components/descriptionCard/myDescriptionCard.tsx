import classNames from 'classnames/bind'

import { Input } from '@/components/commonInput/input'

import styles from './myDescriptionCard.module.scss'
import { IMyDescriptionCardProps } from './myDescriptionCard.types'

const cx = classNames.bind(styles)

export default function MyDescriptionCard({
  question,
  answer,
  defaultValue,
}: IMyDescriptionCardProps) {
  return (
    <div className={cx('card')}>
      {question.question.split('---')[0]}

      {answer ? (
        <span className={cx('answer')}>{answer}</span>
      ) : (
        <div className={cx('manualInput')}>
          <Input variant="small">
            <Input.TextField defaultValue={defaultValue} />
          </Input>
        </div>
      )}
      {question.question.split('---')[1]}
    </div>
  )
}
