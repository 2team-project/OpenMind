import styled from 'styled-components'
import temporaryProfile from '/images/temporaryProfile.png'

const StyledDiv = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`
const StyledImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  margin: 0 0.2rem;
`

function ModalSecondline() {
  return (
    <StyledDiv>
      To.
      <StyledImg src={temporaryProfile} /> 아초는고양이
    </StyledDiv>
  )
}
export default ModalSecondline
