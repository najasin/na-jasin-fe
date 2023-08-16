import classNames from 'classnames/bind'

import OurFeature from '@/components/ourStorySection/ourFeature/ourFeature'
import OurIntro from '@/components/ourStorySection/ourIntro/ourIntro'
import MockHeight from '@/components/scrollMotion/shared/mockHeight'

import styles from './page.module.scss'

const cx = classNames.bind(styles)

export default function OurStoryPage() {
  return (
    <div className={cx('pageWrapper')}>
      <OurIntro />
      <OurFeature />
      <MockHeight />
    </div>
  )
}
