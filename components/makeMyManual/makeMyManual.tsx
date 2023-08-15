'use client'

import React from 'react'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import CharacterBox from '@/components/characterBox/characterBox'
import CommonBtn from '@/components/commonBtn/commonBtn'
import { Input } from '@/components/commonInput/input'
import FormBox from '@/components/formBox/formBox'
import Inventory from '@/components/inventory/inventory'
import ResetBtn from '@/components/resetBtn/resetBtn'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import { useFunnel } from '@/hooks/useFunnel'

import KeywordBtnList from '../keywordBtnList/keywordBtnList'
import MyDescriptionCardList from '../myDescriptionCardList/myDescriptionCardList'
import RadarChartContainer from '../radarChart/radarChartContainer'
import { fetchMyProfileRegisterData } from './makeMyManual.api'
import styles from './makeMyManual.module.scss'
import {
  selectedBodyItemState,
  selectedExpressionItemState,
  selectedFaceItemState,
  selectedKeywordsState,
  selectedSetState,
} from './store/makeMyManual.atom'
import { originKeywordPercentsSelector } from './store/originKeywordPercents.selecter'

const cx = classNames.bind(styles)

export default function MakeMyManual() {
  const { data } = useQuery({
    queryKey: ['myprofileRegister'],
    queryFn: fetchMyProfileRegisterData,
  })
  const [Funnel, step, setStep] = useFunnel(
    ['nickname', 'character', 'manual', 'keword', 'statGraph'],
    'nickname',
  )
  const selectedFaceItem = useRecoilValue(selectedFaceItemState)
  const selectedBodyItem = useRecoilValue(selectedBodyItemState)
  const selectedExpressionItem = useRecoilValue(selectedExpressionItemState)
  const selectedSet = useRecoilValue(selectedSetState)
  const [selectedKeywords, setSelectedKeywords] = useRecoilState(
    selectedKeywordsState,
  )
  const originKeywordPercents = useRecoilValue(originKeywordPercentsSelector)

  const isTablet: boolean = useBreakpoint({ query: '(max-width: 1199px)' })
  const isMobile: boolean = useBreakpoint({ query: '(max-width: 768px)' })
  let inputVariant: string

  if (isTablet) {
    inputVariant = 'medium'
  } else if (isMobile) {
    inputVariant = 'small'
  } else {
    inputVariant = 'large'
  }

  const selectedItems = selectedSet
    ? { set: selectedSet }
    : {
        face: selectedFaceItem,
        body: selectedBodyItem,
        expression: selectedExpressionItem,
      }

  const rectangleLayout = {
    frameSize: 350,
    radarSize: 200,
  }

  const resetFace = useResetRecoilState(selectedFaceItemState)
  const resetBody = useResetRecoilState(selectedBodyItemState)
  const resetExpression = useResetRecoilState(selectedExpressionItemState)
  const resetSet = useResetRecoilState(selectedSetState)

  const handleResetBtnClick = () => {
    resetFace()
    resetBody()
    resetExpression()
    resetSet()
  }

  const handleSubmitBtnClick = () => {
    if (step === 'nickname') {
      setStep('character')
    } else if (step === 'character') {
      setStep('manual')
    } else if (step === 'manual') {
      setStep('keyword')
    } else if (step === 'keword') {
      setStep('statGraph')
    } else if (step === 'statGraph') {
      console.log('완료')
    }
  }

  return (
    <div className={cx('layout')}>
      {!isTablet && step !== 'nickname' && (
        <CharacterBox
          baseImage={data?.itemsData?.baseImage}
          selectedItems={selectedItems}
        />
      )}

      <FormBox title="나를 꾸며주세요" paddingTop={32}>
        <div className={cx('formContent')}>
          {(isTablet || step === 'nickname') && (
            <CharacterBox
              baseImage={data?.itemsData?.baseImage}
              selectedItems={selectedItems}
            />
          )}

          <Funnel>
            <Funnel.Step name="nickname">
              <div className={cx('input')}>
                <Input variant={inputVariant}>
                  <Input.TextField />
                </Input>
              </div>
            </Funnel.Step>
            <Funnel.Step name="character">
              <div className={cx('inventory')}>
                <Inventory
                  resetBtn={<ResetBtn onClick={handleResetBtnClick} />}
                />
              </div>
            </Funnel.Step>
            <Funnel.Step name="manual">
              <div className={cx('manualWrap')}>
                <MyDescriptionCardList questions={data?.itemsData?.questions} />
              </div>
            </Funnel.Step>

            <Funnel.Step name="keword">
              <div className={cx('keywords')}>
                <KeywordBtnList
                  selectedKeywords={selectedKeywords}
                  setSelectedKeywords={setSelectedKeywords}
                  keywords={data?.itemsData?.exampleKeywords}
                />
              </div>
            </Funnel.Step>

            <Funnel.Step name="statGraph">
              {originKeywordPercents && (
                <RadarChartContainer
                  radarType="NJNS"
                  originKeywordPercents={originKeywordPercents}
                  otherKeywordPercents={{}}
                  frameSize={rectangleLayout.frameSize}
                  radarSize={rectangleLayout.radarSize}
                  framePadding={
                    rectangleLayout.frameSize - rectangleLayout.radarSize
                  }
                  hasOthers={false}
                />
              )}
            </Funnel.Step>
          </Funnel>
        </div>

        <div className={cx('btn')}>
          <CommonBtn onClick={handleSubmitBtnClick}>다음</CommonBtn>
        </div>
      </FormBox>
    </div>
  )
}
