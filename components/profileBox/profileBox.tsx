import { useState } from 'react'

import classNames from 'classnames/bind'

import CharacterBox from '@/components/characterBox/characterBox'
import EditBtn from '@/components/editBtn/editBtn'
import FormBox from '@/components/formBox/formBox'
import CloseButton from '@/components/manualBox/closeButton'
import CharacterModalLayout from '@/components/modalLayout/characterModalLayout'
import RadarChartContainer from '@/components/radarChart/radarChartContainer'

import useBreakpoint from '@/hooks/useBreakpoint.hooks'

import CommonBtn from '../commonBtn/commonBtn'
import Inventory from '../inventory/inventory'
import ModalPortal from '../modalPortal/modalPortal'
import ResetBtn from '../resetBtn/resetBtn'
import styles from './profileBox.module.scss'
import { IProfileBoxProps } from './profileBox.types'

const cx = classNames.bind(styles)

export default function ProfileBox({
  data,
  myKeywordPercents,
  othersKeywordPercents,
}: IProfileBoxProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const isUnderTablet = useBreakpoint({ query: '(max-width: 1199px)' })

  const handleClickModalOpen = () => {
    setIsModalOpen(true)
    console.log('click')
  }

  const handleClickModalClose = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = () => {
    // api 요청
    console.log('submit')
    setIsModalOpen(false)
  }

  return (
    <>
      <div className={cx('profileBox')}>
        <div className={cx('characterBox')}>
          <CharacterBox
            baseImage={data?.itemsData?.baseImage}
            selectedItems={data?.itemsData?.selectedItems}
            editBtn={<EditBtn onClick={handleClickModalOpen} />}
          />
        </div>
        <div className={cx('chartBox')}>
          <RadarChartContainer
            radarType="MY"
            originKeywordPercents={myKeywordPercents}
            otherKeywordPercents={othersKeywordPercents}
            frameSize={340}
            radarSize={200}
            framePadding={140}
            hasOthers={true}
          />
        </div>
      </div>
      {isModalOpen && (
        <ModalPortal>
          <CharacterModalLayout
            title="자시니 다시 꾸미기"
            closeBtn={<CloseButton onClickModalClose={handleClickModalClose} />}
            character={
              !isUnderTablet && (
                <CharacterBox baseImage="/images/baseImage.svg" />
              )
            }
          >
            <div className={cx('formBox')}>
              <FormBox title="나를 꾸며주세요" showBack={false}>
                <div className={cx('wrapper')}>
                  <div className={cx('container')}>
                    {isUnderTablet && (
                      <div className={cx('character')}>
                        <CharacterBox baseImage="/images/baseImage.svg" />
                      </div>
                    )}
                    <Inventory isEdit={true} resetBtn={<ResetBtn />} />
                    <CommonBtn onClick={handleSubmit}>완료하기</CommonBtn>
                  </div>
                </div>
              </FormBox>
            </div>
          </CharacterModalLayout>
        </ModalPortal>
      )}
    </>
  )
}
