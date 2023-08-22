declare global {
  // Kakao 전역에서 접근 가능하도록
  interface Window {
    Kakao: any
  }
}

/**
 * @example 컴포넌트 예시 (id 값을 동일하게 가져야 합니다)
 * ```jsx
 * <button id="kakao-link-btn" type="button">
 * ```
 *
 * @example 함수 사용 예시
 * ```jsx
 * useEffect(() => {
 *  createKaKaoShareButton(imageUrl, shareUrl);
 * }, []);
 * ```
 */
const createKaKaoShareButton = (shareUrl: string, imageUrl?: string) => {
  if (window.Kakao) {
    const kakao = window.Kakao
    if (!kakao.isInitialized()) {
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY)
    }
    kakao.Link.createDefaultButton({
      container: '#kakao-link-btn',
      objectType: 'feed',
      content: {
        title: '나 자신',
        description: '#나자신 #카카오 #NaJasin',
        imageUrl: imageUrl || 'https://i.ibb.co/NjqLnt7/thumbnail-najasin.png',
        link: {
          //   mobileWebUrl: window.location.href,
          //   webUrl: window.location.href,
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      social: {
        likeCount: 9999,
        commentCount: 9999,
        sharedCount: 9999,
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            // mobileWebUrl: window.location.href,
            // webUrl: window.location.href,
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        {
          title: '앱으로 보기',
          link: {
            // mobileWebUrl: window.location.href,
            // webUrl: window.location.href,
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    })
  }
}

export default createKaKaoShareButton
