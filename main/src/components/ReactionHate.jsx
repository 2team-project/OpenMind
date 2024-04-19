import { useState } from 'react'
import * as S from './ReactionStyled'
import { ReactComponent as ThumbsDownSVG } from '../../public/icons/thumbsDown.svg'
import { addReactionToQuestion } from '../utils/apiUtils'

function ReactionHate({ question }) {
  const [isClicked, setIsClicked] = useState(false)
  const [dislike, setDislike] = useState(question.dislike)

  const handleClick = async () => {
    if (!isClicked) {
      try {
        const { dislike: updatedDislike } = await addReactionToQuestion(
          question.id,
          'dislike'
        ) // 리턴값으로 싫어요 갯수만 받기 (객체x)
        setIsClicked(true)
        setDislike(updatedDislike)
      } catch (error) {
        console.error('Error adding reaction:', error)
      }
    } else {
      alert('이미 싫어요 한 질문입니다!')
    }
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
