import classNames from 'classnames/bind'

import OurFeature from '@/components/ourStorySection/ourFeature/ourFeature'
import OurIntro from '@/components/ourStorySection/ourIntro/ourIntro'
import OurPreloader from '@/components/ourStorySection/ourPreloader/ourPreloader'
import EmptyHeight from '@/components/ourStorySection/shared/components/emptyHeight/emptyHeight'

import styles from './page.module.scss'

const cx = classNames.bind(styles)

export default function OurStoryPage() {
  return (
    <div className={cx('pageWrapper')}>
      <OurPreloader>
        <OurIntro />
      </OurPreloader>
      <EmptyHeight />
      <OurFeature />
    </div>
  )
}
