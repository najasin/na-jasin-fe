'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'

import { useSearchParams } from 'next/navigation'

import MyDescriptionCard from '@/components/descriptionCard/myDescriptionCard'

import { fetchOthersManualById } from '@/api/axios/requestHandler/othersManual/getOthersManual.api'

import styles from './modalDescriptionCardList.module.scss'

const cx = classNames.bind(styles)

export default function ModalDescriptionCardList() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') as string

  const { data } = useQuery({
    queryKey: ['othersData'],
    queryFn: () => fetchOthersManualById(userId),
  })
  const myManualQAPair = data?.myManualQAPair

  return (
    <ul className={cx('descriptionCardList')}>
      {myManualQAPair &&
        myManualQAPair.map((maunalData) => (
          <li key={maunalData.id}>
            <MyDescriptionCard
              key={maunalData.id}
              question={maunalData.question}
              answer={maunalData.answer}
            />
          </li>
        ))}
    </ul>
  )
}
