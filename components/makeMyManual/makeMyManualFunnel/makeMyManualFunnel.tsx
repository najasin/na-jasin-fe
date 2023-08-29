'use client'

import classNames from 'classnames/bind'
import { FormState, UseFormRegister } from 'react-hook-form'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'

import KeywordBtnList from '@/components/keywordBtnList/keywordBtnList'
import {
  selectedBodyItemState,
  selectedExpressionItemState,
  selectedFaceItemState,
  selectedKeywordsState,
  selectedSetState,
  statsGraphValueState,
} from '@/components/makeMyManual/store/makeMyManual.atom'
import MyDescriptionCardList from '@/components/myDescriptionCardList/myDescriptionCardList'
import { Input } from '@/components/shared/commonInput/input'
import Inventory from '@/components/shared/inventory/inventory'
import { TrimmedDataProps } from '@/components/shared/radarChart/radarChart.types'
import RadarChartContainer from '@/components/shared/radarChart/radarChartContainer'
import ResetBtn from '@/components/shared/resetBtn/resetBtn'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import { IFunnelProps, IStepProps } from '@/hooks/useFunnel'

import { IFormInputs } from '../makeMyManual.types'
import styles from './makeMyManualFunnel.module.scss'

const cx = classNames.bind(styles)

export default function MakeMyManualFunnel({
  Funnel,
  step,
  register,
  formState,
}: {
  Funnel: ((
    props: Omit<IFunnelProps<string[]>, 'step'>,
  ) => React.JSX.Element) & {
    Step: (props: IStepProps<string[]>) => React.JSX.Element
  }
  register: UseFormRegister<IFormInputs>
  formState: FormState<IFormInputs>
  step: string
}) {
  const [selectedKeywords, setSelectedKeywords] = useRecoilState(
    selectedKeywordsState,
  )
  const setStatsGraphValue = useSetRecoilState(statsGraphValueState)

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

  const rectangleLayout = {
    frameSize: 350,
    radarSize: 200,
  }

  const originKeywordPercents = selectedKeywords.reduce(
    (acc, keyword) => ({
      ...acc,
      [keyword.keyword]: 26,
    }),
    {},
  )

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

  const validationRules = {
    required: true,
    minLength: {
      value: 1,
      message: '1글자 이상 입력해주세요.',
    },
  }
  const handleStatsGraphValue = (value: TrimmedDataProps) => {
    setStatsGraphValue(value)
  }

  return (
    <>
      <Funnel>
        <Funnel.Step name="nickname">
          <div className={cx('input', 'enter')}>
            <Input variant={inputVariant}>
              <Input.TextField
                id="nickname"
                register={register('nickname', {
                  ...(step === 'nickname' && validationRules),
                })}
                isInvalid={
                  formState.isSubmitted
                    ? !!formState.errors.nickname
                    : undefined
                }
              />
            </Input>
          </div>
        </Funnel.Step>
        <Funnel.Step name="character">
          <div className={cx('inventory', 'enter')}>
            <Inventory resetBtn={<ResetBtn onClick={handleResetBtnClick} />} />
          </div>
        </Funnel.Step>
        <Funnel.Step name="manual">
          <div className={cx('manualWrap', 'enter')}>
            <MyDescriptionCardList
              register={register}
              validationRules={step === 'manual' ? validationRules : undefined}
              formState={formState}
            />
          </div>
        </Funnel.Step>
        <Funnel.Step name="keyword">
          <div className={cx('keywords', 'enter')}>
            <KeywordBtnList
              selectedKeywords={selectedKeywords}
              setSelectedKeywords={setSelectedKeywords}
            />
          </div>
        </Funnel.Step>
        <Funnel.Step name="statGraph">
          <div className={cx('enter')}>
            <RadarChartContainer
              radarType="NJNS"
              originKeywordPercents={originKeywordPercents} // state가 아닌 일반 객체 넣으면 무한 depth
              otherKeywordPercents={{}}
              frameSize={rectangleLayout.frameSize}
              radarSize={rectangleLayout.radarSize}
              framePadding={
                rectangleLayout.frameSize - rectangleLayout.radarSize
              }
              hasOthers={false}
              handleUpdateRadarData={handleStatsGraphValue}
            />
          </div>
        </Funnel.Step>
      </Funnel>
    </>
  )
}
