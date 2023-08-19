'use client'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import styles from './signIn.module.scss'

const cx = classNames.bind(styles)

export default function SigninSocialContainer({
  userType,
}: {
  userType: 'forFun' | 'forDev'
}) {
  const router = useRouter()
  const handleClickGetAuthenticationCodeKaKao = () => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/auth2/authorize/kakao`)
  }

  const handleClickGetAuthenticationCodeGoogle = () => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/auth2/authorize/google`)
  }

  const handleClickGetAuthenticationCodeGithub = () => {}

  return (
    <div className={cx('socialContainer')}>
      <motion.button
        className={cx('kakao')}
        onClick={handleClickGetAuthenticationCodeKaKao}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Image
          className={cx('kakaoImage')}
          width={40}
          height={40}
          src="/images/signin-kakao.svg"
          alt="signin kakao"
        />
      </motion.button>
      <motion.button
        className={cx('google')}
        onClick={handleClickGetAuthenticationCodeGoogle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Image
          className={cx('googleImage')}
          width={40}
          height={40}
          src="/images/signin-google.svg"
          alt="signin google"
        />
      </motion.button>
      {userType === 'forDev' && (
        <motion.button
          className={cx('github')}
          onClick={handleClickGetAuthenticationCodeGithub}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Image
            className={cx('githubImage')}
            width={40}
            height={40}
            src="/images/signin-github.svg"
            alt="signin github"
          />
        </motion.button>
      )}
    </div>
  )
}
