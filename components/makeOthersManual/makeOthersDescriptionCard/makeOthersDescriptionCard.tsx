import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { UseFormRegisterReturn } from 'react-hook-form'

import { useParams, useSearchParams } from 'next/navigation'

import { splitQuestion } from '@/components/descriptionCard/myDescriptionCard.helpers'
import styles from '@/components/descriptionCard/myDescriptionCard.module.scss'
import { Input } from '@/components/shared/commonInput/input'

import { fetchOthersManualById } from '@/api/axios/requestHandler/othersManual/getOthersManual.api'

const cx = classNames.bind(styles)

export default function MakeOthersDescriptionCard({
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
  const [firstPart, secondPart] = splitQuestion(question.question)
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') as string
  const { userType } = useParams() as { userType: string }

  const { data } = useQuery({
    queryKey: ['othersData'],
    queryFn: () => fetchOthersManualById(userType, userId),
  })

  const nickname = data?.nickname as string

  const formmatedFirstPart = firstPart.replace('000', nickname)

  return (
    <div className={cx('card')}>
      <p className={cx('first')}>{formmatedFirstPart}</p>
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
