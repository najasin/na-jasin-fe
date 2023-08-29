import React from 'react'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'

import { getMyManualRegister } from '@/api/axios/requestHandler/myManual/getMyManualRegister.api'

import { IKeywordWithId } from '../makeMyManual/makeMyManual.types'
import { ButtonStyle } from '../shared/commonBtn/commonBtn.types'
import KeywordBtn from '../shared/keywordBtn/keywordBtn'
import styles from './keywordBtnList.module.scss'
import { IKeywordBtnListProps } from './keywordBtnList.types'

const cx = classNames.bind(styles)
export default function KeywordBtnList({
  selectedKeywords,
  setSelectedKeywords,
}: IKeywordBtnListProps) {
  const { data } = useQuery({
    queryKey: ['myprofileRegister'],
    queryFn: () => getMyManualRegister(),
    refetchOnWindowFocus: true,
  })

  const handleClick = (item: IKeywordWithId) => {
    setSelectedKeywords((prevSelected) =>
      prevSelected.some(
        (selectedKeyword) => selectedKeyword.keyword === item.keyword,
      )
        ? prevSelected.filter(
            (selectedKeyword) => selectedKeyword.keyword !== item.keyword,
          )
        : [...prevSelected, item],
    )
  }
  return (
    <div className={cx('wrap')}>
      {data?.exampleKeywords &&
        data.exampleKeywords.map((item: IKeywordWithId) => {
          const { keyword } = item

          const isActive = selectedKeywords.some(
            (selectedKeyword) => selectedKeyword.id === item.id,
          )

          const btnStyle = isActive ? ButtonStyle.ACTIVE : undefined

          return (
            <div key={item.id}>
              <KeywordBtn
                type="button"
                style={btnStyle}
                onClick={() => handleClick(item)}
              >
                {keyword}
              </KeywordBtn>
            </div>
          )
        })}
    </div>
  )
}
