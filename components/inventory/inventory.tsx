'use client'

import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'

import CommonBtn from '@/components/commonBtn/commonBtn'
import FormBox from '@/components/formBox/formBox'
import ResetBtn from '@/components/resetBtn/resetBtn'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import CharacterBox from '../characterBox/characterBox'
import { fetchMyProfileRegisterData } from '../makeMyManual/makeMyManual.api'
import styles from './inventory.module.scss'
import { InventoryCategoryBtnList } from './inventoryCategoryBtnList/inventoryCategoryBtnList'
import { Category } from './inventoryCategoryBtnList/inventoryCategoryBtnList.types'
import { InventoryItemBoxList } from './inventoryItemBoxList/inventoryItemBoxList'

const cx = classNames.bind(styles)

export default function Inventory() {
  const { data } = useQuery({
    queryKey: ['myprofileRegister'],
    queryFn: fetchMyProfileRegisterData,
  })
  const [selectedCategory, setSelectedCategory] = useState<Category>('face')
  const selectedCategoryItems =
    data?.itemsData?.characterItems[selectedCategory] || []
  const isMobile: boolean = useBreakpoint({ query: '(max-width: 767px)' })
  console.log(data)
  return (
    <div>
      <FormBox title="나를 꾸며주세요" paddingTop={31}>
        {isMobile && (
          <CharacterBox
            baseImage={data?.itemsData?.baseImage}
            characterItems={{
              face: '',
              body: '',
              expression: '',
            }}
          />
        )}
        <div className={cx('wrap')}>
          <div className={cx('manuBar')}>
            <InventoryCategoryBtnList
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <div className={cx('resetBtn')}>
              <ResetBtn />
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
