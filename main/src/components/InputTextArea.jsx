import styled from 'styled-components'
import media, { size } from '../utils/media'
const Container = styled.div`
  display: flex;
  align-items: center;
`

const TextArea = styled.textarea`
  width: 100%;
  background-color: var(--grayScale20);
  resize: none;
  border-radius: 8px;
  border: none;
  padding: 1rem;
  font-size: 1rem;

  /* 포커스가 되었을 때 */
  &:focus {
    outline: 2px solid var(--brown40); /* 테두리 색상 변경 */
  }
`
function InputTextArea({ placeholder = 'placeholder를 prop으로 내려주세요' }) {
  return (
    <Container>
      <TextArea placeholder={placeholder}></TextArea>
    </Container>
  )
}

export default InputTextArea
