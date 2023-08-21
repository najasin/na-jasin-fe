'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { FormState, UseFormRegister } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'

import MakeOthersDescriptionCardList from '@/components/makeOthersDescriptionCardList/makeOthersDescriptionCardList'
import { TrimmedDataProps } from '@/components/radarChart/radarChart.types'
import RadarChartContainer from '@/components/radarChart/radarChartContainer'

import { IFunnelProps, IStepProps } from '@/hooks/useFunnel'

import {
  IKeyword,
  fetchOthersManual,
} from '@/api/axios/requestHandler/othersManual/getOthersManual.api'

import { IFormInputs } from '../makeOthersManual.type'
import { statsGraphValueState } from '../store/makeOthersManual.atom'
import styles from './makeOthersManualFunnel.module.scss'

const cx = classNames.bind(styles)

export default function MakeOthersManualFunnel({
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
  const { data } = useQuery({
    queryKey: ['othersData'],
    queryFn: fetchOthersManual,
  })

  const setStatsGraphValue = useSetRecoilState(statsGraphValueState)

  const originKeywordPercents = data?.originKeywordPercents as IKeyword
  const otherKeywordPercents = data?.otherKeywordPercents as IKeyword

  const rectangleLayout = {
    frameSize: 350,
    radarSize: 200,
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
    <Funnel>
      <Funnel.Step name="manual">
        <div className={cx('manualWrap')}>
          <MakeOthersDescriptionCardList
            register={register}
            validationRules={step === 'manual' ? validationRules : undefined}
            step={step}
            formState={formState}
          />
        </div>
      </Funnel.Step>
      <Funnel.Step name="statGraph">
        {statsGraphValueState && (
          <RadarChartContainer
            radarType="TJNS"
            originKeywordPercents={originKeywordPercents}
            otherKeywordPercents={otherKeywordPercents}
            frameSize={rectangleLayout.frameSize}
            radarSize={rectangleLayout.radarSize}
            framePadding={rectangleLayout.frameSize - rectangleLayout.radarSize}
            hasOthers={false}
            handleUpdateRadarData={handleStatsGraphValue}
          />
        )}
      </Funnel.Step>
    </Funnel>
  )
}
