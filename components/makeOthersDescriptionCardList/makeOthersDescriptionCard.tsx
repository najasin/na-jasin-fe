import classNames from 'classnames/bind'
import { UseFormRegisterReturn } from 'react-hook-form'

import { Input } from '../commonInput/input'
import { splitQuestion } from '../descriptionCard/myDescriptionCard.helpers'
import styles from './makeOthersDescriptionCard.module.scss'

// Import the helper function

const cx = classNames.bind(styles)

export default function MakeOthersDescriptionCard({
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
  console.log(question)
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
        <p className={cx('answer')}>{answer}</p>
      )}
      {secondPart}
    </div>
  )
}
