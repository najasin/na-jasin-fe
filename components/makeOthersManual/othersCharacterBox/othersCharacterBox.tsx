'use client'

import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames/bind'

import { useParams, useSearchParams } from 'next/navigation'

import CharacterBox from '@/components/shared/characterBox/characterBox'
import GhostBtn from '@/components/shared/ghostBtn/ghostBtn'

import { fetchOthersManualById } from '@/api/axios/requestHandler/othersManual/getOthersManual.api'

import styles from './othersCharacterBox.module.scss'

const cx = classNames.bind(styles)

export default function OthersCharacterBox({
  onClickGhostBtn,
}: {
  onClickGhostBtn: () => void
}) {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') as string
  const { userType } = useParams() as { userType: string }

  const { data } = useQuery({
    queryKey: ['othersData'],
    queryFn: () => fetchOthersManualById(userType, userId),
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
