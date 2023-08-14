'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import CharacterBox from '@/components/characterBox/characterBox'
import Inventory from '@/components/inventory/inventory'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'
import { useFunnel } from '@/hooks/useFunnel'

import CommonBtn from '../commonBtn/commonBtn'
import { Input } from '../commonInput/input'
import FormBox from '../formBox/formBox'
import ResetBtn from '../resetBtn/resetBtn'
import { fetchMyProfileRegisterData } from './makeMyManual.api'
import {
  selectedBodyItemState,
  selectedExpressionItemState,
  selectedFaceItemState,
  selectedSetState,
} from './makeMyManual.atom'
import styles from './makeMyManual.module.scss'

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

  const isTablet: boolean = useBreakpoint({ query: '(max-width: 1199px)' })
  const isMobile: boolean = useBreakpoint({ query: '(max-width: 768px)' })
  let inputVariant

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

  return (
    <div className={cx('layout')}>
      {!isTablet && step !== 'nickname' && (
        <CharacterBox
          baseImage={data?.itemsData?.baseImage}
          selectedItems={selectedItems}
        />
      )}

      <FormBox title="나를 꾸며주세요" paddingTop={31}>
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
              <div className={cx('btn')}>
                <CommonBtn onClick={() => setStep('character')}>다음</CommonBtn>
              </div>
            </Funnel.Step>
            <Funnel.Step name="character">
              <Inventory
                resetBtn={<ResetBtn onClick={handleResetBtnClick} />}
                nextBtn={
                  <CommonBtn onClick={() => setStep('manual')}>다음</CommonBtn>
                }
              />
            </Funnel.Step>
            <Funnel.Step name="manual"></Funnel.Step>

            <Funnel.Step name="keword"></Funnel.Step>

            <Funnel.Step name="statGraph"></Funnel.Step>
          </Funnel>
        </div>
      </FormBox>
    </div>
  )
}
