import styled, { css } from 'styled-components'

// 조건부 스타일링을 담당하는 함수
const getBadgeStyles = (props) => {
  const { $isAnswered } = props
  return css`
    color: ${$isAnswered ? 'var(--brown40)' : 'var(--grayScale40)'};
    border-color: ${$isAnswered ? 'var(--brown40)' : 'var(--grayScale40)'};
  `
}

const StyledDiv = styled.div`
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  font-size: 0.875rem;
  line-height: 1rem;
  padding: 4px 12px;

  ${getBadgeStyles}// 조건부 스타일을 적용하는 함수 호출
`

function Badge({ $isAnswered = false }) {
  return (
    <StyledDiv $isAnswered={$isAnswered}>
      {$isAnswered ? '답변 완료' : '미답변'}
    </StyledDiv>
  )
}

export default Badge
