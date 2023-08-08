'use client'

import React, { useState } from 'react'

import Image from 'next/image'

import FormBox from '@/components/formBox/formBox'

export default function Home() {
  const [isActive, setIsActive] = useState(false)

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setIsActive(event.target.value.trim().length > 0)
  }

  return (
    <>
      <FormBox
        title="닉네임을 입력해주세요"
        isActive={isActive}
        buttonContents="다음"
      >
        <Image
          src="/images/defaultCharacter.png"
          width={200}
          height={240}
          alt="character"
        />
        <input onChange={handleInputChange} />
      </FormBox>
    </>
  )
}
