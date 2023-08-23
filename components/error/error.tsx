'use client'

import classNames from 'classnames/bind'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import CommonBtn from '../commonBtn/commonBtn'
import styles from './error.module.scss'

const cx = classNames.bind(styles)

export default function Error() {
  const router = useRouter()
  return (
    <div className={cx('wrap')}>
      <span className={cx('text', 'first4')}>4</span>
      <span className={cx('text', 'second0')}>0</span>
      <span className={cx('text', 'last4')}>4</span>
      <div className={cx('imageWrap')}>
        <Image
          src="/images/404-character.svg"
          alt="404 error character img"
          fill={true}
          priority={true}
        />
      </div>
      <div className={cx('batLeftTopImage')}>
        <Image
          src="/images/signin-bat-left-top.png"
          alt="left bat"
          width={100}
          height={80}
          priority={true}
        />
      </div>
      <div className={cx('batRightBottomImage')}>
        <Image
          src="/images/signin-bat-right-middle.png"
          alt="left bat"
          width={100}
          height={80}
          priority={true}
        />
      </div>
      <h2 className={cx('h2')}>죄송합니다.</h2>
      <h3 className={cx('h3')}> 현재 찾을 수 없는 페이지를 요청하셨습니다.</h3>
      <p className={cx('explain')}>
        <a> 페이지의 주소가 잘못 입력되었거나</a>
        <a> 주소가 변경 혹은 삭제되어서 요청하신</a>
        <a>페이지를 찾을 수 없습니다.</a>
      </p>
      <div className={cx('btnWrap')}>
        <div className={cx('btn')}>
          <CommonBtn onClick={() => router.back()}>이전으로</CommonBtn>
        </div>
        <div className={cx('btn')}>
          <CommonBtn onClick={() => router.push('/')}>홈으로</CommonBtn>
        </div>
      </div>
    </div>
  )
}
