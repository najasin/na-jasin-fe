import { useEffect, useState } from 'react'

import classNames from 'classnames/bind'
import { useRecoilState, useResetRecoilState } from 'recoil'

import { useRouter } from 'next/navigation'

import CharacterBox from '@/components/characterBox/characterBox'
import CommonBtn from '@/components/commonBtn/commonBtn'
import EditBtn from '@/components/editBtn/editBtn'
import FormBox from '@/components/formBox/formBox'
import Inventory from '@/components/inventory/inventory'
import {
  getSelectedItemsFromOtherItems,
  getSelectedItemsFromSet,
} from '@/components/makeMyManual/makeMyManual.helpers'
import CloseButton from '@/components/manualBox/closeButton'
import CharacterModalLayout from '@/components/modalLayout/characterModalLayout'
import ModalPortal from '@/components/modalPortal/modalPortal'
import RadarChartContainer from '@/components/radarChart/radarChartContainer'
import ResetBtn from '@/components/resetBtn/resetBtn'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

// import { updateCharacter } from '@/api/axios/requestHandler/mypage/put.apis'
import {
  selectedBodyItemState,
  selectedExpressionItemState,
  selectedFaceItemState,
  selectedSetState,
} from '../makeMyManual/store/makeMyManual.atom'
import styles from './profileBox.module.scss'
import { IProfileBoxProps } from './profileBox.types'

const cx = classNames.bind(styles)

export default function ProfileBox({
  nickname,
  data,
  myKeywordPercents,
  othersKeywordPercents,
}: IProfileBoxProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

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
    getSelectedItemsFromSet(selectedSet) ||
    getSelectedItemsFromOtherItems({
      selectedFaceItem,
      selectedBodyItem,
      selectedExpressionItem,
    })

  const isUnderTablet = useBreakpoint({ query: '(max-width: 1199px)' })

  const router = useRouter()

  const handleClickModalOpen = () => {
    setIsModalOpen(true)
    console.log('click')
  }

  const handleClickModalClose = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = () => {
    // updateCharacter()
    setIsModalOpen(false)
    router.refresh()
  }

  const { face, body, expression, set } = data.itemsData.selectedItems

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

  useEffect(() => {
    if (face) {
      setSelectedFaceItem(face)
    }
    if (body) {
      setSelectedBodyItem(body)
    }
    if (expression) {
      setSelectedExpressionItem(expression)
    }
    if (set) {
      setSelectedSet(set)
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

  return (
    <>
      <div className={cx('profileBox')}>
        <div className={cx('characterBox')}>
          <CharacterBox
            baseImage={data?.itemsData?.baseImage}
            selectedItems={data?.itemsData?.selectedItems}
            editBtn={<EditBtn onClick={handleClickModalOpen} />}
            nickname={nickname}
          />
        </div>
        <div className={cx('chartBox')}>
          <RadarChartContainer
            radarType="MY"
            originKeywordPercents={myKeywordPercents}
            otherKeywordPercents={othersKeywordPercents}
            frameSize={340}
            radarSize={200}
            framePadding={140}
            hasOthers={true}
          />
        </div>
      </div>
      {isModalOpen && (
        <ModalPortal>
          <CharacterModalLayout
            title="자시니 다시 꾸미기"
            closeBtn={<CloseButton onClickModalClose={handleClickModalClose} />}
            character={
              !isUnderTablet && (
                <CharacterBox
                  baseImage={data.itemsData.baseImage}
                  selectedItems={selectedItems}
                />
              )
            }
          >
            <div className={cx('formBox')}>
              <FormBox title="나를 꾸며주세요" showBack={false}>
                <div className={cx('wrapper')}>
                  <div className={cx('container')}>
                    {isUnderTablet && (
                      <div className={cx('character')}>
                        <CharacterBox
                          baseImage={data.itemsData.baseImage}
                          selectedItems={selectedItems}
                        />
                      </div>
                    )}


                    <Inventory
                      resetBtn={<ResetBtn onClick={handleResetBtnClick} />}
                      isEdit={true}
                    />

                    <CommonBtn onClick={handleSubmit}>완료하기</CommonBtn>
                  </div>
                </div>
              </FormBox>
            </div>
          </CharacterModalLayout>
        </ModalPortal>
      )}
    </>
  )
}
