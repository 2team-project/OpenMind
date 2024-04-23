import { Link } from 'react-router-dom'
import ListLogo from '../list/ListLogo'
import ButtonAnswer from '../../components/ButtonAnswer'
import * as S from '../../components/listStyled'

import { useEffect, useState } from 'react'

function ListNav() {
  const [storedId, setStoredId] = useState(null)
  //로컬 스토리지에 저장된 id 받아오기
  useEffect(() => {
    const storedId = localStorage.getItem('postId')
    setStoredId(storedId)
  }, [])

  return (
    <S.NavContainer>
      <S.NavDisplay>
        <Link to="/">
          <ListLogo />
        </Link>
        {storedId ? (
          <Link to={`/post/${storedId}/answer`}>
            <ButtonAnswer />
          </Link>
        ) : (
          <Link to="/">
            <ButtonAnswer />
          </Link>
        )}
      </S.NavDisplay>
    </S.NavContainer>
  )
}

export default ListNav
