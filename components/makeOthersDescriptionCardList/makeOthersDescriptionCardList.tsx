'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { FieldValues, UseFormRegister } from 'react-hook-form'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import { Input } from '../commonInput/input'
import { fetchOthersData } from '../makeOthersManual/makeOthersManual.api'
import MakeOthersDescriptionCard from './makeOthersDescriptionCard'
import styles from './makeOthersDescriptionCardList.module.scss'

const cx = classNames.bind(styles)

export default function MakeOthersDescriptionCardList({
  register,
  validationRules,
  step,
}: {
  register?: UseFormRegister<FieldValues>
  validationRules?: {
    required: boolean
    minLength: {
      value: number
      message: string
    }
  }
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

  console.log(data?.othersData2?.questions)
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
            onChange={() => {
              console.log('kkk')
            }}
          />
        </Input>
      </div>
      <h3 className={cx('manualTitle')}>사용법</h3>
      {data?.othersData2?.questions?.map(
        (question: string, index: number) =>
          question && (
            <div key={index} className={cx('manualItem')}>
              <MakeOthersDescriptionCard
                question={question}
                register={
                  register &&
                  register(`manual.${question[index]}`, validationRules)
                }
              />
            </div>
          ),
      )}
    </>
  )
}
