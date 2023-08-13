'use client'

import { ReactNode } from 'react'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { useRecoilState, useResetRecoilState } from 'recoil'

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

import styles from './inventory.module.scss'
import { InventoryCategoryBtnList } from './inventoryCategoryBtnList/inventoryCategoryBtnList'
import { InventoryItemBoxList } from './inventoryItemBoxList/inventoryItemBoxList'

const cx = classNames.bind(styles)
type InventoryProps = {
  characterBox?: ReactNode // ReactNode 타입을 직접 사용합니다.
}
export default function Inventory({
  characterBox,
}: InventoryProps): React.ReactElement {
  const { data } = useQuery({
    queryKey: ['myprofileRegister'],
    queryFn: fetchMyProfileRegisterData,
  })
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState,
  )

  const selectedCategoryItems =
    data?.itemsData?.characterItems[selectedCategory] || []

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
      <FormBox title="나를 꾸며주세요" paddingTop={31}>
        <div className={cx('wrap')}>
          <div>
            {characterBox}
            <div className={cx('manuBar')}>
              <InventoryCategoryBtnList
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
              <div className={cx('resetBtn')}>
                <ResetBtn onClick={handleResetBtnClick} />
              </div>
            </div>
            <InventoryItemBoxList
              selectedCategoryItems={selectedCategoryItems}
            />
          </div>
          <div className={cx('btn')}>
            <CommonBtn>다음</CommonBtn>
          </div>
        </div>
      </FormBox>
    </div>
  )
}
