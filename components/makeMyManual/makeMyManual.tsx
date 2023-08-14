'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import CharacterBox from '@/components/characterBox/characterBox'
import Inventory from '@/components/inventory/inventory'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import FormBox from '../formBox/formBox'
import ResetBtn from '../resetBtn/resetBtn'
import { fetchMyProfileRegisterData } from './makeMyManual.api'
import {
  selectedBodyItemState,
  selectedExpressionItemState,
  selectedFaceItemState,
  selectedSetState,
} from './makeMyManual.atom'
import styles from './makeMyManual.module.scss'

const cx = classNames.bind(styles)

export default function MakeMyManual() {
  const { data } = useQuery({
    queryKey: ['myprofileRegister'],
    queryFn: fetchMyProfileRegisterData,
  })

  const selectedFaceItem = useRecoilValue(selectedFaceItemState)
  const selectedBodyItem = useRecoilValue(selectedBodyItemState)
  const selectedExpressionItem = useRecoilValue(selectedExpressionItemState)
  const selectedSet = useRecoilValue(selectedSetState)

  const isTablet: boolean = useBreakpoint({ query: '(max-width: 1199px)' })

  const selectedItems = selectedSet
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
    <div className={cx('layout')}>
      {!isTablet && (
        <CharacterBox
          baseImage={data?.itemsData?.baseImage}
          selectedItems={selectedItems}
        />
      )}
      <FormBox title="나를 꾸며주세요" paddingTop={31}>
        <div className={cx('formContent')}>
          {isTablet && (
            <CharacterBox
              baseImage={data?.itemsData?.baseImage}
              selectedItems={selectedItems}
            />
          )}

          <Inventory resetBtn={<ResetBtn onClick={handleResetBtnClick} />} />
        </div>
      </FormBox>
    </div>
  )
}
