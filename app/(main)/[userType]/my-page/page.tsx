'use client'

import { useState } from 'react'

import ContentWrapper from '@/components/contentsWrapper/contentWrapper'
import Fab from '@/components/fab/fab'
import LinkBtn from '@/components/linkBtn/linkBtn'
import ManualBox from '@/components/manualBox/manualBox'
import ProfileBox from '@/components/profileBox/profileBox'
import SimpleLayout from '@/components/simpleLayout/simpleLayout'

// mock nickname
const nicknames = 'example'

// mock data
const characterData = {
  itemsData: {
    baseImage: '/images/baseImage.svg',
    selectedItems: {
      face: '/images/headset.svg',
      body: '/images/laptop.svg',
      expression: '/images/tired.svg',
    },
  },
}

// mock myDatas
const myDatas = [
  {
    id: 'ex1',
    question: { question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    id: 'ex2',
    question: { question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    id: 'ex3',
    question: { question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    id: 'ex4',
    question: { question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    id: 'ex5',
    question: { question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
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

const myKeywordPercent = {
  안녕하: 1,
  안녕ㅇ: 2,
  안녕ㄴ: 3,
  안녕ㅁ: 4,
  안녕ㅔ: 5,
}

const othersKeywordPercent = {
  안녕하: 5,
  안녕ㅇ: 4,
  안녕ㄴ: 3,
  안녕ㅁ: 2,
  안녕ㅔ: 1,
}

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
        title={`${nicknames} 사용 설명서`}
        btnComponent={<LinkBtn />}
        margin={50}
      >
        <ContentWrapper>
          <ProfileBox
            myKeywordPercents={myKeywordPercent}
            othersKeywordPercents={othersKeywordPercent}
            data={characterData}
          />
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
