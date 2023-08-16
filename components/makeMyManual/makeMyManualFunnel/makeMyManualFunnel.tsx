'use client'

import classNames from 'classnames/bind'
import { FieldValues, FormState, UseFormRegister } from 'react-hook-form'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import { Input } from '@/components/commonInput/input'
import Inventory from '@/components/inventory/inventory'
import KeywordBtnList from '@/components/keywordBtnList/keywordBtnList'
import {
  selectedBodyItemState,
  selectedExpressionItemState,
  selectedFaceItemState,
  selectedKeywordsState,
  selectedSetState,
} from '@/components/makeMyManual/store/makeMyManual.atom'
import MyDescriptionCardList from '@/components/myDescriptionCardList/myDescriptionCardList'
import RadarChartContainer from '@/components/radarChart/radarChartContainer'
import ResetBtn from '@/components/resetBtn/resetBtn'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import { IFunnelProps, IStepProps } from '@/hooks/useFunnel'

import { originKeywordPercentsSelector } from '../store/originKeywordPercents.selecter'
import styles from './makeMyManualFunnel.module.scss'

const cx = classNames.bind(styles)

export default function MakeMyManualFunnel({
  Funnel,
  step,
  register,
}: {
  Funnel: ((
    props: Omit<IFunnelProps<string[]>, 'step'>,
  ) => React.JSX.Element) & {
    Step: (props: IStepProps<string[]>) => React.JSX.Element
  }
  register: UseFormRegister<FieldValues>
  formState: FormState<FieldValues>
  step: string
}) {
  const originKeywordPercents = useRecoilValue(originKeywordPercentsSelector)
  const [selectedKeywords, setSelectedKeywords] = useRecoilState(
    selectedKeywordsState,
  )
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

  return (
    <Funnel>
      <Funnel.Step name="nickname">
        <div className={cx('input')}>
          <Input variant={inputVariant}>
            <Input.TextField
              id="nickname"
              register={register('nickname', {
                ...(step === 'nickname' && { ...validationRules }),
              })}
              // isInvalid={
              //   formState.isSubmitted ? !!formState.errors.nickname : undefined
              // }
            />
          </Input>
        </div>
      </Funnel.Step>
      <Funnel.Step name="character">
        <div className={cx('inventory')}>
          <Inventory resetBtn={<ResetBtn onClick={handleResetBtnClick} />} />
        </div>
      </Funnel.Step>
      <Funnel.Step name="manual">
        <div className={cx('manualWrap')}>
          <MyDescriptionCardList
            register={register}
            validationRules={step === 'manual' ? validationRules : undefined}
          />
        </div>
      </Funnel.Step>

      <Funnel.Step name="keyword">
        <div className={cx('keywords')}>
          <KeywordBtnList
            selectedKeywords={selectedKeywords}
            setSelectedKeywords={setSelectedKeywords}
            // keywords={data?.itemsData?.exampleKeywords}
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
            framePadding={rectangleLayout.frameSize - rectangleLayout.radarSize}
            hasOthers={false}
          />
        )}
      </Funnel.Step>
    </Funnel>
  )
}
