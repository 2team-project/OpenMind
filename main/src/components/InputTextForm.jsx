import { useState } from 'react'
import styled from 'styled-components'
import { isRequired } from '../utils/validationUtils'
import media, { size } from '../utils/media'
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1; /* 남은 공간을 모두 차지 */
`
const TextArea = styled.textarea`
  flex-grow: 1;
  min-height: 11.25rem;
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
   font-size: 1.25rem `}
`
const SendButton = styled.button`
  width: 100%;
  height: 2.875rem;
  border-radius: 8px;
  margin-top: 0.5rem;
  font-size: 1rem;
  color: white;
`

//placeholder에 input의 입력 전 기본값,
//buttonText는 버튼에 들어갈 문구.
//onSubmit은 text를 받아서 부모요소에서 실행될 함수
function InputTextForm({
  placeholder = '질문을 입력해주세요',
  buttonText = '답변 완료',
  onSubmit,
}) {
  const [text, setText] = useState('')

  const handleInputChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isRequired(text)) {
      onSubmit(text)
    } else {
      console.warn('답변이 비어있습니다')
    }
    //onSubmit함수는 prop으로 전달받습니다. onSubmit={(text) => {answerButtonOnClick(text)}}
    //answerButtonOnClick 이 핸들러에서 text를 전달받아 사용할 수 있습니다.
  }
  const buttonColor = isRequired(text) ? 'var(--brown40)' : 'var(--brown30)'

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextArea
        onChange={handleInputChange}
        placeholder={placeholder}
        value={text}
      ></TextArea>
      <SendButton type="submit" style={{ backgroundColor: buttonColor }}>
        {buttonText}
      </SendButton>
    </StyledForm>
  )
}

export default InputTextForm
