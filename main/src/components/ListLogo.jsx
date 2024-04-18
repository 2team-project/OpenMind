import styled from 'styled-components'
import LogoImg from '../../public/images/logo.png'

const LogoImage = styled.img`
  width: 146px;
  height: 57px;
  cursor: pointer;
`

function ListLogo() {
  const handleImgClick = () => {
    window.location.href = '/src/pages/home/HomePage'
  }
  return <LogoImage src={LogoImg} alt="logo-image" onClick={handleImgClick} />
}

export default ListLogo
