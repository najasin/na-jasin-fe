'use client'

import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import classNames from 'classnames/bind'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import { useRouter } from 'next/navigation'

import CharacterBox from '@/components/characterBox/characterBox'
import CommonBtn from '@/components/commonBtn/commonBtn'
import FormBox from '@/components/formBox/formBox'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import { useFunnel } from '@/hooks/useFunnel'

import { logout } from '@/api/axios/requestHandler/auth/post.apis'
import { getMyManualRegister } from '@/api/axios/requestHandler/myManual/getMyManualRegister.api'
import { postMyManual } from '@/api/axios/requestHandler/myManual/postMyManual.api'

import { ButtonStyle } from '../commonBtn/commonBtn.types'
import CopyToast from '../copyToast/copyToast'
import ImageLoader from '../loadingImg/imageLoader'
import ProgressBar from '../progressBar/progressBar'
import {
  getSelectedItemsFromOtherItems,
  getSelectedItemsFromSet,
  transformData,
} from './makeMyManual.helpers'
import styles from './makeMyManual.module.scss'
import { IFormInputs } from './makeMyManual.types'
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
  const { data, isLoading } = useQuery({
    queryKey: ['myprofileRegister'],
    queryFn: () => getMyManualRegister(),
    refetchOnWindowFocus: true,
  })

  const { watch, handleSubmit, register, formState, setError, clearErrors } =
    useForm<IFormInputs>()

  const { Funnel, step, goPrev, goNext } = useFunnel(
    ['nickname', 'character', 'manual', 'keyword', 'statGraph'],
    'nickname',
  )
  const [postSuccess, setPostSuccess] = useState(false)
  const [openToast, setOpenToast] = useState('')

  const router = useRouter()

  const selectedFaceItem = useRecoilValue(selectedFaceItemState)
  const selectedBodyItem = useRecoilValue(selectedBodyItemState)
  const selectedExpressionItem = useRecoilValue(selectedExpressionItemState)
  const selectedSet = useRecoilValue(selectedSetState)
  const selectedKeywords = useRecoilValue(selectedKeywordsState)
  const statsGraphValue = useRecoilValue(statsGraphValueState)
  const isTablet: boolean = useBreakpoint({ query: '(max-width: 1199px)' })

  const selectedItems =
    getSelectedItemsFromSet(selectedSet.layoutCase) ||
    getSelectedItemsFromOtherItems({
      selectedFaceItem: selectedFaceItem.layoutCase,
      selectedBodyItem: selectedBodyItem.layoutCase,
      selectedExpressionItem: selectedExpressionItem.layoutCase,
    })
  const handleToastClose = () => {
    setOpenToast('')
  }

  const onClickSubmit: SubmitHandler<FieldValues> = async (inputData) => {
    if (step === 'keyword') {
      if (selectedKeywords.length !== 5) {
        setError('keyword', {
          type: 'error',
          message: 'keyword error',
        })
        return clearErrors(['keyword'])
      }
    }

    if (step === 'statGraph') {
      if (!data?.baseImage) throw new Error()
      const answers = transformData(inputData.answers)
      const keywordPercents = selectedKeywords.map((keywordObj) => ({
        id: keywordObj.id,
        percent: statsGraphValue[keywordObj.keyword] || 0,
      }))
      try {
        const response = await postMyManual({
          userType: 'jff',
          nickname: inputData.nickname,
          baseImage: data.baseImage,
          selectedFaceItem: selectedFaceItem.id,
          selectedBodyItem: selectedBodyItem.id,
          selectedExpressionItem: selectedExpressionItem.id,
          selectedSet: selectedSet.id,
          answers,
          keywordPercents,
        })
        setPostSuccess(true)
        setOpenToast('생성에 성공했습니다.')
        setCookie('utp', 'JFF')
        router.push(`/${response.userType}/my-page?userId=${response.userId}`)

        return response
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (
            error?.response?.data?.message ===
            'my manual 생성에 실패하였습니다.'
          ) {
            setOpenToast('이미 설명서를 생성했습니다. 마이페이지로 이동합니다.')

            const uid = getCookie('uid')
            setCookie('utp', 'JFF')
            router.push(`/jff/my-page?userId=${uid}`)
          } else {
            setOpenToast('다시 로그인하세요.')

            const res = await logout()

            if (res === null) {
              if (getCookie('act')) deleteCookie('act')
              if (getCookie('rft')) deleteCookie('rft')
              if (getCookie('uid')) deleteCookie('uid')
              if (getCookie('utp')) deleteCookie('utp')
            }
            router.push('/')

            return error as Error
          }
        }
      }
    }
    goNext()
  }
  const setTitle = (): string => {
    if (step === 'nickname') return '닉네임을 입력해 주세요'
    if (step === 'character') return '나를 꾸며주세요'
    if (step === 'manual') return '나 사용 설명서를 작성해보세요'
    if (step === 'keyword') return '나를 표현할 키워드 5가지를 선택해 보세요'

    return '내 능력치를 설정해주세요'
  }

  return (
    <>
      {(isLoading || postSuccess) && <ImageLoader />}

      <div className={cx('layout')}>
        {!isTablet && step !== 'nickname' && (
          <CharacterBox
            baseImage={data?.baseImage}
            selectedItems={selectedItems}
            nickname={watch('nickname')}
          />
        )}
        <div className={cx('content')}>
          <ProgressBar
            currentStep={step}
            totalSteps={[
              'nickname',
              'character',
              'manual',
              'keyword',
              'statGraph',
            ]}
          />
          <FormBox title={setTitle()} paddingTop={32} onBackClick={goPrev}>
            <form onSubmit={handleSubmit(onClickSubmit)} className={cx('wrap')}>
              <div className={cx('formContent')}>
                {((isTablet && step !== 'statGraph') ||
                  step === 'nickname') && (
                  <CharacterBox
                    baseImage={data?.baseImage}
                    selectedItems={
                      step === 'nickname' ? undefined : selectedItems
                    }
                    nickname={
                      step !== 'nickname' ? watch('nickname') : undefined
                    }
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
                    formState.errors.answers ||
                    formState.errors.keyword ||
                    formState.errors.statGraph
                      ? ButtonStyle.DEACTIVE
                      : ButtonStyle.ACTIVE
                  }
                  confetti={step === 'statGraph' && postSuccess}
                >
                  {step === 'statGraph' ? '완료' : '다음'}
                </CommonBtn>
              </div>
            </form>
          </FormBox>
        </div>
      </div>
      {openToast && (
        <CopyToast
          type={postSuccess ? 'success' : 'error'}
          subtitle={openToast}
          onClose={handleToastClose}
        />
      )}
    </>
  )
}
