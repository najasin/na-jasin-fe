import { useState } from 'react'

import classNames from 'classnames/bind'

import CharacterBox from '@/components/characterBox/characterBox'
import EditBtn from '@/components/editBtn/editBtn'
import FormBox from '@/components/formBox/formBox'
import CloseButton from '@/components/manualBox/closeButton'
import CharacterModalLayout from '@/components/modalLayout/characterModalLayout'
import RadarChartContainer from '@/components/radarChart/radarChartContainer'

import styles from './profileBox.module.scss'
import { IProfileBoxProps } from './profileBox.types'

const cx = classNames.bind(styles)

export default function ProfileBox({
  data,
  myKeywordPercents,
  othersKeywordPercents,
}: IProfileBoxProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleClickModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleClickModalClose = () => {
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
        <CharacterModalLayout
          title="자시니 다시 꾸미기"
          closeBtn={<CloseButton onClickModalClose={handleClickModalClose} />}
          character={<CharacterBox baseImage={data?.itemsData?.baseImage} />}
        >
          <FormBox title="나를 꾸며주세요"></FormBox>
        </CharacterModalLayout>
      )}
    </>
  )
}
