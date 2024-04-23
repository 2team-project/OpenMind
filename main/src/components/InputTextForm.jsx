import { useState } from 'react'
import styled from 'styled-components'
import { isRequired } from '../utils/validationUtils'
import media, { size } from '../utils/media'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 0.5rem;
  align-self: stretch;
`

const InputArea = styled.textarea`
  display: flex;
  height: 8.75rem;
  width: 100%;
  padding: 1rem;
  align-items: flex-start;
  gap: 0.625rem;
  flex-shrink: 0;
  border: none;
  resize: none;
  background: var(--Grayscale-20, #f9f9f9);
  color: var(--Grayscale-40, #818181);
  &:focus {
    color: var(--Grayscale-60, #000);
    border: 1px solid var(--Brown-40, #542f1a);
  }
  ${media(size.tablet)`
    height: 11.625rem;
    justify-content: center;
    align-items: center;
    align-self: stretch;
  `}
`

const SendButton = styled.button`
  display: flex;
  width: 100%;
  height: 2.875rem;
  padding: 0.75rem 1.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  align-self: stretch;
  border-radius: 0.5rem;
  background: var(--Brown-30, #c7bbb5);
  color: var(--Grayscale-10, #fff);
  font-size: 1rem;
  line-height: 1.375rem;
  ${media(size.tablet)`
    gap: 0.5rem;
  `}
`

//placeholder에 input의 입력 전 기본값,
//buttonText는 버튼에 들어갈 문구.
//onSubmit함수는 prop으로 전달받습니다. ex) onSubmit={buttonOnClickHandler}
//const buttonOnClickHandler = (text) => { 여기서 text를 사용할 수 있습니다. }
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
  }
  const buttonColor = isRequired(text) ? 'var(--brown40)' : 'var(--brown30)'

  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputArea
        onChange={handleInputChange}
        placeholder={placeholder}
        value={text}
      ></InputArea>
      <SendButton type="submit" style={{ backgroundColor: buttonColor }}>
        {buttonText}
      </SendButton>
    </StyledForm>
  )
}

export default InputTextForm
