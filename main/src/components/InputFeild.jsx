import { useState } from 'react'
import styled from 'styled-components'
import media, { size } from '../utils/media'

const Container = styled.div`
  position: relative;
`

const PersonIcon = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1rem;
  width: 20px;
  height: 20px;
`

const Input = styled.input`
  width: 16rem;
  height: 2.8rem;
  border-radius: 8px;
  border: 1px solid var(--grayScale40);
  padding-left: 2.5rem;
  font-size: 16px;

  /* 포커스가 되었을 때 */
  &:focus {
    outline: 2px solid var(--brown40); /* 테두리 색상 변경 */
  }

  ${media(size.tablet)`
    width: 21rem;
  `}
`

function InputFeild({ onValueChange }) {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    const newValue = event.target.value
    setValue(newValue)
    onValueChange(newValue)
  }

  return (
    <Container>
      <PersonIcon src="../../icons/person.svg" alt="사람 아이콘" />
      <Input
        placeholder="이름을 입력하세요"
        value={value}
        onChange={handleChange}
      />
    </Container>
  )
}

export default InputFeild
