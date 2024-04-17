import styled from 'styled-components'

const StyledTime = styled.div`
  color: var(--grayScale40);
  font-size: 14px;
`
const StyledTitle = styled.div`
  color: var(--grayScale60);
  font-size: 1rem;
`
function FeedCardQuestion() {
  return (
    <>
      <StyledTime>질문 · 2주전</StyledTime>
      <StyledTitle> 좋아하는 동물은?</StyledTitle>
    </>
  )
}

export default FeedCardQuestion
