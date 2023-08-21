'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { FormState, UseFormRegister } from 'react-hook-form'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import { fetchOthersManual } from '@/api/axios/requestHandler/othersManual/getOthersManual.api'

import { Input } from '../commonInput/input'
import MyDescriptionCard2 from '../descriptionCard/myDescriptionCard2'
import { IQuestions } from '../makeMyManual/makeMyManual.types'
import { IFormInputs } from '../makeOthersManual/makeOthersManual.type'
import styles from './makeOthersDescriptionCardList.module.scss'

const cx = classNames.bind(styles)

export default function MakeOthersDescriptionCardList({
  register,
  validationRules,
  step,
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
  step: string
}) {
  const { data } = useQuery({
    queryKey: ['othersData'],
    queryFn: fetchOthersManual,
    refetchOnWindowFocus: true,
  })

  const qusetions = data?.questions

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
      {qusetions?.map(
        (question: IQuestions, index) =>
          question && (
            <div key={question.id} className={cx('manualItem')}>
              <MyDescriptionCard2
                question={{
                  id: question.id,
                  question: question.question,
                }}
                register={
                  register && register(`answer${index + 1}`, validationRules)
                }
                isInvalid={
                  formState && formState.isSubmitted
                    ? !!formState.errors[`answer${index + 1}`]
                    : undefined
                }
              />
            </div>
          ),
      )}
    </>
  )
}
