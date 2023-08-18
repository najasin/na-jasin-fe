'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { useRecoilState } from 'recoil'

import { fetchMyProfileRegisterData } from '@/components/makeMyManual/makeMyManual.api'
import { selectedCategoryState } from '@/components/makeMyManual/store/makeMyManual.atom'

import getInventory from '@/api/axios/requestHandler/inventory/inventory.api'

import styles from './inventory.module.scss'
import { InventoryCategoryBtnList } from './inventoryCategoryBtnList/inventoryCategoryBtnList'
import { InventoryItemBoxList } from './inventoryItemBoxList/inventoryItemBoxList'

const cx = classNames.bind(styles)

export default function Inventory({
  isEdit = false,
  resetBtn,
}: {
  isEdit?: boolean
  resetBtn: React.ReactNode
}) {
  const querySetting = !isEdit
    ? {
        queryKey: ['myprofileRegister'],
        queryFn: fetchMyProfileRegisterData,
        refetchOnWindowFocus: true,
      }
    : {
        queryKey: ['inventory'],
        queryFn: () => getInventory('jff'),
        refetchOnWindowFocus: true,
      }

  const { data } = useQuery(querySetting)
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState,
  )

  const selectedCategoryItems = data?.characterItems[selectedCategory] || []

  return (
    <div className={cx('wrap')}>
      <div className={cx('resetBtn')}>{resetBtn}</div>
      <InventoryCategoryBtnList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <InventoryItemBoxList selectedCategoryItems={selectedCategoryItems} />
    </div>
  )
}
