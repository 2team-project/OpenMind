import styled from 'styled-components'
import getElapsedTime from '../utils/getElapsedTime'
import media, { size } from '../utils/media'

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  flex: 1 0 0;
`

const StyledTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--grayScale40);
  font-size: 14px;
`

const StyledTitle = styled.div`
  align-self: stretch;
  color: var(--grayScale60);
  font-size: 1rem;
  line-height: 1.375rem;
  ${media(size.media)`
    font-size: 1.125rem;
    line-height: 1.5rem;
  `}
`

function FeedCardQuestion({ question }) {
  return (
    <QuestionContainer>
      <StyledTime>질문 · {getElapsedTime(question.createdAt)}</StyledTime>
      <StyledTitle>{question.content}</StyledTitle>
    </QuestionContainer>
  )
}

export default FeedCardQuestion
