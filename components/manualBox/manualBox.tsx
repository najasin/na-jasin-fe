import { useState } from 'react'

import classNames from 'classnames/bind'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import MyDescriptionCard from '@/components/descriptionCard/myDescriptionCard'
import OthersDescriptionCard from '@/components/descriptionCard/othersDescriptionCard'
import EditBtn from '@/components/editBtn/editBtn'
import { IManualBoxProps } from '@/components/manualBox/manualBox.types'

import { validationRules } from '@/helpers/validationRule.helpers'

import CommonBtn from '../commonBtn/commonBtn'
import ContentModalLayout from '../modalLayout/contentModalLayout'
import ModalPortal from '../modalPortal/modalPortal'
import CloseButton from './closeButton'
import styles from './manualBox.module.scss'

const cx = classNames.bind(styles)

export default function ManualBox({
  myDatas,
  othersDatas,
  type,
  onClickMyTypeBtn,
  onClickOthersTypeBtn,
}: IManualBoxProps) {
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
  const { handleSubmit, register } = useForm()

  const handleClickModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleClickModalClose = () => {
    setIsModalOpen(false)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // api 요청
    console.log(data.answers)
    // setIsModalOpen(false)
  }

  return (
    <>
      <div className={cx('manualBox')}>
        <div className={cx('typeBtns')}>
          <div
            className={cx(
              'typeBtn',
              type === 'MY' ? 'typeBtnSelected' : 'typeBtnUnselected',
            )}
            onClick={onClickMyTypeBtn}
          >
            기본
          </div>
          <div
            className={cx(
              'typeBtn',
              type === 'OTHERS' ? 'typeBtnSelected' : 'typeBtnUnselected',
            )}
            onClick={onClickOthersTypeBtn}
          >
            꿀팁
          </div>
        </div>
        <div className={cx('manual')}>
          <div className={cx('header')}>
            <p>자시니는 이렇게 사용해요</p>
            {type === 'MY' && <EditBtn onClick={handleClickModalOpen} />}
          </div>
          <div className={cx('answers')}>
            {type === 'MY' ? (
              myDatas.map((data) => (
                <MyDescriptionCard
                  key={data.id}
                  question={{ id: data.id, ...data.question }}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ContentModalLayout
              title="자시니 다시 설명하기"
              closeBtn={
                <CloseButton onClickModalClose={handleClickModalClose} />
              }
              completeBtn={<CommonBtn type="submit">완료하기</CommonBtn>}
            >
              {myDatas.map((data) => (
                <MyDescriptionCard
                  key={data.id}
                  question={{ id: data.id, ...data.question }}
                  defaultValue={data.answer}
                  register={register(
                    `answers.${data.id}.answer`,
                    validationRules,
                  )}
                />
              ))}
            </ContentModalLayout>
          </form>
        </ModalPortal>
      )}
    </>
  )
}
