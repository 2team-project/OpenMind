import styled from 'styled-components'

const URL = {
  LINK: '../../icons/Link.png',
  KAKAO: '../../icons/kakaotalk.svg',
  FACEBOOK: '../../icons/facebook.png',
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
`
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 200px;
  background-color: var(--brown40);
`

const ButtonKakao = styled(Button)`
  background-color: var(--yellow50);
`

const ButtonFacebook = styled(Button)`
  background-color: var(--blue50);
`

const Icon = styled.img`
  width: 18px;
  height: 18px;
`
function ButtonShare() {
  return (
    <Container>
      <Button>
        <Icon src={URL.LINK} />
      </Button>
      <ButtonKakao>
        <Icon src={URL.KAKAO} />
      </ButtonKakao>
      <ButtonFacebook>
        <Icon src={URL.FACEBOOK} />
      </ButtonFacebook>
    </Container>
  )
}

export default ButtonShare
