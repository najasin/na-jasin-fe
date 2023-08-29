import React from 'react'

import classNames from 'classnames/bind'

import { ButtonStyle } from '@/components/shared/commonBtn/commonBtn.types'
import ItemBtn from '@/components/shared/itemBtn/itemBtn'

import { CATEGORIES } from './inventoryCategoryBtn.helpers'
import styles from './inventoryCategoryBtnList.module.scss'
import { InventoryCategoryBtnProps } from './inventoryCategoryBtnList.types'

const cx = classNames.bind(styles)
export function InventoryCategoryBtnList({
  selectedCategory,
  setSelectedCategory,
}: InventoryCategoryBtnProps) {
  return (
    <div className={cx('listWrap')}>
      {CATEGORIES.map((category) => (
        <ItemBtn
          type="button"
          key={category.id}
          onClick={() => {
            setSelectedCategory(category.id)
          }}
          style={
            selectedCategory === category.id
              ? ButtonStyle.ACTIVE
              : ButtonStyle.DEACTIVE
          }
        >
          {category.label}
        </ItemBtn>
      ))}
    </div>
  )
}
