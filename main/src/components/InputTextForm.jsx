import { useState } from 'react'
import styled from 'styled-components'
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30rem;
  margin: 0.2rem;
`
const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
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
const SendButton = styled.button`
  width: 100%;
  height: 2.875rem;
  background-color: ${(props) =>
    props.hasText ? 'var(--brown40)' : 'var(--brown30)'};
  border-radius: 8px;
  margin-top: 0.5rem;
  font-size: 1rem;
  color: white;
`

//placeholder에 input의 입력 전 기본값,
//buttonText는 버튼에 들어갈 문구.
//action에 버튼 클릭시 동작 콜백
function InputTextForm({
  placeholder = '질문을 입력해주세요',
  buttonText = '답변 완료',
  action = () => console.log('action을 추가해주세요'),
}) {
  const [text, setText] = useState('')

  const handleInputChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    action(text)
    //action함수는 prop으로 전달받습니다. TextArea의 내용을 파라미터로 전달해 post/patch 할 수 있습니다.
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextArea
        onChange={handleInputChange}
        placeholder={placeholder}
      ></TextArea>
      <SendButton type="submit" hasText={text.trim().length > 0}>
        {buttonText}
      </SendButton>
    </StyledForm>
  )
}

export default InputTextForm
