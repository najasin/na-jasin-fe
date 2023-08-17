'use client'

import { useState } from 'react'

import ContentWrapper from '@/components/contentsWrapper/contentWrapper'
import Fab from '@/components/fab/fab'
import LinkBtn from '@/components/linkBtn/linkBtn'
import ManualBox from '@/components/manualBox/manualBox'
import ProfileBox from '@/components/profileBox/profileBox'
import SimpleLayout from '@/components/simpleLayout/simpleLayout'

// mock data
const data = {
  itemsData: {
    baseImage: '/images/baseCharacter.svg',
    selectedItems: {
      face: '/images/plus.svg',
      body: '/images/plus.svg',
      expression: '/images/plus.svg',
    },
  },
}

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
    nickname: 'hello',
    qas: [
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
    ],
  },
  {
    nickname: 'bye',
    qas: [
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
    ],
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
    <>
      <SimpleLayout
        title={`${nickname} 사용 설명서`}
        btnComponent={<LinkBtn />}
        margin={50}
      >
        <ContentWrapper>
          <ProfileBox data={data} />
          <ManualBox
            myDatas={myDatas}
            othersDatas={othersDatas}
            type={type}
            onClickMyTypeBtn={handleClickMyTypeBtn}
            onClickOthersTypeBtn={handleClickOthersTypeBtn}
          />
        </ContentWrapper>
      </SimpleLayout>
      <Fab />
    </>
  )
}
