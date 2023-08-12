import classNames from 'classnames/bind'

import styles from './modalLayout.module.scss'
import { ModalLayoutProps } from './modalLayout.types'

const cx = classNames.bind(styles)

export default function ModalLayout({
  title,
  closeBtn,
  character,
  content,
  completeBtn,
}: ModalLayoutProps) {
  return (
    <div className={cx('modal', character ? 'character' : 'noCharacter')}>
      <div className={cx('header', character ? 'narrow' : 'wide')}>
        <p className={cx('title')}>{title}</p>
        {closeBtn}
      </div>
      <div className={cx('contents', character ? 'yes' : 'no')}>
        {character && character}
        {content}
      </div>
      <div className={cx('complete')}>{completeBtn}</div>
    </div>
  )
}
