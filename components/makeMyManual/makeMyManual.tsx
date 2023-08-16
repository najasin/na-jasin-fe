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
import {
  getSelectedItemsFromOtherItems,
  getSelectedItemsFromSet,
} from './makeMyManual.helpers'
import styles from './makeMyManual.module.scss'
import MakeMyManualFunnel from './makeMyManualFunnel/makeMyManualFunnel'
import {
  selectedBodyItemState,
  selectedExpressionItemState,
  selectedFaceItemState,
  selectedKeywordsState,
  selectedSetState,
} from './store/makeMyManual.atom'

const cx = classNames.bind(styles)

export default function MakeMyManual() {
  const { data } = useQuery({
    queryKey: ['myprofileRegister'],
    queryFn: fetchMyProfileRegisterData,
    refetchOnWindowFocus: true,
  })

  const { handleSubmit, register, formState, setError, clearErrors } = useForm()
  const { Funnel, step, goPrev, goNext } = useFunnel(
    ['nickname', 'character', 'manual', 'keyword', 'statGraph'],
    'nickname',
  )
  const selectedFaceItem = useRecoilValue(selectedFaceItemState)
  const selectedBodyItem = useRecoilValue(selectedBodyItemState)
  const selectedExpressionItem = useRecoilValue(selectedExpressionItemState)
  const selectedSet = useRecoilValue(selectedSetState)
  const selectedKeywords = useRecoilValue(selectedKeywordsState)
  const isTablet: boolean = useBreakpoint({ query: '(max-width: 1199px)' })

  const selectedItems =
    getSelectedItemsFromSet(selectedSet) ||
    getSelectedItemsFromOtherItems({
      selectedFaceItem,
      selectedBodyItem,
      selectedExpressionItem,
    })

  const onClickSubmit = () => {
    if (step === 'keyword') {
      console.log(selectedKeywords.length)
      if (selectedKeywords.length !== 5) {
        console.log('발동 했니')

        setError('keyword', {
          type: 'keyword',
          message: 'keyword error',
        })
        return clearErrors()
      }
    }

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
            {((isTablet && step !== 'statGraph') || step === 'nickname') && (
              <CharacterBox
                baseImage={data?.itemsData?.baseImage}
                selectedItems={step === 'nickname' ? undefined : selectedItems}
              />
            )}

            <MakeMyManualFunnel
              Funnel={Funnel}
              step={step}
              register={register}
              formState={formState}
            />
          </div>
          <div className={cx('btn')}>
            <CommonBtn
              type="submit"
              style={
                formState.isSubmitting
                  ? ButtonStyle.DEACTIVE
                  : ButtonStyle.ACTIVE
              }
            >
              다음
            </CommonBtn>
          </div>
        </form>
      </FormBox>
    </div>
  )
}
