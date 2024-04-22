import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import media, { size } from '../utils/media'
import FeedCardQuestion from './FeedCardQuestion'
import FeedCardAnswer from './FeedCardAnswer'
import Badge from './Badge'
import ReactionLike from './ReactionLike'
import ReactionHate from './ReactionHate'
import kebabImg from '/public/icons/more.svg'
import { getAnswer } from '../utils/apiUtils'
import DropdownForAnswer from '../pages/answer/DropDownForAnswer'

export const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  padding: 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  align-self: stretch;
  border-radius: 1rem;
  background: var(--Grayscale-10, #fff);
  box-shadow: 0px 4px 4px 0px rgba(140, 140, 140, 0.25);
  ${media(size.tablet)`
    padding: 2rem;
    gap: 2rem;
  `}
`

const StyledMenubar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`

const StyledReactionLine = styled.div`
  display: flex;
  gap: 2rem;
  border-top: 1px solid var(--grayScale30);
  padding-top: 1rem;
  width: 100%;
`

// subject : 답변자의 정보/ getId의 결과값을 넣어주세요.
// question : 질문 목록 배열의 한 질문(객체)만 넣어주세요.
function FeedCard({ subject, question }) {
  const [editing, setEditing] = useState(false)
  const location = useLocation()
  const pathname = location.pathname
  const postId = pathname.split('/post/')[1]
  const isAnswerPage =
    pathname.startsWith('/post/') && postId && postId.includes('/answer')

  const isAnswered = question.answer !== null
  const answer = question.answer ?? null

  const handleEdit = () => {
    setEditing(true)
    console.log('수정 동작')
  }

  const handleReject = () => {
    console.log('거절 동작')
  }

  return (
    <StyledDiv>
      <StyledMenubar>
        <Badge isAnswered={isAnswered} />
        {isAnswerPage && (
          <DropdownForAnswer onEdit={handleEdit} onReject={handleReject} />
        )}
      </StyledMenubar>
      <FeedCardQuestion question={question} />
      <FeedCardAnswer
        isAnswerPage={isAnswerPage}
        subject={subject}
        question={question}
        editing={editing}
        setEditing={setEditing}
      />
      <StyledReactionLine>
        <ReactionLike question={question} />
        <ReactionHate question={question} />
      </StyledReactionLine>
    </StyledDiv>
  )
}

export default FeedCard
