import { cookies } from 'next/headers'

import ContentWrapper from '@/components/contentsWrapper/contentWrapper'
import Fab from '@/components/fab/fab'
import LinkBtn from '@/components/linkBtn/linkBtn'
import ManualBox from '@/components/manualBox/manualBox'
import ProfileBox from '@/components/profileBox/profileBox'
import SimpleLayout from '@/components/simpleLayout/simpleLayout'

import { getMypage } from '@/api/axios/requestHandler/mypage/get.apis'

const getMyPageData = async (
  userType: string,
  userId: string,
  token: string | undefined,
) => {
  try {
    const data = await getMypage({ userType, userId, token })
    return data
  } catch (error) {
    return error as Error
  }
}

export default async function MyPage({
  params,
  searchParams,
}: {
  params: { [key: string]: string }
  searchParams: { [key: string]: string }
}) {
  const token = cookies().get('act')
  const data = await getMyPageData(
    params.userType,
    searchParams.userId,
    token?.value,
  )

  if (data instanceof Error) {
    console.log(data)
  } else {
    const {
      nickname,
      baseImage,
      characterItems,
      myManualQAPair,
      othersManualQAPairs,
      originKeywordPercents,
      otherKeywordPercents,
      isOwner,
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
              myKeywordPercents={originKeywordPercents}
              othersKeywordPercents={otherKeywordPercents}
              data={characterData}
              nickname={nickname}
              isOwner={isOwner}
            />
            <ManualBox
              myDatas={myManualQAPair}
              othersDatas={othersManualQAPairs}
              isOwner={isOwner}
            />
          </ContentWrapper>
        </SimpleLayout>
        <Fab />
      </>
    )
  }
}
