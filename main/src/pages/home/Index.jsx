import styled from 'styled-components'
import ButtonDoQuestion from './ButtonDoQuestion'
import media, { size } from '../../utils/media'
import LoginForm from './LoginForm'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--grayScale20);
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const Hero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

const Logo = styled.a`
  background-image: url('../../icons/logo.svg');
  width: 15.5rem;
  height: 6rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-top: 5rem;

  ${media(size.tablet)`
    width: 28rem;
    height: 11.25rem;
  `}
`

const Footer = styled.div`
  width: 100%;
  height: 329px;
  background-image: url('../../icons/backgroundImg.svg');
  background-size: contain; /* 이미지를 가득 채우도록 설정 */
  background-position: center;
  background-repeat: no-repeat;

  ${media(size.tablet)`
    height: 401px;
  `}
`

const BackgroundImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover; /* 이미지를 비율을 유지하며 채우도록 설정 */
`
function Index() {
  return (
    <Container>
      <Hero>
        <Logo />
        <ButtonDoQuestion />
      </Hero>
      <LoginForm />
      <Footer>
        {/* <BackgroundImg src="../../icons/backgroundImg.svg" /> */}
      </Footer>
    </Container>
  )
}

export default Index
