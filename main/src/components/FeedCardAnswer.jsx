import { useState } from 'react'
import styled from 'styled-components'
import InputTextForm from './InputTextForm'
import getElapsedTime from '../utils/getElapsedTime'

const StyledAnswer = styled.div`
  display: flex;
  flex-flow: row;
`
const StyledSubject = styled(FeedCardAnswer)`
  display: flex;
`
const StyledProfile = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
`
const StyledUserName = styled.div`
  font-size: 0.875rem;
`
const StyledDate = styled.span`
  color: var(--grayScale40);
  margin-left: 0.5rem;
  font-size: 0.875rem;
`
const RejectDiv = styled.div`
  color: var(--red50);
`

function SubjectProfile({ answer, subject }) {
  return (
    <>
      <StyledProfile
        src={subject ? subject.imageSource : '/path/to/default/image.jpg'}
      />
      <StyledUserName>
        {subject ? subject.name : 'No Name Provided'}
        <StyledDate>
          {subject ? getElapsedTime(subject.createdAt) : '2주전'}
        </StyledDate>
      </StyledUserName>
    </>
  )
}

// 미답변, 답변 작성 중, 답변 수정 중, 답변 완료, 답변 거절 5가지 케이스의 구현 필요
function FeedCardAnswer({ subject, answer, question }) {
  const [answerContent, setAnswerContent] = useState(null)
  const isAnswered = question.answer !== null
  let isRejected = false
  if (isAnswered) {
    isRejected = answer.isRejected
  }

  if (isRejected) {
    return (
      <>
        <SubjectProfile subject={subject} answer={answer} />
        <RejectDiv>답변 거절</RejectDiv>
      </>
    )
  } else {
    return (
      <StyledAnswer>
        <SubjectProfile subject={subject} answer={answer} />
        <div>
          {isAnswered ? (
            <div>{answerContent}</div>
          ) : (
            <InputTextForm
              placeholder="답변을 입력해주세요"
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
            />
          )}
        </div>
      </StyledAnswer>
    )
  }
}
export default FeedCardAnswer
