'use client'

import { useEffect, useState } from 'react'

import classNames from 'classnames/bind'
import { useRecoilState, useResetRecoilState } from 'recoil'

import { useParams, useRouter } from 'next/navigation'

import {
  getSelectedItemsFromOtherItems,
  getSelectedItemsFromSet,
} from '@/components/makeMyManual/makeMyManual.helpers'
import CloseButton from '@/components/manualBox/closeButton'
import CharacterModalLayout from '@/components/modalLayout/characterModalLayout'
import CharacterBox from '@/components/shared/characterBox/characterBox'
import CommonBtn from '@/components/shared/commonBtn/commonBtn'
import EditBtn from '@/components/shared/editBtn/editBtn'
import FormBox from '@/components/shared/formBox/formBox'
import Inventory from '@/components/shared/inventory/inventory'
import ModalPortal from '@/components/shared/modalPortal/modalPortal'
import RadarChartContainer from '@/components/shared/radarChart/radarChartContainer'
import ResetBtn from '@/components/shared/resetBtn/resetBtn'

import { updateCharacter } from '@/api/axios/requestHandler/mypage/put.apis'

import {
  selectedBodyItemState,
  selectedExpressionItemState,
  selectedFaceItemState,
  selectedSetState,
} from '../../makeMyManual/store/makeMyManual.atom'
import CopyToast from '../copyToast/copyToast'
import styles from './profileBox.module.scss'
import { IProfileBoxProps } from './profileBox.types'

const cx = classNames.bind(styles)

export default function ProfileBox({
  nickname,
  data,
  myKeywordPercents,
  othersKeywordPercents,
  isOwner,
}: IProfileBoxProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isErrorToastOpen, setIsErrorToastOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [selectedFaceItem, setSelectedFaceItem] = useRecoilState(
    selectedFaceItemState,
  )
  const [selectedBodyItem, setSelectedBodyItem] = useRecoilState(
    selectedBodyItemState,
  )
  const [selectedExpressionItem, setSelectedExpressionItem] = useRecoilState(
    selectedExpressionItemState,
  )
  const [selectedSet, setSelectedSet] = useRecoilState(selectedSetState)

  const selectedItems =
    getSelectedItemsFromSet(selectedSet.layoutCase) ||
    getSelectedItemsFromOtherItems({
      selectedFaceItem: selectedFaceItem.layoutCase,
      selectedBodyItem: selectedBodyItem.layoutCase,
      selectedExpressionItem: selectedExpressionItem.layoutCase,
    })

  const resetFace = useResetRecoilState(selectedFaceItemState)
  const resetBody = useResetRecoilState(selectedBodyItemState)
  const resetExpression = useResetRecoilState(selectedExpressionItemState)
  const resetSet = useResetRecoilState(selectedSetState)

  const handleResetBtnClick = () => {
    resetFace()
    resetBody()
    resetExpression()
    resetSet()
  }

  const router = useRouter()

  const { userType } = useParams()

  const handleClickModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleClickModalClose = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = async () => {
    try {
      const response = await updateCharacter({
        face: selectedFaceItem.id,
        body: selectedBodyItem.id,
        expression: selectedExpressionItem.id,
        set: selectedSet.id,
        userType: userType as string,
      })
      setIsLoading(true)
      return response
    } catch (error) {
      setIsErrorToastOpen(true)
      setIsModalOpen(false)
      throw new Error('요청이 실패하였습니다.')
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
      setIsModalOpen(false)
      router.refresh()
    }
  }

  const { face, body, expression, set } = data.characterItems

  const characterItems = {
    face: face?.layoutCase,
    body: body?.layoutCase,
    expression: expression?.layoutCase,
    set: set?.layoutCase,
  }

  useEffect(() => {
    if (face) {
      setSelectedFaceItem({ id: face.id, layoutCase: face.layoutCase })
    }
    if (body) {
      setSelectedBodyItem({ id: body.id, layoutCase: body.layoutCase })
    }
    if (expression) {
      setSelectedExpressionItem({
        id: expression.id,
        layoutCase: expression.layoutCase,
      })
    }
    if (set) {
      setSelectedSet({ id: set.id, layoutCase: set.layoutCase })
    }
  }, [
    face,
    body,
    expression,
    set,
    setSelectedFaceItem,
    setSelectedBodyItem,
    setSelectedExpressionItem,
    setSelectedSet,
  ])

  const refinedMyKeywordPercents: { [key: string]: number } =
    myKeywordPercents.reduce<{ [key: string]: number }>(
      (result, { keyword, percent }) => {
        const newResult = { ...result }
        newResult[keyword] = percent
        return newResult
      },
      {},
    )

  const refinedOthersKeywordPercents: { [key: string]: number } =
    othersKeywordPercents.reduce<{ [key: string]: number }>(
      (result, { keyword, percent }) => {
        const newResult = { ...result }
        newResult[keyword] = percent
        return newResult
      },
      {},
    )

  return (
    <>
      <div className={cx('profileBox')}>
        <div className={cx('characterBox')}>
          <CharacterBox
            baseImage={data?.baseImage}
            selectedItems={characterItems}
            editBtn={isOwner && <EditBtn onClick={handleClickModalOpen} />}
            nickname={nickname}
          />
        </div>
        <div className={cx('chartBox')}>
          <RadarChartContainer
            radarType="MY"
            originKeywordPercents={refinedMyKeywordPercents}
            otherKeywordPercents={refinedOthersKeywordPercents}
            frameSize={340}
            radarSize={200}
            framePadding={140}
            hasOthers={true}
          />
        </div>
        {isLoading && <CopyToast />}
        {isErrorToastOpen && (
          <CopyToast type="error" onClose={() => setIsErrorToastOpen(false)} />
        )}
      </div>
      {isModalOpen && (
        <ModalPortal>
          <CharacterModalLayout
            title="자시니 다시 꾸미기"
            closeBtn={<CloseButton onClickModalClose={handleClickModalClose} />}
          >
            <div className={cx('formBox')}>
              <div className={cx('character')}>
                <CharacterBox
                  baseImage={data.baseImage}
                  selectedItems={selectedItems}
                  nickname={nickname}
                />
              </div>
              <div className={cx('formBoxWrapperResponsive')}>
                <FormBox title="나를 꾸며주세요" showBack={false}>
                  <div className={cx('wrapper')}>
                    <div className={cx('container')}>
                      <Inventory
                        resetBtn={<ResetBtn onClick={handleResetBtnClick} />}
                        isEdit={true}
                      />

                      <CommonBtn onClick={handleSubmit}>완료하기</CommonBtn>
                    </div>
                  </div>
                </FormBox>
              </div>
            </div>
          </CharacterModalLayout>
        </ModalPortal>
      )}
    </>
  )
}
