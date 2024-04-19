import styled from 'styled-components'
import getElapsedTime from '../utils/getElapsedTime'

const StyledTime = styled.div`
  color: var(--grayScale40);
  font-size: 14px;
`
const StyledTitle = styled.div`
  color: var(--grayScale60);
  font-size: 1rem;
`
function FeedCardQuestion({ question }) {
  return (
    <>
      <StyledTime>{getElapsedTime(question.createdAt)}</StyledTime>
      <StyledTitle>{question.content}</StyledTitle>
    </>
  )
}

export default FeedCardQuestion
