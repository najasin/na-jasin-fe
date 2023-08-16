import classNames from 'classnames/bind'
import { useRecoilState } from 'recoil'

import styles from './featureDetail.module.scss'
import { fullScreenState } from './featureStore.store'

type Props = {
  id: string
}

const cx = classNames.bind(styles)

function FeatureDetail({
  children,
  id,
}: { children: React.ReactNode } & Props) {
  //   console.log(id) // id가 여러 개 찍히는 이유는 map을 돌려서 어쨌든 여러 개를 렌더링하기 때문에.
  const [fullScreen] = useRecoilState(fullScreenState)

  //   console.log('fullScreen at detail', fullScreen)
  return (
    <div
      className={cx('imgWrapper', {
        isView: fullScreen === id,
      })}
    >
      {children}
    </div>
  )
}

export function TodoDetail({ id }: Props) {
  return (
    <FeatureDetail id={id}>
      <div style={{ backgroundColor: 'grey' }} className={cx('imgContainer')}>
        <p>상세 이미지가 들어가는 곳입니다.</p>
      </div>
    </FeatureDetail>
  )
}

export function TodoDetail2({ id }: Props) {
  return (
    <FeatureDetail id={id}>
      <div
        style={{ backgroundColor: 'darkorange' }}
        className={cx('imgContainer')}
      >
        <p>상세 이미지가 들어가는 곳입니다.</p>
      </div>
    </FeatureDetail>
  )
}
