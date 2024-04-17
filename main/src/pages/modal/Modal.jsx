import styled from 'styled-components'
import ModalFirstLine from './components/ModalFirstLine'
import ModalSecondLine from './components/ModalSecondLine'
import InputTextForm from '../../components/InputTextForm'
import media, { size } from '/src/utils/media'
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
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 70%;
  padding: 1.35rem 1.5rem;
  border-radius: 24px;

  ${media(size.tablet)`
    width: 38.25rem;
    height: 28.375rem;
    margin-bottom: 2rem;
  `}
`
const Margin = styled.div`
  height: 1.5rem;
`

function Modal({ onClose }) {
  return (
    <ModalPage>
      <ModalBackground onClick={onClose}></ModalBackground>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalFirstLine onClose={onClose} />
        <Margin />
        <ModalSecondLine />
        <Margin />
        <InputTextForm
          placeholder={'질문을 입력해주세요'}
          buttonText="답변 완료"
        />
      </ModalBox>
    </ModalPage>
  )
}
export default Modal
