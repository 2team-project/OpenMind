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
    margin-top: 10rem;
  `}
`

const Footer = styled.div`
  width: 100%;
  height: 239px;
  background-image: url('../../images/backgroundImg_main.png');
  background-size: contain; /* 이미지를 가득 채우도록 설정 */
  background-position: center;
  background-repeat: no-repeat;
  background-color: var(--grayScale20); /* 배경색 통일 */

  ${media(size.tablet)`
    height: 401px;
    background-image: url('../../images/backgroundImg_T.png');
  `}

  ${media(size.desktop)`
    height: 432px;
    background-image: url('../../images/backgroundImg_P.png');
  `}
`
function HomePage() {
  return (
    <Container>
      <Hero>
        <Logo />
        <ButtonDoQuestion />
      </Hero>
      <LoginForm />
      <Footer />
    </Container>
  )
}

export default HomePage
