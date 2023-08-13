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
  const [selectedFaceItem, setSelectedFaceItem] = useState('')
  const [selectedBodyItem, setSelectedBodyItem] = useState('')
  const [selectedExpressionItem, setSelectedExpressionItem] = useState('')
  const [selectedSet, setSelectedSet] = useState('')

  const selectedCategoryItems =
    data?.itemsData?.characterItems[selectedCategory] || []
  const isMobile: boolean = useBreakpoint({ query: '(max-width: 767px)' })

  const handleItemSelectClick = (img: string) => {
    switch (selectedCategory) {
      case 'face':
        setSelectedFaceItem(img)
        setSelectedSet('')
        break
      case 'body':
        setSelectedBodyItem(img)
        setSelectedSet('')
        break
      case 'expression':
        setSelectedExpressionItem(img)
        setSelectedSet('')
        break
      case 'set':
        setSelectedSet(img)
        setSelectedFaceItem('')
        setSelectedBodyItem('')
        setSelectedExpressionItem('')
        break
      default:
        break
    }
  }

  const characterItems = selectedSet
    ? { set: selectedSet }
    : {
        face: selectedFaceItem,
        body: selectedBodyItem,
        expression: selectedExpressionItem,
      }

  const handleResetBtnClick = () => {
    setSelectedFaceItem('')
    setSelectedBodyItem('')
    setSelectedExpressionItem('')
    setSelectedSet('')
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
          <InventoryItemBoxList
            selectedCategoryItems={selectedCategoryItems}
            onSelectedItem={handleItemSelectClick}
          />
          <div className={cx('btn')}>
            <CommonBtn>다음</CommonBtn>
          </div>
        </div>
      </FormBox>
    </div>
  )
}
