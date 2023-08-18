import React from 'react'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'

import { getMyManualRegister } from '@/api/axios/requestHandler/myManual/getMyManualRegister.api'

import { ButtonStyle } from '../commonBtn/commonBtn.types'
import KeywordBtn from '../keywordBtn/keywordBtn'
import styles from './keywordBtnList.module.scss'
import { IKeywordBtnListProps } from './keywordBtnList.types'

const cx = classNames.bind(styles)
export default function KeywordBtnList({
  // keywords,
  selectedKeywords,
  setSelectedKeywords,
}: IKeywordBtnListProps) {
  const { data } = useQuery({
    queryKey: ['myprofileRegister'],
    queryFn: getMyManualRegister,
    refetchOnWindowFocus: true,
  })
  const handleClick = (keyword: string) => {
    setSelectedKeywords((prevSelected) =>
      prevSelected.includes(keyword)
        ? prevSelected.filter((selectedKeyword) => selectedKeyword !== keyword)
        : [...prevSelected, keyword],
    )
  }
  return (
    <div className={cx('wrap')}>
      {data?.exampleKeywords &&
        data.exampleKeywords.map((keyword: string, index: number) => {
          const isActive = selectedKeywords.includes(keyword)
          const btnStyle = isActive ? ButtonStyle.ACTIVE : undefined

          return (
            <div key={index}>
              <KeywordBtn
                type="button"
                style={btnStyle}
                onClick={() => handleClick(keyword)}
              >
                {keyword}
              </KeywordBtn>
            </div>
          )
        })}
    </div>
  )
}
