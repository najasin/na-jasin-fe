'use client'

import classNames from 'classnames/bind'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import CommonBtn from '../commonBtn/commonBtn'
import styles from './error.module.scss'

const cx = classNames.bind(styles)

export default function ErrorComponent({
  variant = '404',
}: {
  variant?: string
}) {
  const router = useRouter()
  return (
    <div className={cx('wrap')}>
      {variant === 'error' ? (
        <>
          <span className={cx('text')}>e</span>
          <span className={cx('text')}>r</span>
          <span className={cx('text')}>r</span>
          <span className={cx('text')}>o</span>
          <span className={cx('text')}>r</span>
        </>
      ) : (
        <>
          <span className={cx('text')}>4</span>
          <span className={cx('text')}>0</span>
          <span className={cx('text')}>4</span>
        </>
      )}
      <div className={cx('imageWrap')}>
        <Image
          src="/images/404-character.svg"
          alt="404 error character img"
          fill={true}
          priority={true}
        />
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
      </div>
      <h2 className={cx('h2')}>죄송합니다.</h2>
      <h3 className={cx('h3')}>
        {variant === 'error' ? (
          <>현재 에러가 발생했습니다.</>
        ) : (
          <>현재 찾을 수 없는 페이지를 요청하셨습니다.</>
        )}
      </h3>
      <p className={cx('explain')}>
        {variant === 'error' ? (
          <>페이지를 다시 로드해 주세요 </>
        ) : (
          <>
            <a>페이지의 주소가 잘못 입력되었거나</a>
            <a>주소가 변경 혹은 삭제되어서 요청하신</a>
            <a>페이지를 찾을 수 없습니다.</a>
          </>
        )}
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
