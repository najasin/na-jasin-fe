'use client'

import { useState } from 'react'

import classNames from 'classnames/bind'
import { motion } from 'framer-motion'

import { useParams, useSearchParams } from 'next/navigation'

import CircleButton from '@/components/fab/circleButton'
import CopyToast from '@/components/shared/copyToast/copyToast'

import handleClickCopyClipboard from '@/services/clipboard.helpers'
import handleClickShareFacebook from '@/services/facebook.helpers'

import styles from './fab.module.scss'

const cx = classNames.bind(styles)

export default function Fab() {
  const { userType } = useParams()
  const userId = useSearchParams().get('userId')

  const shareUrl = `na-jasin.com/${userType}/others-manual?userId=${userId}`

  const [isClicked, setIsClicked] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  const handleOpenToast = () => {
    setIsCopied((prev) => !prev)
  }

  const handleClickInstagramBtn = () => {
    handleClickCopyClipboard(shareUrl, handleOpenToast)
    window.open('https://www.instagram.com/', 'noopener', 'noreferer')
  }

  return (
    <>
      <div className={cx('fab')}>
        {isClicked && (
          <motion.div
            // initial={{ opacity: 0, y: -10 }}
            // animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
            className={cx('buttons')}
          >
            <div>
              <div className={cx('absolute', 'facebook')}>
                <CircleButton
                  name="facebook"
                  image="facebook"
                  size="sm"
                  action={true}
                  onClick={() => handleClickShareFacebook(shareUrl)}
                />
              </div>
              <div className={cx('absolute', 'kakao')}>
                <CircleButton
                  id="kakao-link-btn"
                  name="kakao"
                  image="kakao"
                  size="sm"
                  action={true}
                />
              </div>
              <div className={cx('absolute', 'instagram')}>
                <CircleButton
                  name="instagram"
                  image="instagram"
                  size="sm"
                  action={true}
                  onClick={handleClickInstagramBtn}
                />
              </div>
              <div className={cx('absolute', 'link')}>
                <CircleButton
                  name="link"
                  image="link"
                  size="sm"
                  action={true}
                  onClick={() =>
                    handleClickCopyClipboard(shareUrl, handleOpenToast)
                  }
                />
              </div>
            </div>
            <CircleButton
              name="share"
              text="꿀팁받기"
              transparent={true}
              size="md"
            />
          </motion.div>
        )}
        <motion.div
          animate={{ rotate: isClicked ? 45 : 0 }}
          className={cx('basic')}
        >
          <div className={cx(!isClicked && 'baseBtn')}>
            <CircleButton
              name="plus"
              size="lg"
              image="plus"
              action={true}
              onClick={handleClick}
            />
          </div>
        </motion.div>
      </div>
      {isCopied && (
        <CopyToast
          type="success"
          title="링크 복사 완료!"
          subtitle="붙여넣어 보세요."
        />
      )}
    </>
  )
}
