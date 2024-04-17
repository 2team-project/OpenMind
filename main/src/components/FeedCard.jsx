import { useState, useRef } from 'react'
import styled from 'styled-components'
import FeedCardQuestion from './FeedCardQuestion'
import FeedCardAnswer from './FeedCardAnswer'
import kebabImg from '/public/icons/more.svg'
import Badge from './Badge'
import ReactionLike from './ReactionLike'
import ReactionHate from './ReactionHate'

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
  display: flex;
  gap: 2rem;
  border-top: 1px solid var(--grayScale30);
  padding-top: 1rem;
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
        <ReactionLike />
        <ReactionHate />
      </StyledReactionLine>
    </StyledDiv>
  )
}

export default FeedCardLayout
