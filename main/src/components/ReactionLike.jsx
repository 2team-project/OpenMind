import { useState } from 'react'
import * as S from './ReactionStyled'
import { ReactComponent as ThumbsLikeSVG } from '../../public/icons/thumbsUp.svg'
import { addReactionToQuestion } from '../utils/apiUtils'

function ReactionLike({ question }) {
  const [isClicked, setIsClicked] = useState(false)
  const [like, setLike] = useState(question.like)

  const handleClick = async () => {
    if (!isClicked) {
      try {
        const { like: updatedLike } = await addReactionToQuestion(
          question.id,
          'like'
        ) // 리턴값으로 좋아요 갯수만 받기 (객체x)
        setIsClicked(true)
        setLike(updatedLike)
      } catch (error) {
        console.error('Error adding reaction:', error)
      }
    } else {
      alert('이미 좋아요 한 질문입니다!')
    }
  }

  return (
    <>
      <S.Button
        onClick={handleClick}
        $textColor={isClicked ? 'var(--blue50)' : 'var(--grayScale40)'}
      >
        <S.Icon
          $fillColor={isClicked ? 'var(--blue50)' : 'var(--grayScale40)'}
          as={ThumbsLikeSVG}
        />
        좋아요
        {like}
      </S.Button>
    </>
  )
}

export default ReactionLike
