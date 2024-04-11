import styled from 'styled-components'

const URL = {
  LINK: '../../icons/link.svg',
  KAKAO: '../../icons/kakaotalk.svg',
  FACEBOOK: '../../icons/facebook.svg',
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
`
const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 200px;
  background-color: var(--brown40);
  background-image: url(${(props) => props.icon});
  background-size: 18px;
  background-position: center;
  background-repeat: no-repeat;
`

const ButtonKakao = styled(Button)`
  background-color: var(--yellow50);
`

const ButtonFacebook = styled(Button)`
  background-color: var(--blue50);
`

function ButtonShare() {
  return (
    <Container>
      <Button icon={URL.LINK} />
      <ButtonKakao icon={URL.KAKAO} />
      <ButtonFacebook icon={URL.FACEBOOK} />
    </Container>
  )
}

export default ButtonShare
