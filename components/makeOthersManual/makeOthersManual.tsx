'use client'

import { useState } from 'react'

import NotFound from '@/app/not-found'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import { useFunnelwithNoQuery } from '@/hooks/useFunnelwithNoQuery'

import { fetchOthersManualById } from '@/api/axios/requestHandler/othersManual/getOthersManual.api'
import {
  Answer,
  FormData,
  IKeyword,
  postOthersManual,
} from '@/api/axios/requestHandler/othersManual/postOthersManual.api'

import CircleBtn from '../circleBtn/circleBtn'
import CommonBtn from '../commonBtn/commonBtn'
import { ButtonStyle } from '../commonBtn/commonBtn.types'
import CopyToast from '../copyToast/copyToast'
import FormBox from '../formBox/formBox'
import ImageLoader from '../loadingImg/imageLoader'
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
import { statsGraphValueState2 } from './store/makeOthersManual.atom'

const cx = classNames.bind(styles)

export default function MakeOthersManual() {
  const [postSuccess, setPostSuccess] = useState(false)
  const [openToast, setOpenToast] = useState(false)
  // const [isSubmitting, setIsSubmitting] = useState(false)

  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') as string
  const { userType } = useParams() as { userType: string }

  const router = useRouter()
  const { data, isLoading, error } = useQuery({
    queryKey: ['othersData'],
    queryFn: () => fetchOthersManualById(userType, userId),
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const statsGraphValue = useRecoilValue(statsGraphValueState2)

  const { handleSubmit, register, formState, watch } = useForm<IFormInputs>()

  const { Funnel, step, goPrev, goNext } = useFunnelwithNoQuery(
    ['manual', 'statGraph'],
    'manual',
  )

  // const userType = pathname.includes('jff') ? 'jff' : 'df'
  const isTablet = useBreakpoint({ query: '(max-width: 1199px)' })
  const isMobile = useBreakpoint({ query: '(max-width: 768px)' })
  const nickname = data?.nickname as string
  const questions = data?.questions
  const originKeywordPercents = data?.originKeywordPercents as IKeyword[]
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

    const statsGraphValueForPost = originKeywordPercents.map((item) => ({
      id: item.id,
      percent: statsGraphValue[item.keyword],
    }))

    const totalFormData: FormData = {
      data: {
        nickname: inputData.nickname,
        answers: formattedAnswers as Answer[],
        otherKeywordPercents: statsGraphValueForPost,
      },
      userType: 'JFF',
      userId,
    }

    if (step === 'statGraph') {
      // if (isSubmitting) {
      //   return
      // }
      // setIsSubmitting(true)
      try {
        await postOthersManual(totalFormData)
        setPostSuccess(true)
        router.push(`/${userType}/my-page?userId=${userId}`)
      } catch (err) {
        setOpenToast(true)
        router.refresh()
      }
      // } finally {
      //   setIsSubmitting(false)
      // }
    }
    goNext()
  }

  const handleClickTrybtn = () => {
    router.push('/')
  }

  const handleModalState = () => {
    setIsModalOpen(!isModalOpen)
  }

  const setTitle = () => {
    if (step === 'manual') return `${nickname}의 사용설명서`
    return `${nickname}의 능력치`
  }

  const setStep = () => {
    if (step === 'manual') return '1'
    return '2'
  }

  const getButtonText = () => {
    if (step === 'statGraph') return '완료'
    return '다음'
  }

  const handleToastClose = () => {
    setOpenToast(false)
  }

  if (error) return <NotFound />

  return (
    <>
      {(isLoading || postSuccess) && <ImageLoader />}
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
                    confetti={step === 'statGraph' && postSuccess}
                    isLoading={!!postSuccess}
                  >
                    {getButtonText()}
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
      <CopyToast type="success" onClose={handleToastClose} />
      {openToast && <CopyToast type="error" onClose={handleToastClose} />}
    </>
  )
}
