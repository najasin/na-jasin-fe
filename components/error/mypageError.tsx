import classNames from 'classnames/bind'

import Image from 'next/image'

import styles from './mypageError.module.scss'

const cx = classNames.bind(styles)

export default function MypageError({ error }: { error: Error }) {
  return (
    <div className={cx('wrap')}>
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
      <div className={cx('contentWrap')}>
        <h1 className={cx('errorMessage')}>{error.message}</h1>
        <p className={cx('message')}>링크를 다시 한번 확인해 주세요!</p>
      </div>
    </div>
  )
}
