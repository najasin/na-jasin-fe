'use client'

import classNames from 'classnames/bind'

import Image from 'next/image'
import Link from 'next/link'

import { hsYuji } from '@/styles/local.fonts'

import styles from './signIn.module.scss'

const cx = classNames.bind(styles)

export default function SignIn() {
  const handleClickGetAuthenticationCodeKaKao = () => {}
  const handleClickGetAuthenticationCodeGoogle = () => {}
  const handleClickGetAuthenticationCodeGithub = () => {}

  return (
    <div className={cx('signInWrapper')}>
      <div className={cx('imageContainer')}>
        <div className={cx('titleImageContainer')}>
          <Image
            width={340}
            height={288}
            src="/images/signin-title.png"
            alt="signin title"
          />
          <Image
            className={cx('batLeftTopImage')}
            width={100}
            height={80}
            src="/images/signin-bat-left-top.png"
            alt="signin bat left top"
          />
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
      <div className={cx('socialContainer')}>
        <button
          className={cx('kakao')}
          onClick={handleClickGetAuthenticationCodeKaKao}
        >
          <Image
            width={40}
            height={40}
            src="/images/signin-kakao.svg"
            alt="signin kakao"
          />
        </button>
        <button
          className={cx('google')}
          onClick={handleClickGetAuthenticationCodeGoogle}
        >
          <Image
            width={40}
            height={40}
            src="/images/signin-google.svg"
            alt="signin google"
          />
        </button>
        <button
          className={cx('github')}
          onClick={handleClickGetAuthenticationCodeGithub}
        >
          <Image
            width={40}
            height={40}
            src="/images/signin-github.svg"
            alt="signin github"
          />
        </button>
      </div>
      <div className={cx('ourStoryButtonContainer')}>
        <Link href="/" className={cx('ourStoryButton')}>
          <p className={cx('clickText', hsYuji.className)}>Click!</p>
          <Image
            width={68}
            height={68}
            src="/images/signin-our-story-btn.svg"
            alt="signin our story button"
          />
        </Link>
        <p className={cx('explainText', hsYuji.className)}>
          우리의 이야기가 궁금하다면?
        </p>
      </div>
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
  )
}
