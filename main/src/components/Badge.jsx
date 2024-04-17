import styled from 'styled-components'

const StyledDiv = styled.div`
  color: ${(props) =>
    props.isAnswered ? 'var(--brown40)' : 'var(--grayScale40)'};
  border-color: ${(props) =>
    props.isAnswered ? 'var(--brown40)' : 'var(--grayScale40)'};
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  font-size: 0.875rem;
  line-height: 1rem;
  padding: 4px 12px;
`

function Badge({ isAnswered = false }) {
  return (
    <StyledDiv isAnswered={isAnswered}>
      {isAnswered ? '답변 완료' : '미답변'}
    </StyledDiv>
  )
}

export default Badge
