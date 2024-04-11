import styled from 'styled-components'
import media, { size } from '../utils/media'

const TextArea = styled.textarea`
  width: 12.6rem;
  height: 11.6rem;
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

  ${media(size.tablet)`
    width: 34rem;
  `}

  ${media(size.desktop)`
    width: 35rem;
  `}
`
function InputTextArea() {
  return <TextArea placeholder="답변을 입력해주세요"></TextArea>
}

export default InputTextArea
