import { useState } from 'react'
import * as S from './ReactionStyled'
import { ReactComponent as ThumbsDownSVG } from '../../public/icons/thumbsDown.svg'

function ReactionHate() {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked((prevState) => !prevState)
  }

  return (
    <S.Button
      onClick={handleClick}
      $textColor={isClicked ? 'black' : 'var(--grayScale40)'}
    >
      <S.Icon
        $fillColor={isClicked ? 'black' : 'var(--grayScale40)'}
        as={ThumbsDownSVG}
      />
      싫어요
    </S.Button>
  )
}

export default ReactionHate
