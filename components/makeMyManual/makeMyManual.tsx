'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import CharacterBox from '@/components/characterBox/characterBox'
import CommonBtn from '@/components/commonBtn/commonBtn'
import FormBox from '@/components/formBox/formBox'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import { useFunnel } from '@/hooks/useFunnel'

import { ButtonStyle } from '../commonBtn/commonBtn.types'
import { fetchMyProfileRegisterData } from './makeMyManual.api'
import styles from './makeMyManual.module.scss'
import MakeMyManualFunnel from './makeMyManualFunnel/makeMyManualFunnel'
import {
  selectedBodyItemState,
  selectedExpressionItemState,
  selectedFaceItemState,
  selectedSetState,
} from './store/makeMyManual.atom'

const cx = classNames.bind(styles)

export default function MakeMyManual() {
  const { data } = useQuery({
    queryKey: ['myprofileRegister'],
    queryFn: fetchMyProfileRegisterData,
    refetchOnWindowFocus: true,
  })

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm()
  const { Funnel, step, goPrev, goNext } = useFunnel(
    ['nickname', 'character', 'manual', 'keyword', 'statGraph'],
    'nickname',
  )
  const selectedFaceItem = useRecoilValue(selectedFaceItemState)
  const selectedBodyItem = useRecoilValue(selectedBodyItemState)
  const selectedExpressionItem = useRecoilValue(selectedExpressionItemState)
  const selectedSet = useRecoilValue(selectedSetState)

  const isTablet: boolean = useBreakpoint({ query: '(max-width: 1199px)' })

  // const validationRules = {
  //   required: '필수 입력입니다.',
  //   minLength: {
  //     value: 3,
  //     message: '3글자 이상 입력해주세요.',
  //   },
  // }

  const selectedItems = selectedSet
    ? { set: selectedSet }
    : {
        face: selectedFaceItem,
        body: selectedBodyItem,
        expression: selectedExpressionItem,
      }

  const onClickSubmit = () => {
    goNext()
  }

  return (
    <div className={cx('layout')}>
      {!isTablet && step !== 'nickname' && (
        <CharacterBox
          baseImage={data?.itemsData?.baseImage}
          selectedItems={selectedItems}
        />
      )}

      <FormBox title="나를 꾸며주세요" paddingTop={32} onBackClick={goPrev}>
        <form onSubmit={handleSubmit(onClickSubmit)}>
          <div className={cx('formContent')}>
            {(isTablet || step === 'nickname') && (
              <CharacterBox
                baseImage={data?.itemsData?.baseImage}
                selectedItems={selectedItems}
              />
            )}
            <MakeMyManualFunnel
              Funnel={Funnel}
              register={register}
              isInvalid={false}
            />
          </div>
          <div className={cx('btn')}>
            <CommonBtn
              type="submit"
              style={isSubmitting ? ButtonStyle.DEACTIVE : ButtonStyle.ACTIVE}
            >
              다음
            </CommonBtn>
          </div>
        </form>
      </FormBox>
    </div>
  )
}
