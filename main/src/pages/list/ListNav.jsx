import { Link } from 'react-router-dom'
import ListLogo from '../../components/ListLogo'
import ButtonAnswer from '../../components/ButtonAnswer'
import * as S from '../../components/listStyled'

function ListNav() {
  return (
    <S.NavContainer>
      <S.NavDisplay>
        <Link to="/">
          <ListLogo />
        </Link>
        <Link to="/post/:id/answer">
          <ButtonAnswer />
        </Link>
      </S.NavDisplay>
    </S.NavContainer>
  )
}

export default ListNav
