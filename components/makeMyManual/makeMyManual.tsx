'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { useRecoilValue } from 'recoil'

import CharacterBox from '@/components/characterBox/characterBox'
import Inventory from '@/components/inventory/inventory'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import FormBox from '../formBox/formBox'
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

  return (
    <div className={cx('layout')}>
      {!isTablet && (
        <div className={cx('character')}>
          <CharacterBox
            baseImage={data?.itemsData?.baseImage}
            selectedItems={selectedItems}
          />
        </div>
      )}
      <FormBox title="나를 꾸며주세요" paddingTop={31}>
        <Inventory
          characterBox={
            isTablet && (
              <CharacterBox
                baseImage={data?.itemsData?.baseImage}
                selectedItems={selectedItems}
              />
            )
          }
        />
      </FormBox>
    </div>
  )
}
