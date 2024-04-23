import styled from 'styled-components'
import LogoImg from '/images/logo.png'

const LogoImage = styled.img`
  width: 146px;
  height: 57px;
  cursor: pointer;
`

function ListLogo() {
  return <LogoImage src={LogoImg} alt="logo-image" />
}

export default ListLogo
