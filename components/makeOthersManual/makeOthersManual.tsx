'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'

import CharacterBox from '@/components/characterBox/characterBox'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import { useFunnel } from '@/hooks/useFunnel'

import CommonBtn from '../commonBtn/commonBtn'
import { ButtonStyle } from '../commonBtn/commonBtn.types'
import FormBox from '../formBox/formBox'
import MakeOthersDescriptionCardList from '../makeOthersDescriptionCardList/makeOthersDescriptionCardList'
import RadarChartContainer from '../radarChart/radarChartContainer'
import SimpleLayout from '../simpleLayout/simpleLayout'
import { fetchOthersData } from './makeOthersManual.api'
import { graphDataState } from './makeOthersManual.atom'
import styles from './makeOthersManual.module.scss'

const cx = classNames.bind(styles)

export default function MakeOthersManual() {
  const { data, isLoading } = useQuery({
    queryKey: ['othersData2'],
    queryFn: fetchOthersData,
  })

  const [graphData, setGraphData] = useRecoilState(graphDataState)

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm()

  const { Funnel, step, goPrev, goNext } = useFunnel(
    ['manual', 'statGraph'],
    'manual',
  )

  const onClickSubmit = () => {
    goNext()
  }

  const isTablet: boolean = useBreakpoint({ query: '(max-width: 1199px)' })
  const isMobile: boolean = useBreakpoint({ query: '(max-width: 768px)' })

  const nickname = data?.othersData2?.nickname
  const otherKeywordPercents = data?.othersData2?.otherKeywordPercents
  const characterItems = data?.othersData2?.characterItems
  const setItems = characterItems?.set?.showCase
  const faceItems = characterItems?.face?.showCase
  const bodyItems = characterItems?.body?.showCase
  const expressionItems = characterItems?.expression?.showCase

  const selectedItems = setItems
    ? { set: setItems }
    : {
        face: faceItems,
        body: bodyItems,
        expression: expressionItems,
      }

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

  return (
    <>
      {!isLoading && (
        <SimpleLayout
          title={`${nickname} 사용설명서 만들기`}
          margin={!isMobile ? 32 : 10}
        >
          <div className={cx('layout')}>
            {!isTablet && (
              <CharacterBox
                baseImage={data?.itemsData?.baseImage}
                selectedItems={selectedItems}
              />
            )}

            <FormBox
              title="나를 꾸며주세요"
              paddingTop={32}
              onBackClick={goPrev}
            >
              <form onSubmit={handleSubmit(onClickSubmit)}>
                <div className={cx('formContent')}>
                  {isTablet && step === 'manual' && (
                    <CharacterBox
                      baseImage={data?.itemsData?.baseImage}
                      selectedItems={selectedItems}
                    />
                  )}

                  <Funnel>
                    <Funnel.Step name="manual">
                      <div className={cx('manualWrap')}>
                        <MakeOthersDescriptionCardList
                          register={register}
                          validationRules={
                            step === 'manual' ? validationRules : undefined
                          }
                          step={step}
                        />
                      </div>
                    </Funnel.Step>
                    <Funnel.Step name="statGraph">
                      {otherKeywordPercents && (
                        <RadarChartContainer
                          radarType="TJNS"
                          setRadarData={setGraphData}
                          originKeywordPercents={graphData}
                          otherKeywordPercents={otherKeywordPercents}
                          frameSize={rectangleLayout.frameSize}
                          radarSize={rectangleLayout.radarSize}
                          framePadding={
                            rectangleLayout.frameSize -
                            rectangleLayout.radarSize
                          }
                          hasOthers={false}
                        />
                      )}
                    </Funnel.Step>
                  </Funnel>
                </div>

                <div className={cx('btn')}>
                  <CommonBtn
                    type="submit"
                    style={
                      isSubmitting ? ButtonStyle.DEACTIVE : ButtonStyle.ACTIVE
                    }
                  >
                    다음
                  </CommonBtn>
                </div>
              </form>
            </FormBox>
          </div>
        </SimpleLayout>
      )}
    </>
  )
}
