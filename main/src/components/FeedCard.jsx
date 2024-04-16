import { useState, useRef } from 'react'
import styled from 'styled-components'
import FeedCardQuestion from './FeedCardQuestion'
import FeedCardAnswer from './FeedCardAnswer'
import kebabImg from '/public/icons/more.svg'
import Badge from './Badge'

const StyledDiv = styled.div`
  padding: 1.5rem;
  max-width: 684px;
  margin: 0 auto;
  border-radius: 1rem;
  box-shadow: 0 4px 4px var(--grayScale40); //임시값임. shadow 2pt 적용해야함.
`

const StyledMenubar = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledReactionLine = styled.div`
  hr: {
    border: none;
    height: 2px;
    background-color: #333;
    margin: 1.25rem;
  }
`
const StyledKebabButton = styled.button`
  background: url(${kebabImg}) no-repeat center;
  background-size: contain;
  width: 24px;
  height: 24px;
`
const Margin = styled.div`
  height: 2rem;
`

function FeedCardLayout() {
  const [isAnswered, setIsAnswerd] = useState(true)
  const [isKebabOpen, setIsKebabOpen] = useState(false)

  const handleKebabToggle = () => {
    setIsKebabOpen((prevValue) => !prevValue)
  }
  const optionsRef = useRef(null)

  const handleKebabClose = (e) => {
    if (!optionsRef.current || !optionsRef.current.contains(e.relatedTarget)) {
      setIsKebabOpen(false)
    }
  }

  return (
    <StyledDiv>
      <StyledMenubar>
        <Badge isAnswered={isAnswered} />
        <StyledKebabButton
          onClick={handleKebabToggle}
          onBlur={handleKebabClose}
        />
        {isKebabOpen && <Dropdown />}
      </StyledMenubar>
      <Margin />
      <FeedCardQuestion />
      <Margin />
      <FeedCardAnswer />
      <Margin />
      <StyledReactionLine>
        <hr />
        <div>좋아요 싫어요</div>
      </StyledReactionLine>
    </StyledDiv>
  )
}

export default FeedCardLayout
