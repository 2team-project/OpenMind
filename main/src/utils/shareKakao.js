import REACT_APP_SHARE_KAKAO_LINK_KEY from '../kakaoKey.js'

export const shareKakao = (route, thisURL, title) => {
  // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
  if (window.Kakao) {
    const kakao = window.Kakao
    if (!kakao.isInitialized()) {
      kakao.init(REACT_APP_SHARE_KAKAO_LINK_KEY) // 카카오에서 제공받은 javascript key를 넣어줌
    }

    kakao.Link.sendDefault({
      objectType: 'feed', // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
      content: {
        title: title, // 인자값으로 받은 title
        description: '하고싶은 말을 담아봐요.', // 인자값으로 받은 title
        imageUrl: '', // 썸네일 이미지
        link: {
          mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
          webUrl: route,
        },
      },
      buttons: [
        {
          title: '질문하러가기',
          link: {
            mobileWebUrl: thisURL,
            webUrl: thisURL,
          },
        },
      ],
    })
  }
}
