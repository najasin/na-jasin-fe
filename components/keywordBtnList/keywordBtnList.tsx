import React from 'react'

import classNames from 'classnames/bind'

import { ButtonStyle } from '../commonBtn/commonBtn.types'
import KeywordBtn from '../keywordBtn/keywordBtn'
import styles from './keywordBtnList.module.scss'
import { IKeywordBtnListProps } from './keywordBtnList.types'

const cx = classNames.bind(styles)
export default function KeywordBtnList({
  keywords,
  selectedKeywords,
  setSelectedKeywords,
}: IKeywordBtnListProps) {
  const handleClick = (keyword: string) => {
    setSelectedKeywords((prevSelected) =>
      prevSelected.includes(keyword)
        ? prevSelected.filter((selectedKeyword) => selectedKeyword !== keyword)
        : [...prevSelected, keyword],
    )
  }
  return (
    <div className={cx('wrap')}>
      {keywords &&
        keywords.map((keyword, index) => {
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
