'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { useRecoilState } from 'recoil'

import CommonBtn from '@/components/commonBtn/commonBtn'
import { fetchMyProfileRegisterData } from '@/components/makeMyManual/makeMyManual.api'
import { selectedCategoryState } from '@/components/makeMyManual/makeMyManual.atom'

import styles from './inventory.module.scss'
import { InventoryCategoryBtnList } from './inventoryCategoryBtnList/inventoryCategoryBtnList'
import { InventoryItemBoxList } from './inventoryItemBoxList/inventoryItemBoxList'

const cx = classNames.bind(styles)

export default function Inventory({ resetBtn }: { resetBtn: React.ReactNode }) {
  const { data } = useQuery({
    queryKey: ['myprofileRegister'],
    queryFn: fetchMyProfileRegisterData,
  })
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState,
  )

  const selectedCategoryItems =
    data?.itemsData?.characterItems[selectedCategory] || []

  return (
    <div className={cx('wrap')}>
      <div className={cx('content')}>
        <div className={cx('resetBtn')}>{resetBtn}</div>
        <InventoryCategoryBtnList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <InventoryItemBoxList selectedCategoryItems={selectedCategoryItems} />
      </div>
      <div className={cx('btn')}>
        <CommonBtn>다음</CommonBtn>
      </div>
    </div>
  )
}
