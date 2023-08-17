'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'

import MyDescriptionCard from '@/components/descriptionCard/myDescriptionCard'

import { fetchOthersData } from '../makeOthersManual.api'
import styles from './modalDescriptionCardList.module.scss'

const cx = classNames.bind(styles)

export default function ModalDescriptionCardList() {
  const { data } = useQuery({
    queryKey: ['othersData2'],
    queryFn: fetchOthersData,
  })
  const myManualQAPair = data?.othersData2?.myManualQAPair

  return (
    <ul className={cx('descriptionCardList')}>
      {myManualQAPair.map((maunalData: { [key: string]: string }) => (
        <li key={maunalData.id}>
          <MyDescriptionCard
            key={maunalData.id}
            question={{ id: maunalData.id, question: maunalData.question }}
            answer={maunalData.answer}
          />
        </li>
      ))}
    </ul>
  )
}
