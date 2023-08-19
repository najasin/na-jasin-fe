import ContentWrapper from '@/components/contentsWrapper/contentWrapper'
import Fab from '@/components/fab/fab'
import LinkBtn from '@/components/linkBtn/linkBtn'
import ManualBox from '@/components/manualBox/manualBox'
import ProfileBox from '@/components/profileBox/profileBox'
import SimpleLayout from '@/components/simpleLayout/simpleLayout'

import { getMypage } from '@/api/axios/requestHandler/mypage/get.apis'

const getMyPageData = async (userType: string, userId: string) => {
  try {
    const data = await getMypage({ userType, userId })
    return data
  } catch (error) {
    return error as Error
  }
}

export default async function MyPage() {
  const data = await getMyPageData('JFF', 'example')
  console.log(data)

  if (data instanceof Error) {
    console.log(data)
  } else {
    const {
      nickname,
      baseImage,
      characterItems,
      myManualQAPair,
      othersManualQAPairs,
      originalKeywordPercents,
      otherKeywordPercents,
    } = data

    const characterData = {
      baseImage,
      characterItems,
    }
    return (
      <>
        <SimpleLayout
          title={`${nickname} 사용 설명서`}
          btnComponent={<LinkBtn />}
          margin={50}
        >
          <ContentWrapper>
            <ProfileBox
              myKeywordPercents={originalKeywordPercents}
              othersKeywordPercents={otherKeywordPercents}
              data={characterData}
              nickname={nickname}
            />
            <ManualBox
              myDatas={myManualQAPair}
              othersDatas={othersManualQAPairs}
            />
          </ContentWrapper>
        </SimpleLayout>
        <Fab />
      </>
    )
  }
}
