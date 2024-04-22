import styled from 'styled-components'
import ModalFirstLine from './components/ModalFirstLine'
import ModalSecondLine from './components/ModalSecondLine'
import InputTextForm from '../../components/InputTextForm'
import media, { size } from '/src/utils/media'
import { createQuestion } from '../../utils/apiUtils'
import { useState } from 'react'
const ModalPage = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`
const ModalBox = styled.div`
  background-color: white;
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 70%;
  padding: 1.35rem 1.5rem;
  border-radius: 24px;

  ${media(size.tablet)`
    width: 38.25rem;
    height: 28.375rem;
  `}
`
const Margin = styled.div`
  height: 1.5rem;
`

function Modal({ onClose, subject, updateQuestions }) {
  const [loading, setLoading] = useState(false)

  async function onSubmit(text) {
    setLoading(true)
    try {
      await createQuestion(subject?.id, text)
      updateQuestions() // 질문 보내고 나서 questions 업데이트 요청
      onClose() // 모달 닫기
    } catch (error) {
      console.error('질문 보내기 실패:', error)
      // 오류 처리
    } finally {
      setLoading(false)
    }
  }

  return (
    <ModalPage>
      <ModalBackground onClick={onClose}></ModalBackground>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalFirstLine onClose={onClose} />
        <Margin />
        <ModalSecondLine subject={subject} />
        <Margin />
        <InputTextForm
          placeholder="질문을 입력해주세요"
          buttonText={loading ? '전송 중...' : '질문 보내기'}
          onSubmit={onSubmit}
          disabled={loading}
        />
      </ModalBox>
    </ModalPage>
  )
}
export default Modal
