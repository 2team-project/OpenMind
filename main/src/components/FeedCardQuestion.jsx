import styled from 'styled-components'

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
      <StyledTime>{new Date(question.createdAt).toLocaleDateString()}</StyledTime>
      <StyledTitle>{question.content}</StyledTitle>
    </>
  )
}

export default FeedCardQuestion
