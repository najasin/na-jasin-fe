'use client'

import { useEffect, useState } from 'react'

import classNames from 'classnames/bind'
import { AnimatePresence, motion } from 'framer-motion'

import { delaySetter } from './ourPreloader.helpers'
import styles from './ourPreloader.module.scss'

const cx = classNames.bind(styles)

export default function OurPreloader({
  children,
}: {
  children: React.ReactNode
}) {
  const [isFirstVisible, setIsFirstVisible] = useState<boolean>(false)
  const [isSecondVisible, setIsSecondVisible] = useState<boolean>(false)
  const [isLastVisible, setIsLastVisible] = useState<boolean>(true)

  useEffect(() => {
    const showTextAnimations = async () => {
      setIsFirstVisible(true)
      await delaySetter(200)
      setIsSecondVisible(true)
      await delaySetter(800)
      setIsFirstVisible(false)
      await delaySetter(200)
      setIsSecondVisible(false)
      await delaySetter(500)
      setIsLastVisible(false)
    }
    showTextAnimations()
  }, [])

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLastVisible && (
          <motion.div
            className={cx('preloaderWrapper')}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className={cx('textList')}>
              <motion.span
                initial={{ y: 0, opacity: 0 }}
                animate={
                  isFirstVisible ? { y: -30, opacity: 1 } : { y: 0, opacity: 0 }
                }
                transition={{
                  duration: isFirstVisible ? 0.5 : 0.2,
                  ease: isFirstVisible ? 'easeIn' : 'easeOut',
                }}
              >
                나,
              </motion.span>
              <motion.span
                initial={{ y: 0, opacity: 0 }}
                animate={
                  isSecondVisible
                    ? { y: -30, opacity: 1 }
                    : { y: 0, opacity: 0 }
                }
                transition={{
                  duration: isSecondVisible ? 0.5 : 0.2,
                  ease: isSecondVisible ? 'easeIn' : 'easeOut',
                }}
              >
                자신
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isLastVisible && children}
    </>
  )
}
