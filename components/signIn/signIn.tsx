import classNames from 'classnames/bind'

import Image from 'next/image'

// import Link from 'next/link'
// import { hsYuji } from '@/styles/local.fonts'
import ButtonHoverTapAnimation from './buttonHoverTapAnimation'
import styles from './signIn.module.scss'

const cx = classNames.bind(styles)

export default function SignIn({ children }: { children: React.ReactNode }) {
  return (
    <div className={cx('signInBackground')}>
      <div className={cx('signInWrapper')}>
        <div className={cx('imageContainer')}>
          <div className={cx('titleImageContainer')}>
            <ButtonHoverTapAnimation hoverScale={1.1} tapScale={0.9}>
              <Image
                className={cx('titleImage')}
                width={340}
                height={288}
                src="/images/signin-title.png"
                alt="signin title"
              />
            </ButtonHoverTapAnimation>
            <div>
              <Image
                className={cx('batLeftTopImage')}
                width={100}
                height={80}
                src="/images/signin-bat-left-top.png"
                alt="signin bat left top"
              />
            </div>
            <Image
              className={cx('batLeftBottomImage')}
              width={100}
              height={80}
              src="/images/signin-bat-left-bottom.png"
              alt="signin bat left bottom"
            />
            <Image
              className={cx('batRightMiddleImage')}
              width={100}
              height={80}
              src="/images/signin-bat-right-middle.png"
              alt="signin bat right middle"
            />
            <Image
              className={cx('ghostLeftMiddleImage')}
              width={80}
              height={80}
              src="/images/signin-ghost-left-middle.png"
              alt="signin ghost left middle"
            />
            <Image
              className={cx('ghostRightBottomImage')}
              width={60}
              height={60}
              src="/images/signin-ghost-right-bottom.png"
              alt="signin ghost right bottom"
            />
          </div>
          <p className={cx('signInText')}>SNS 계정 간편 로그인</p>
        </div>
        {children}
        {/* <div className={cx('ourStoryButtonContainer')}>
          <Link href="/" className={cx('ourStoryButton')}>
            <p className={cx('clickText', hsYuji.className)}>Click!</p>
            <ButtonHoverTapAnimation hoverScale={1.1} tapScale={0.9}>
              <Image
                className={cx('ourStoryButtonImage')}
                width={68}
                height={68}
                src="/images/signin-our-story-btn.svg"
                alt="signin our story button"
              />
            </ButtonHoverTapAnimation>
          </Link>
          <p className={cx('explainText', hsYuji.className)}>
            우리의 이야기가 궁금하다면?
          </p>
        </div> */}
        <div className={cx('castleImageContainer')}>
          <Image
            className={cx('castleImage')}
            width={100}
            height={300}
            src="/images/signin-castle.png"
            alt="signin castle"
          />
        </div>
      </div>
    </div>
  )
}
