'use client'

import { useState } from 'react'

import LinkBtn from '@/components/linkBtn/linkBtn'
import ManualBox from '@/components/manualBox/manualBox'
import SimpleLayout from '@/components/simpleLayout/simpleLayout'

// mock myDatas
const myDatas = [
  {
    question: { id: 'ex1', question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    question: { id: 'ex2', question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    question: { id: 'ex3', question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    question: { id: 'ex4', question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    question: { id: 'ex5', question: '저를 기분좋게 만드는 건 ---이에요.' },
    defaultValue: '맛있는 음식',
  },
]

// mock othersDatas
const othersDatas = [
  {
    id: 'ex1',
    question: '저를 기분좋게 만드는 건 ---이에요.',
    answer: '맛있는 음식',
  },
  {
    id: 'ex2',
    question: '저를 기분좋게 만드는 건 ---이에요.',
    answer: '맛있는 음식',
  },
  {
    id: 'ex3',
    question: '저를 기분좋게 만드는 건 ---이에요.',
    answer: '맛있는 음식',
  },
  {
    id: 'ex4',
    question: '저를 기분좋게 만드는 건 ---이에요.',
    answer: '맛있는 음식',
  },
]

// mock nickname
const nickname = 'example'

export default function MyPage() {
  const [type, setType] = useState('MY')

  const handleClickMyTypeBtn = () => {
    setType('MY')
  }

  const handleClickOthersTypeBtn = () => {
    setType('OTHERS')
  }

  return (
    <SimpleLayout title={`${nickname} 사용 설명서`} btnComponent={<LinkBtn />}>
      <ManualBox
        myDatas={myDatas}
        othersDatas={othersDatas}
        type={type}
        onClickMyTypeBtn={handleClickMyTypeBtn}
        onClickOthersTypeBtn={handleClickOthersTypeBtn}
        nickname={nickname}
      />
    </SimpleLayout>
  )
}
