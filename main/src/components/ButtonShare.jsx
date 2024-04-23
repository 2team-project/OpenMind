import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { shareKakao } from '../utils/shareKakao'

const URL = {
  LINK: '../../icons/link.svg',
  KAKAO: '../../icons/kakaotalk.svg',
  FACEBOOK: '../../icons/facebook.svg',
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  width: 9rem;
  height: 2.5rem;
`
const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 200px;
  background-color: var(--brown40);
  background-image: url(${(props) => props.icon});
  background-size: 18px;
  background-position: center;
  background-repeat: no-repeat;
`

const ButtonKakao = styled(Button)`
  background-color: var(--yellow50);
`

const ButtonFacebook = styled(Button)`
  background-color: var(--blue50);
`

function ButtonShare({ setToastMessage }) {
  const thisURL = window.location.href
  const openMindURL = 'https://openmind5-2.netlify.app/'
  const title = '오픈마인드'

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js' // 카카오톡 SDK
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script) // return으로 제거해주기
    }
  }, [])

  const hanldeLinkShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setToastMessage('URL을 복사했습니다.')
  }

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(thisURL)}`,
      '_blank'
    )
  }

  return (
    <Container>
      <Button onClick={hanldeLinkShare} icon={URL.LINK} />
      <ButtonKakao
        onClick={() => shareKakao(openMindURL, thisURL, title)}
        icon={URL.KAKAO}
      />
      <ButtonFacebook onClick={handleFacebookShare} icon={URL.FACEBOOK} />
    </Container>
  )
}

export default ButtonShare
