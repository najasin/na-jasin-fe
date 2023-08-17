'use client'

import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import { useFunnel } from '@/hooks/useFunnel'

import CircleBtn from '../circleBtn/circleBtn'
import CommonBtn from '../commonBtn/commonBtn'
import { ButtonStyle } from '../commonBtn/commonBtn.types'
import FormBox from '../formBox/formBox'
import ContentModalLayout2 from '../modalLayout/contentModalLayout2'
import SimpleLayout from '../simpleLayout/simpleLayout'
import { fetchOthersData } from './makeOthersManual.api'
import styles from './makeOthersManual.module.scss'
import MakeOthersManualFunnel from './makeOthersManualFunnel/makeOthersManualFunnel'
import ModalDescriptionCardList from './modalDescriptionCardList/modalDescriptionCardList'
import OthersCharacterBox from './othersCharacterBox/othersCharacterBox'

const cx = classNames.bind(styles)

export default function MakeOthersManual() {
  const router = useRouter()
  const { data, isLoading } = useQuery({
    queryKey: ['othersData2'],
    queryFn: fetchOthersData,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { handleSubmit, register, formState } = useForm()
  // const { handleSubmit, register, formState, setError, clearErrors } = useForm()

  const { Funnel, step, goPrev, goNext } = useFunnel(
    ['manual', 'statGraph'],
    'manual',
  )

  const onClickSubmit = () => {
    goNext()
  }

  const isTablet: boolean = useBreakpoint({ query: '(max-width: 1199px)' })
  const isMobile: boolean = useBreakpoint({ query: '(max-width: 768px)' })

  const nickname = data?.othersData2?.nickname

  const handleClickTrybtn = () => {
    router.push('/')
  }

  const handleClickGhostbtn = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      {!isLoading && (
        <SimpleLayout
          title={`${nickname} 사용설명서 만들기`}
          margin={!isMobile ? 32 : 10}
        >
          <div className={cx('layout')}>
            {!isTablet && (
              <OthersCharacterBox onClickGhostBtn={handleClickGhostbtn} />
            )}

            <FormBox
              title="나를 꾸며주세요"
              paddingTop={32}
              onBackClick={goPrev}
            >
              <form onSubmit={handleSubmit(onClickSubmit)}>
                <div className={cx('formContent')}>
                  {isTablet && step === 'manual' && (
                    <OthersCharacterBox onClickGhostBtn={handleClickGhostbtn} />
                  )}
                  <MakeOthersManualFunnel
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
                      formState.errors.manual
                        ? ButtonStyle.DEACTIVE
                        : ButtonStyle.ACTIVE
                    }
                  >
                    다음
                  </CommonBtn>
                  <span className={cx('tryBtn')}>
                    <CircleBtn onClick={handleClickTrybtn}>
                      나도 해보기
                    </CircleBtn>
                  </span>
                </div>
              </form>
            </FormBox>
          </div>
        </SimpleLayout>
      )}
      {isModalOpen && (
        <>
          <ContentModalLayout2
            title={`${nickname}(이)는 이렇게 사용해요`}
            content={<ModalDescriptionCardList />}
            closeBtn={
              <button
                onClick={() => {
                  setIsModalOpen(false)
                }}
              >
                X
              </button>
            }
            completeBtn={<CommonBtn>확인했어요</CommonBtn>}
          />
        </>
      )}
    </>
  )
}
