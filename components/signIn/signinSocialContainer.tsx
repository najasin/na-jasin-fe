'use client'

import classNames from 'classnames/bind'

import Image from 'next/image'

import styles from './signIn.module.scss'

const cx = classNames.bind(styles)

export default function SigninSocialContainer() {
  const handleClickGetAuthenticationCodeKaKao = () => {}
  const handleClickGetAuthenticationCodeGoogle = () => {}
  const handleClickGetAuthenticationCodeGithub = () => {}

  return (
    <div className={cx('socialContainer')}>
      <button
        className={cx('kakao')}
        onClick={handleClickGetAuthenticationCodeKaKao}
      >
        <Image
          className={cx('kakaoImage')}
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
          className={cx('googleImage')}
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
          className={cx('githubImage')}
          width={40}
          height={40}
          src="/images/signin-github.svg"
          alt="signin github"
        />
      </button>
    </div>
  )
}
