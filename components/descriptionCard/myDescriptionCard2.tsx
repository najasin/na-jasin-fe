import classNames from 'classnames/bind'
import { UseFormRegisterReturn } from 'react-hook-form'

import { Input } from '../commonInput/input'
import { splitQuestion } from './myDescriptionCard.helpers'
import styles from './myDescriptionCard.module.scss'

// Import the helper function

const cx = classNames.bind(styles)

export default function MyDescriptionCard2({
  question,
  answer,
  defaultValue,
  register,
  isInvalid,
}: {
  question: { id: number; question: string }
  answer?: string
  defaultValue?: string
  register?: UseFormRegisterReturn
  isInvalid?: boolean
}) {
  const [firstPart, secondPart] = splitQuestion(question.question) // Use the helper function

  return (
    <div className={cx('card')}>
      <p className={cx('first')}>{firstPart}</p>
      {!answer ? (
        <div className={cx('manualInput')}>
          <Input variant="small">
            <Input.TextField
              defaultValue={defaultValue}
              register={register}
              isInvalid={isInvalid}
            />
          </Input>
        </div>
      ) : (
        <p className={cx('answer')}>{answer}</p>
      )}
      {secondPart}
    </div>
  )
}
