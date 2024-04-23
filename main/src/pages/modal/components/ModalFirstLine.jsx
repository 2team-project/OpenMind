import close from '/icons/close.svg'
import messages from '/icons/messages.svg'
import styled from 'styled-components'
import media, { size } from '/src/utils/media'

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledTitle = styled.div`
  flex-grow: 1;
  font-size: 1.4rem;

  ${media(330)` // 글씨 겹침 문제 해결용.
    font-size: 1.5rem;
  `}
`
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-image: url(${close});
  background-repeat: no-repeat;
  background-position: center;
  width: 28px;
  height: 28px;
`

function ModalFirstline({ onClose }) {
  return (
    <StyledDiv>
      <img src={messages} />
      <StyledTitle>질문을 작성하세요</StyledTitle>
      <CloseButton className={'closeButton'} onClick={onClose}></CloseButton>
    </StyledDiv>
  )
}
export default ModalFirstline
