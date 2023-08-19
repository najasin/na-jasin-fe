'use client'

import { useState } from 'react'

import ContentWrapper from '@/components/contentsWrapper/contentWrapper'
import Fab from '@/components/fab/fab'
import LinkBtn from '@/components/linkBtn/linkBtn'
import ManualBox from '@/components/manualBox/manualBox'
import ProfileBox from '@/components/profileBox/profileBox'
import SimpleLayout from '@/components/simpleLayout/simpleLayout'

// import { getMypage } from '@/api/axios/requestHandler/mypage/get.apis'

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
      set: '',
    },
  },
}

// mock myDatas
const myDatas = [
  {
    id: 1,
    question: { question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    id: 2,
    question: { question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    id: 3,
    question: { question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    id: 4,
    question: { question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    id: 5,
    question: { question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    id: 6,
    question: { question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    id: 7,
    question: { question: '저를 기분좋게 만드는 건 ---이에요.' },
    answer: '맛있는 음식',
  },
  {
    id: 8,
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
        id: 1,
        question: '저를 기분좋게 만드는 건 ---이에요.',
        answer: '맛있는 음식',
      },
      {
        id: 2,
        question: '저를 기분좋게 만드는 건 ---이에요.',
        answer: '맛있는 음식',
      },
    ],
  },
  {
    nickname: 'bye',
    qas: [
      {
        id: 1,
        question: '저를 기분좋게 만드는 건 ---이에요.',
        answer: '맛있는 음식',
      },
      {
        id: 2,
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

  // const data = getMypage({ userType: 'jff', userId: 'hello' })

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
            nickname={nicknames}
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
