import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 1.25rem;
`
const StyledImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  margin: 0 0.25rem;
  border-radius: 9999px;
`

function ModalSecondline({ subject }) {
  return (
    <StyledDiv>
      To.
      <StyledImg src={subject.imageSource} /> {subject.name}
    </StyledDiv>
  )
}
export default ModalSecondline
