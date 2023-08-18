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
    queryKey: ['othersData2'],
    queryFn: fetchOthersManual,
  })

  const characterItems = data?.othersData2?.characterItems
  const setItems = characterItems?.set?.showCase
  const faceItems = characterItems?.face?.showCase
  const bodyItems = characterItems?.body?.showCase
  const expressionItems = characterItems?.expression?.showCase

  const selectedItems = setItems
    ? { set: setItems }
    : {
        face: faceItems,
        body: bodyItems,
        expression: expressionItems,
      }

  return (
    <>
      <span className={cx('characterBoxWrapper')}>
        <CharacterBox
          baseImage={data?.itemsData?.baseImage}
          selectedItems={selectedItems}
        />
        <span className={cx('ghostBtnWrapper')}>
          <GhostBtn onClick={onClickGhostBtn} />
        </span>
      </span>
    </>
  )
}
