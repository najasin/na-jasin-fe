'use client'

import CommonBtn from '@/components/commonBtn/CommonBtn'
import { ButtonStyle } from '@/types/enums/commonBtn.enum'

export default function Home() {
  return (
    <>
      <CommonBtn type="submit" style={ButtonStyle.DEACTIVE}>
        다음
      </CommonBtn>
      <CommonBtn
        type="submit"
        style={ButtonStyle.ACTIVE}
        onClick={() => {
          console.log('버튼 클릭')
        }}
      >
        다음
      </CommonBtn>
    </>
  )
}
