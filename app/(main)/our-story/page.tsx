import classNames from 'classnames/bind'

import OurIntro from '@/components/ourFeature/ourIntro'
import MockHeight from '@/components/scrollMotion/shared/mockHeight'

import styles from './page.module.scss'

const cx = classNames.bind(styles)

export default function OurStoryPage() {
  return (
    <div className={cx('pageWrapper')}>
      <OurIntro />
      <MockHeight />
    </div>
  )
}
