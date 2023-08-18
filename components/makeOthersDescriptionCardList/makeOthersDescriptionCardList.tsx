'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import { Input } from '../commonInput/input'
// import MakeOthersDescriptionCard from './makeOthersDescriptionCard'
import MyDescriptionCard2 from '../descriptionCard/myDescriptionCard2'
import { IQuestions } from '../makeMyManual/makeMyManual.types'
import { fetchOthersData } from '../makeOthersManual/makeOthersManual.api'
import styles from './makeOthersDescriptionCardList.module.scss'

const cx = classNames.bind(styles)

export default function MakeOthersDescriptionCardList({
  register,
  validationRules,
  step,
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
  step: string
}) {
  const { data } = useQuery({
    queryKey: ['othersData2'],
    queryFn: fetchOthersData,
    refetchOnWindowFocus: true,
  })

  const isTablet: boolean = useBreakpoint({ query: '(max-width: 1199px)' })
  const isMobile: boolean = useBreakpoint({ query: '(max-width: 768px)' })

  let inputVariant: string
  if (isTablet) {
    inputVariant = 'medium'
  } else if (isMobile) {
    inputVariant = 'small'
  } else {
    inputVariant = 'large'
  }

  return (
    <>
      <h3 className={cx('manualTitle')}>닉네임</h3>
      <div className={cx('input')}>
        <Input variant={inputVariant}>
          <Input.TextField
            id="nickname"
            register={
              register &&
              register('nickname', {
                ...(step === 'manual' && { ...validationRules }),
              })
            }
            isInvalid={
              formState?.isSubmitted ? !!formState.errors.nickname : undefined
            }
          />
        </Input>
      </div>
      <h3 className={cx('manualTitle')}>사용법</h3>
      {data?.othersData2?.questions?.map(
        (question: IQuestions) =>
          question && (
            <div key={question.id} className={cx('manualItem')}>
              <MyDescriptionCard2
                question={{
                  id: question.id,
                  question: question.question,
                }}
                register={register && register(question.id, validationRules)}
                isInvalid={
                  formState && formState.isSubmitted
                    ? !!formState.errors[question.id]
                    : undefined
                }
              />
            </div>
          ),
      )}
    </>
  )
}

// import { useQuery } from '@tanstack/react-query'
// import classNames from 'classnames/bind'
// import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'

// import MyDescriptionCard2 from '@/components/descriptionCard/myDescriptionCard2'
// import { IQuestions } from '@/components/makeMyManual/makeMyManual.types'

// import { fetchMyProfileRegisterData } from '../makeMyManual/makeMyManual.api'
// import styles from './makeOthersDescriptionCardList.module.scss'

// const cx = classNames.bind(styles)
// export default function MyDescriptionCardList({
//   register,
//   validationRules,
//   formState,
// }: {
//   register?: UseFormRegister<FieldValues>
//   validationRules?: {
//     required: boolean
//     minLength: {
//       value: number
//       message: string
//     }
//   }
//   formState?: FormState<FieldValues>
// }) {
//   // {
//   //   questions,
//   // }: {
//   //   questions: IQuestions[]
//   // }
//   const { data } = useQuery({
//     queryKey: ['myprofileRegister'],
//     queryFn: fetchMyProfileRegisterData,
//     refetchOnWindowFocus: true,
//   })
//   //   const { data } = useQuery({
// //     queryKey: ['othersData2'],
// //     queryFn: fetchOthersData,
// //     refetchOnWindowFocus: true,
// //   })
//   return (
//     <>
//       {data?.itemsData?.questions?.map(
//         (question: IQuestions) =>
//           question && (
//             <div key={question.id} className={cx('manualItem')}>
//               <MyDescriptionCard2
//                 question={{
//                   id: question.id,
//                   question: question.question,
//                 }}
//                 register={
//                   register && register(`manual${question.id}`, validationRules)
//                 }
//                 isInvalid={
//                   formState && formState.isSubmitted
//                     ? !!formState.errors[`manual${question.id}`]
//                     : undefined
//                 }
//               />
//             </div>
//           ),
//       )}
//     </>
//   )
// }
