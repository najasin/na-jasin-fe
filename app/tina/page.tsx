'use client'

import CommonBtn from '@/components/commonBtn/commonBtn'
import FormBox from '@/components/formBox/formBox'
import LayoutBtn from '@/components/simpleLayout/layoutBtn'
import SimpleLayout from '@/components/simpleLayout/simpleLayout'

export default function Home() {
  return (
    <>
      <SimpleLayout
        title="나 사용 설명서"
        margin={25}
        btnComponent={<LayoutBtn>For Dev도 사용해볼까?</LayoutBtn>}
      >
        <FormBox
          title="닉네임을 입력해주세요"
          showBack={true}
          onBackClick={() => {
            console.log('clicked')
          }}
        >
          <div>컨텐츠</div>
          <CommonBtn>버튼</CommonBtn>
        </FormBox>
      </SimpleLayout>
    </>
  )
}
