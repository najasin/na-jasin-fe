'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import CharacterBox from '@/components/characterBox/characterBox'
import CommonBtn from '@/components/commonBtn/commonBtn'
import FormBox from '@/components/formBox/formBox'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import { useFunnel } from '@/hooks/useFunnel'

import { postMyManual } from '@/api/axios/requestHandler/myManual/postMyManual.api'

import { ButtonStyle } from '../commonBtn/commonBtn.types'
import { fetchMyProfileRegisterData } from './makeMyManual.api'
import {
  getSelectedItemsFromOtherItems,
  getSelectedItemsFromSet,
  transformData,
} from './makeMyManual.helpers'
import styles from './makeMyManual.module.scss'
import MakeMyManualFunnel from './makeMyManualFunnel/makeMyManualFunnel'
import {
  selectedBodyItemState,
  selectedExpressionItemState,
  selectedFaceItemState,
  selectedKeywordsState,
  selectedSetState,
  statsGraphValueState,
} from './store/makeMyManual.atom'

const cx = classNames.bind(styles)

export default function MakeMyManual() {
  const { data } = useQuery({
    queryKey: ['myprofileRegister'],
    queryFn: fetchMyProfileRegisterData,
    refetchOnWindowFocus: true,
  })

  const { watch, handleSubmit, register, formState, setError, clearErrors } =
    useForm()

  const { Funnel, step, goPrev, goNext } = useFunnel(
    ['nickname', 'character', 'manual', 'keyword', 'statGraph'],
    'nickname',
  )

  const selectedFaceItem = useRecoilValue(selectedFaceItemState)
  const selectedBodyItem = useRecoilValue(selectedBodyItemState)
  const selectedExpressionItem = useRecoilValue(selectedExpressionItemState)
  const selectedSet = useRecoilValue(selectedSetState)
  const selectedKeywords = useRecoilValue(selectedKeywordsState)
  const statsGraphValue = useRecoilValue(statsGraphValueState)
  const isTablet: boolean = useBreakpoint({ query: '(max-width: 1199px)' })

  const selectedItems =
    getSelectedItemsFromSet(selectedSet) ||
    getSelectedItemsFromOtherItems({
      selectedFaceItem,
      selectedBodyItem,
      selectedExpressionItem,
    })

  const onClickSubmit: SubmitHandler<FieldValues> = async (inputData) => {
    console.log(typeof data)
    if (step === 'keyword') {
      if (selectedKeywords.length !== 5) {
        setError('keyword', {
          type: 'keyword',
          message: 'keyword error',
        })
        return clearErrors()
      }
    }

    if (step === 'statGraph') {
      const answers = transformData(inputData.answers)
      console.log(answers)
      try {
        const response = await postMyManual({
          userType: 'jff',
          nickname: data.nickname,
          selectedFaceItem,
          selectedBodyItem,
          selectedExpressionItem,
          selectedSet,
          answers,
          statsGraphValue,
        })

        return response
      } catch (error) {
        console.error('An error occurred:', error)

        return error as Error
      }
    }
    goNext()
  }
  const setTitle = (): string => {
    if (step === 'nickname') return '닉네임을 입력해 주세요'
    if (step === 'character') return '나를 꾸며주세요'
    if (step === 'character') {
      return '나를 표현할 키워드 5가지를 선택해 보세요'
    }
    return '내 능력치를 설정해주세요'
  }

  return (
    <div className={cx('layout')}>
      {!isTablet && step !== 'nickname' && (
        <CharacterBox
          baseImage={data?.baseImage}
          selectedItems={selectedItems}
          nickname={watch('nickname')}
        />
      )}

      <FormBox title={setTitle()} paddingTop={32} onBackClick={goPrev}>
        <form onSubmit={handleSubmit(onClickSubmit)}>
          <div className={cx('formContent')}>
            {((isTablet && step !== 'statGraph') || step === 'nickname') && (
              <CharacterBox
                baseImage={data?.baseImage}
                selectedItems={step === 'nickname' ? undefined : selectedItems}
                nickname={step !== 'nickname' && watch('nickname')}
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
                formState.errors.nickname ||
                formState.errors.character ||
                formState.errors.manual ||
                formState.errors.keyword ||
                formState.errors.statGraph
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
