import classNames from 'classnames/bind'

import CharacterBox from '@/components/characterBox/characterBox'

import EditBtn from '../editBtn/editBtn'
import RadarChartContainer from '../radarChart/radarChartContainer'
import styles from './profileBox.module.scss'

const cx = classNames.bind(styles)

export default function ProfileBox({
  data,
}: {
  data: {
    itemsData: {
      baseImage: string
      selectedItems: { face: string; body: string; expression: string }
    }
  }
}) {
  return (
    <div className={cx('profileBox')}>
      <div className={cx('characterBox')}>
        <CharacterBox
          baseImage={data?.itemsData?.baseImage}
          selectedItems={data?.itemsData?.selectedItems}
          editBtn={<EditBtn />}
        />
      </div>
      <div className={cx('chartBox')}>
        <RadarChartContainer
          radarType="MY"
          originKeywordPercents={{ a: 1, b: 2, c: 3, d: 4, e: 5 }}
          otherKeywordPercents={{ a: 5, b: 4, c: 3, d: 2, e: 1 }}
          frameSize={340}
          radarSize={200}
          framePadding={140}
          hasOthers={true}
        />
      </div>
    </div>
  )
}
