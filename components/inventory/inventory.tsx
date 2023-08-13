'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import CharacterBox from '@/components/characterBox/characterBox'
import CommonBtn from '@/components/commonBtn/commonBtn'
import FormBox from '@/components/formBox/formBox'
import { fetchMyProfileRegisterData } from '@/components/makeMyManual/makeMyManual.api'
import {
  selectedBodyItemState,
  selectedCategoryState,
  selectedExpressionItemState,
  selectedFaceItemState,
  selectedSetState,
} from '@/components/makeMyManual/makeMyManual.atom'
import ResetBtn from '@/components/resetBtn/resetBtn'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import styles from './inventory.module.scss'
import { InventoryCategoryBtnList } from './inventoryCategoryBtnList/inventoryCategoryBtnList'
import { InventoryItemBoxList } from './inventoryItemBoxList/inventoryItemBoxList'

const cx = classNames.bind(styles)

export default function Inventory() {
  const { data } = useQuery({
    queryKey: ['myprofileRegister'],
    queryFn: fetchMyProfileRegisterData,
  })
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState,
  )
  const selectedFaceItem = useRecoilValue(selectedFaceItemState)
  const selectedBodyItem = useRecoilValue(selectedBodyItemState)
  const selectedExpressionItem = useRecoilValue(selectedExpressionItemState)
  const selectedSet = useRecoilValue(selectedSetState)

  const selectedCategoryItems =
    data?.itemsData?.characterItems[selectedCategory] || []
  const isMobile: boolean = useBreakpoint({ query: '(max-width: 767px)' })

  const characterItems = selectedSet
    ? { set: selectedSet }
    : {
        face: selectedFaceItem,
        body: selectedBodyItem,
        expression: selectedExpressionItem,
      }

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
  return (
    <div>
      {!isMobile && (
        <CharacterBox
          baseImage={data?.itemsData?.baseImage}
          characterItems={characterItems}
        />
      )}
      <FormBox title="나를 꾸며주세요" paddingTop={31}>
        <div className={cx('wrap')}>
          {isMobile && (
            <CharacterBox
              baseImage={data?.itemsData?.baseImage}
              characterItems={characterItems}
            />
          )}
          <div className={cx('manuBar')}>
            <InventoryCategoryBtnList
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <div className={cx('resetBtn')}>
              <ResetBtn onClick={handleResetBtnClick} />
            </div>
          </div>
          <InventoryItemBoxList selectedCategoryItems={selectedCategoryItems} />
          <div className={cx('btn')}>
            <CommonBtn>다음</CommonBtn>
          </div>
        </div>
      </FormBox>
    </div>
  )
}
