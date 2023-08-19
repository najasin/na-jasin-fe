'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'

import CharacterBox from '@/components/characterBox/characterBox'
import GhostBtn from '@/components/ghostBtn/ghostBtn'

import { fetchOthersManual } from '../makeOthersManual.api'
import styles from './othersCharacterBox.module.scss'

const cx = classNames.bind(styles)

export default function OthersCharacterBox({
  onClickGhostBtn,
}: {
  onClickGhostBtn: () => void
}) {
  const { data } = useQuery({
    queryKey: ['othersData'],
    queryFn: fetchOthersManual,
  })

  const nickname = data?.nickname
  const baseImage = data?.baseImage
  const characterItems = data?.characterItems
  const setItems = characterItems?.set?.layoutCase
  const faceItems = characterItems?.face?.layoutCase
  const bodyItems = characterItems?.body?.layoutCase
  const expressionItems = characterItems?.expression?.layoutCase

  const selectedItems = setItems
    ? { set: setItems }
    : {
        face: faceItems as string,
        body: bodyItems as string,
        expression: expressionItems as string,
      }

  return (
    <>
      <span className={cx('characterBoxWrapper')}>
        <CharacterBox
          nickname={nickname}
          baseImage={baseImage}
          selectedItems={selectedItems}
        />
        <span className={cx('ghostBtnWrapper')}>
          <GhostBtn onClick={onClickGhostBtn} />
        </span>
      </span>
    </>
  )
}
