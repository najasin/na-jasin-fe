'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { FormState, UseFormRegister } from 'react-hook-form'

import { useParams, useSearchParams } from 'next/navigation'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import { fetchOthersManualById } from '@/api/axios/requestHandler/othersManual/getOthersManual.api'

import { IQuestions } from '../../makeMyManual/makeMyManual.types'
import { Input } from '../../shared/commonInput/input'
import { IFormInputs } from '../makeOthersManual.type'
import MakeOthersDescriptionCard from './makeOthersDescriptionCard'
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
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') as string
  const { userType } = useParams() as { userType: string }

  const { data } = useQuery({
    queryKey: ['othersData'],
    queryFn: () => fetchOthersManualById(userType, userId),
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
      <ul className={cx('list')}>
        {qusetions?.map(
          (question: IQuestions, index) =>
            question && (
              <li key={question.id} className={cx('manualItem')}>
                <MakeOthersDescriptionCard
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
              </li>
            ),
        )}
      </ul>
    </>
  )
}
