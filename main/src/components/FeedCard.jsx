import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import FeedCardQuestion from './FeedCardQuestion'
import FeedCardAnswer from './FeedCardAnswer'
import Badge from './Badge'
import ReactionLike from './ReactionLike'
import ReactionHate from './ReactionHate'
import kebabImg from '/public/icons/more.svg'
import { getAnswer } from '../utils/apiUtils'

const StyledDiv = styled.div`
  padding: 1.5rem;
  max-width: 684px;
  margin: 0 auto;
  border-radius: 1rem;
  box-shadow: 0 4px 4px var(--grayScale40); // 임시값임. shadow 2pt 적용해야함.
`

const StyledMenubar = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledReactionLine = styled.div`
  display: flex;
  gap: 2rem;
  border-top: 1px solid var(--grayScale30);
  padding-top: 1rem;
`
const StyledKebabButton = styled.button`
  background: url(${kebabImg}) no-repeat center;
  background-size: contain;
  width: 24px;
  height: 24px;
`

const Margin = styled.div`
  height: 2rem;
`

// subject : 답변자의 정보/ getId의 결과값을 넣어주세요.
// question : 질문 목록 배열의 한 질문(객체)만 넣어주세요.
function FeedCard({ subject, question }) {
  const [isKebabOpen, setIsKebabOpen] = useState(false)
  const optionsRef = useRef(null)

  const location = useLocation()
  const pathname = location.pathname
  const postId = pathname.split('/post/')[1]
  const isAnswerPage =
    pathname.startsWith('/post/') && postId && postId.includes('/answer')

  const handleKebabToggle = () => {
    setIsKebabOpen((prev) => !prev)
  }

  const handleKebabClose = (e) => {
    if (!optionsRef.current.contains(e.relatedTarget)) {
      setIsKebabOpen(false)
    }
  }
  const isAnswered = question.answer !== null
  const answer = question.answer ?? null

  return (
    <StyledDiv>
      <StyledMenubar>
        {/* 답변상태를 표시합니다. */}
        <Badge isAnswered={isAnswered} />

        {/* 케밥버튼은 AnswerPage에서만 렌더링됩니다. */}
        {isAnswerPage && (
          <StyledKebabButton
            onClick={handleKebabToggle}
            onBlur={handleKebabClose}
          />
        )}
        {/* Dropdown 현재 미구현입니다. 여기에서 버튼들의 동작 콜백들 prop으로 내리고 editing상태를 FeedCardAnswer에 업데이트해야합니다. */}
        {isKebabOpen && <Dropdown />}
      </StyledMenubar>
      <Margin />

      {/* 질문 내용과 작성 시간이 표시됩니다. */}
      <FeedCardQuestion question={question} />
      <Margin />

      {/* 답변 내용이 표시됩니다. */}
      <FeedCardAnswer
        isAnswerPage={isAnswerPage}
        subject={subject}
        question={question}
        editing={false}
        // editing값은 state화 해서 사용해야합니다. 케밥버튼 기능 추가시 변경하겠습니다.
      />
      <Margin />

      {/* 좋아요와 싫어요 버튼이 표시됩니다. */}
      <StyledReactionLine>
        <ReactionLike question={question} />
        <ReactionHate question={question} />
      </StyledReactionLine>
    </StyledDiv>
  )
}

export default FeedCard
