'use client'

import { useState } from 'react'

import classNames from 'classnames/bind'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'

import CommonBtn from '@/components/commonBtn/commonBtn'
import MyDescriptionCard from '@/components/descriptionCard/myDescriptionCard'
import OthersDescriptionCard from '@/components/descriptionCard/othersDescriptionCard'
import EditBtn from '@/components/editBtn/editBtn'
import { transformData } from '@/components/makeMyManual/makeMyManual.helpers'
import {
  IFormData,
  IManualBoxProps,
} from '@/components/manualBox/manualBox.types'
import ContentModalLayout from '@/components/modalLayout/contentModalLayout'
import ModalPortal from '@/components/modalPortal/modalPortal'

import { updateAnswers } from '@/api/axios/requestHandler/mypage/put.apis'

import { validationRules } from '@/helpers/validationRule.helpers'

import CloseButton from './closeButton'
import styles from './manualBox.module.scss'

const cx = classNames.bind(styles)

export default function ManualBox({
  myDatas,
  othersDatas,
  isOwner,
}: IManualBoxProps) {
  const router = useRouter()
  const otherAnswers = othersDatas.map((data) => {
    const { nickname, qas } = data
    const datas = qas.map((qa) => {
      const { id } = qa
      const { question, answer } = qa
      const dividedQ = question.split('---')
      const sentence = dividedQ[0] + answer + dividedQ[1]
      const res = { id, sentence }
      return res
    })
    return { nickname, datas }
  })

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { handleSubmit, register, formState } = useForm<IFormData>()
  const [descriptionType, setDescriptionType] = useState<string>('MY')

  const handleClickMyTypeBtn = () => {
    setDescriptionType('MY')
  }

  const handleClickOthersTypeBtn = () => {
    setDescriptionType('OTHERS')
  }

  const handleClickModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleClickModalClose = () => {
    setIsModalOpen(false)
  }

  const onClickSubmit: SubmitHandler<FieldValues> = async (inputData) => {
    console.log('클릭')
    console.log(inputData)
    const answers = transformData(inputData.answers)

    try {
      const response = await updateAnswers({
        answers,
        userType: 'jff',
        token: 'token',
      })

      return response
    } catch (error) {
      return error as Error
    } finally {
      setIsModalOpen(false)
      router.refresh()
    }
  }

  return (
    <>
      <div className={cx('manualBox')}>
        <div className={cx('typeBtns')}>
          <div
            className={cx(
              'typeBtn',
              descriptionType === 'MY'
                ? 'typeBtnSelected'
                : 'typeBtnUnselected',
            )}
            onClick={handleClickMyTypeBtn}
          >
            기본
          </div>
          <div
            className={cx(
              'typeBtn',
              descriptionType === 'OTHERS'
                ? 'typeBtnSelected'
                : 'typeBtnUnselected',
            )}
            onClick={handleClickOthersTypeBtn}
          >
            꿀팁
          </div>
        </div>
        <div className={cx('manual')}>
          <div className={cx('header')}>
            <p>자시니는 이렇게 사용해요</p>
            {descriptionType === 'MY' && isOwner && (
              <EditBtn onClick={handleClickModalOpen} />
            )}
          </div>
          <div className={cx('answers')}>
            {descriptionType === 'MY' ? (
              myDatas.map((data) => (
                <MyDescriptionCard
                  key={data.id}
                  question={data.question}
                  answer={data.answer}
                />
              ))
            ) : (
              <OthersDescriptionCard cardDatas={otherAnswers} />
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalPortal>
          <form onSubmit={handleSubmit(onClickSubmit)}>
            <ContentModalLayout
              title="자시니 다시 설명하기"
              closeBtn={
                <CloseButton onClickModalClose={handleClickModalClose} />
              }
              completeBtn={<CommonBtn type="submit">완료하기</CommonBtn>}
            >
              {myDatas.map((data) => {
                const dataId = data.id
                return (
                  <MyDescriptionCard
                    key={data.id}
                    question={data.question}
                    defaultValue={data.answer}
                    register={register(`answers.${data.id}`, validationRules)}
                    isInvalid={
                      formState && formState.isSubmitted
                        ? !!formState.errors.answers?.[dataId]
                        : undefined
                    }
                  />
                )
              })}
            </ContentModalLayout>
          </form>
        </ModalPortal>
      )}
    </>
  )
}
