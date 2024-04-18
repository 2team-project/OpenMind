import { useState } from 'react'
import * as S from './ReactionStyled'
import { ReactComponent as ThumbsLikeSVG } from '../../public/icons/thumbsUp.svg'

function ReactionLike() {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked((prevState) => !prevState)
  }

  return (
    <S.Button
      onClick={handleClick}
      $textColor={isClicked ? 'var(--blue50)' : 'var(--grayScale40)'}
    >
      <S.Icon
        $fillColor={isClicked ? 'var(--blue50)' : 'var(--grayScale40)'}
        as={ThumbsLikeSVG}
      />
      좋아요
    </S.Button>
  )
}

export default ReactionLike
