import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'

import MyDescriptionCard from '@/components/descriptionCard/myDescriptionCard'
import { IQuestions } from '@/components/makeMyManual/makeMyManual.types'

import { getMyManualRegister } from '@/api/axios/requestHandler/myManual/getMyManualRegister.api'

import styles from './myDescriptionCardList.module.scss'

const cx = classNames.bind(styles)
export default function MyDescriptionCardList({
  register,
  validationRules,
  formState,
}: {
  register?: UseFormRegister<FieldValues>
  validationRules?: {
    required: boolean
    minLength: {
      value: number
      message: string
    }
  }
  formState?: FormState<FieldValues>
}) {
  // {
  //   questions,
  // }: {
  //   questions: IQuestions[]
  // }
  const { data } = useQuery({
    queryKey: ['myprofileRegister'],
    queryFn: getMyManualRegister,
    refetchOnWindowFocus: true,
  })

  return (
    <>
      {data?.questions?.map(
        (question: IQuestions) =>
          question && (
            <div key={question.id} className={cx('manualItem')}>
              <MyDescriptionCard
                question={{
                  id: question.id,
                  question: question.question,
                }}
                register={
                  register &&
                  register(`answers.${question.id}.answer`, validationRules)
                }
                isInvalid={
                  formState && formState.isSubmitted
                    ? !!formState.errors[`answers.answer.${question.id}`]
                    : undefined
                }
              />
            </div>
          ),
      )}
    </>
  )
}
