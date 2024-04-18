import ListLogo from '../../components/ListLogo'
import ButtonAnswer from '../../components/ButtonAnswer'
import * as S from '../../components/listStyled'

function ListNav() {
  return (
    <S.NavContainer>
      <S.NavDisplay>
        <ListLogo />
        <ButtonAnswer />
      </S.NavDisplay>
    </S.NavContainer>
  )
}

export default ListNav
