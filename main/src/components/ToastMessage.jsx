import React, { useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  bottom: 2rem; /* 하단 여백 조절 */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  z-index: 9999;
  transition: opacity 0.5s ease; /* 트랜지션 적용 */
  opacity: 1; /* 초기 상태는 보이도록 설정 */
`

function ToastMessage({ message }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // 메시지를 표시한 후 5초 후에 토스트 메시지를 숨김.
      clearTimeout(timer)
      document.getElementById('toastMessage').style.display = 'none'
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return <Container id="toastMessage">{message}</Container>
}

export default ToastMessage
