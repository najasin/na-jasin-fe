'use client'

import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import { useFunnel } from '@/hooks/useFunnel'

import { fetchOthersManual } from '@/api/axios/requestHandler/othersManual/getOthersManual.api'
import {
  Answer,
  FormData,
  postOthersManual,
} from '@/api/axios/requestHandler/othersManual/postOthersManual.api'

import CircleBtn from '../circleBtn/circleBtn'
import CommonBtn from '../commonBtn/commonBtn'
import { ButtonStyle } from '../commonBtn/commonBtn.types'
import FormBox from '../formBox/formBox'
import { IQuestions } from '../makeMyManual/makeMyManual.types'
import CloseButton from '../manualBox/closeButton'
import ContentModalLayout2 from '../modalLayout/contentModalLayout2'
import ProgressBar from '../progressBar/progressBar'
import SimpleLayout from '../simpleLayout/simpleLayout'
import styles from './makeOthersManual.module.scss'
import { IFormInputs } from './makeOthersManual.type'
import MakeOthersManualFunnel from './makeOthersManualFunnel/makeOthersManualFunnel'
import ModalDescriptionCardList from './modalDescriptionCardList/modalDescriptionCardList'
import OthersCharacterBox from './othersCharacterBox/othersCharacterBox'
import { statsGraphValueState } from './store/makeOthersManual.atom'

const cx = classNames.bind(styles)

export default function MakeOthersManual() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') as string

  const router = useRouter()
  const { data, isLoading } = useQuery({
    queryKey: ['othersData'],
    queryFn: fetchOthersManual,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const statsGraphValue = useRecoilValue(statsGraphValueState)

  const { handleSubmit, register, formState, watch } = useForm<IFormInputs>()

  const { Funnel, step, goPrev, goNext } = useFunnel(
    ['manual', 'statGraph'],
    'manual',
  )

  const pathname = usePathname()
  const isTablet: boolean = useBreakpoint({ query: '(max-width: 1199px)' })
  const isMobile: boolean = useBreakpoint({ query: '(max-width: 768px)' })
  const nickname = data?.nickname as string
  const questions = data?.questions
  const watchedInputs = questions?.map((question, index) =>
    watch(`answer${index + 1}`),
  )
  const nicknameValue = watch('nickname')
  const manualFieldsFilled =
    watchedInputs?.every((value) => value) && !!nicknameValue

  const onClickSubmit: SubmitHandler<FieldValues> = async (inputData) => {
    const formattedAnswers = questions?.map((question: IQuestions, index) => ({
      id: question.id,
      answer: inputData[`answer${index + 1}`],
    }))

    const totalFormData: FormData = {
      data: {
        nickname: inputData.nickname,
        answers: formattedAnswers as Answer[],
        otherKeywordPercents: statsGraphValue,
      },
      userType: 'JFF',
      userId,
    }

    if (step === 'statGraph') {
      postOthersManual(totalFormData)
    }
    goNext()
  }

  const handleClickTrybtn = () => {
    router.push('/')
  }

  const handleModalState = () => {
    setIsModalOpen(!isModalOpen)
  }

  const setTitle = (): string => {
    if (step === 'manual') return `${nickname}의 사용설명서`
    return `${nickname}의 능력치`
  }

  const setStep = (): string => {
    if (step === 'manual') return '1'
    return '2'
  }

  useEffect(() => {
    router.push(`${pathname}?userId=1`)
  }, [router, pathname])

  return (
    <>
      {!isLoading && (
        <SimpleLayout
          title={`${nickname}의 사용설명서 만들기`}
          margin={!isMobile ? 32 : 10}
        >
          <div className={cx('layout')}>
            {!isTablet && (
              <OthersCharacterBox onClickGhostBtn={handleModalState} />
            )}
            <div className={cx('formBoxWrapper')}>
              <ProgressBar currentStep={setStep()} totalSteps={['1', '2']} />
              <FormBox title={setTitle()} paddingTop={32} onBackClick={goPrev}>
                <form onSubmit={handleSubmit(onClickSubmit)}>
                  <div className={cx('formContent')}>
                    {isTablet && step === 'manual' && (
                      <OthersCharacterBox onClickGhostBtn={handleModalState} />
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
                        !manualFieldsFilled
                          ? ButtonStyle.DEACTIVE
                          : ButtonStyle.ACTIVE
                      }
                      confetti={
                        step === 'statGraph' && formState.isSubmitSuccessful
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
          </div>
        </SimpleLayout>
      )}
      {isModalOpen && (
        <>
          <ContentModalLayout2
            title={`${nickname}(이)는 이렇게 사용해요`}
            content={<ModalDescriptionCardList />}
            closeBtn={<CloseButton onClickModalClose={handleModalState} />}
            completeBtn={
              <CommonBtn onClick={handleModalState}>확인했어요</CommonBtn>
            }
          />
        </>
      )}
    </>
  )
}
