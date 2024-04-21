import InputFeild from '../../components/InputFeild'
import ButtonQuestion from '../../components/ButtonQuestion'
import styled from 'styled-components'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.5rem;
  margin-top: 1.5rem;
  gap: 1rem;
  border-radius: 1rem;
`
function LoginForm() {
  const [inputValue, setInputValue] = useState(``)
  const navigate = useNavigate()

  const handleInputValueChange = (newValue) => {
    setInputValue(newValue)
  }

  const handleClick = async () => {
    const BASE_URL = 'https://openmind-api.vercel.app/5-2/'

    try {
      const response = await fetch(`${BASE_URL}subjects/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: inputValue }),
      })

      if (!response.ok) {
        throw new Error('API 요청이 실패했습니다.')
      }
      const data = await response.json()
      navigate(`/post/${data.id}/answer`)
    } catch (error) {
      console.error('API 오류:', error)
    }
  }

  return (
    <Container>
      <InputFeild onValueChange={handleInputValueChange} />
      <ButtonQuestion onClick={handleClick} />
    </Container>
  )
}

export default LoginForm
