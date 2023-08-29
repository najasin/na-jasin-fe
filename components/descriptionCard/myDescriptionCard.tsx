import classNames from 'classnames/bind'
import { UseFormRegisterReturn } from 'react-hook-form'

import { Input } from '../shared/commonInput/input'
import { splitQuestion } from './myDescriptionCard.helpers'
import styles from './myDescriptionCard.module.scss'

// Import the helper function

const cx = classNames.bind(styles)

export default function MyDescriptionCard({
  question,
  answer,
  defaultValue,
  register,
  isInvalid,
}: {
  question: string
  answer?: string
  defaultValue?: string
  register?: UseFormRegisterReturn
  isInvalid?: boolean
}) {
  const [firstPart, secondPart] = splitQuestion(question) // Use the helper function

  return (
    <div className={cx('card')}>
      {firstPart}
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
        <span className={cx('answer')}>{answer}</span>
      )}
      {secondPart}
    </div>
  )
}
