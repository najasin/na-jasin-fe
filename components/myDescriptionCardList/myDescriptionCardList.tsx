import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'

import MyDescriptionCard2 from '@/components/descriptionCard/myDescriptionCard2'
import { IQuestions } from '@/components/makeMyManual/makeMyManual.types'

import { fetchMyProfileRegisterData } from '../makeMyManual/makeMyManual.api'
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
    queryFn: fetchMyProfileRegisterData,
    refetchOnWindowFocus: true,
  })

  return (
    <>
      {data?.itemsData?.questions?.map(
        (question: IQuestions) =>
          question && (
            <div key={question.id} className={cx('manualItem')}>
              <MyDescriptionCard2
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
