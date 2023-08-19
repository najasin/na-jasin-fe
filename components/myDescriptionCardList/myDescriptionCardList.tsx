import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { FormState, UseFormRegister } from 'react-hook-form'

import MyDescriptionCard from '@/components/descriptionCard/myDescriptionCard'
import {
  IFormInputs,
  IQuestions,
} from '@/components/makeMyManual/makeMyManual.types'

import { getMyManualRegister } from '@/api/axios/requestHandler/myManual/getMyManualRegister.api'

import styles from './myDescriptionCardList.module.scss'

const cx = classNames.bind(styles)
export default function MyDescriptionCardList({
  register,
  validationRules,
  formState,
}: {
  register?: UseFormRegister<IFormInputs>
  validationRules?: {
    required: boolean
    minLength: {
      value: number
      message: string
    }
  }
  formState?: FormState<IFormInputs>
}) {
  const { data } = useQuery({
    queryKey: ['myprofileRegister'],
    queryFn: getMyManualRegister,
    refetchOnWindowFocus: true,
  })

  return (
    <>
      {data?.questions &&
        data?.questions.map(
          (question: IQuestions) =>
            question && (
              <div key={question.id} className={cx('manualItem')}>
                <MyDescriptionCard
                  question={question.question}
                  register={
                    register &&
                    register(`answers.${question.id}`, validationRules)
                  }
                  isInvalid={
                    formState && formState.isSubmitted
                      ? !!formState.errors.answers?.[question.id]
                      : undefined
                  }
                />
              </div>
            ),
        )}
    </>
  )
}
