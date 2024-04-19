import { useEffect, useState } from 'react'
import styled from 'styled-components'
import InputTextForm from './InputTextForm'
import getElapsedTime from '../utils/getElapsedTime'

const StyledAnswer = styled.div`
  display: flex;
  flex-flow: row;
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

// isAnswerPage : 현재 페이지가 AnswerPage인지를 받습니다. AnswerPage에서만 prop으로 내리면 됩니다.
// subject : 답변자 객체를 받습니다. 프로필 이미지, 이름 등을 표시하는데 쓰입니다.
// question : 질문 하나를 받습니다. 질문 목록 배열에서 map 메서드로 하나만 전달해주세요.
// editing : 현재의 FeedCard가 수정 중인지를 받습니다. AnswerPage에서만 prop으로 내리면 됩니다.
function FeedCardAnswer({
  isAnswerPage = false,
  subject,
  question,
  editing = false,
}) {
  const [answerContent, setAnswerContent] = useState(null)
  const [isRejected, setIsRejected] = useState(false)
  const [isAnswered, setIsAnswered] = useState(false)
  const [answer, setAnswer] = useState(null)

  useEffect(() => {
    setAnswer(question.answer ?? null)
    setIsAnswered(answer !== null)
    if (isAnswered) {
      setIsRejected(answer.isRejected)
    }
  }, [isAnswered, answer?.isRejected])

  // 답변을 한 경우
  // 답변을 수정중일 경우 인풋 창을 보여주고 수정 중인 버튼이 보입니다.
  if (isAnswered) {
    if (editing) {
      return (
        <>
          <SubjectProfile subject={subject} answer={answer} />
          <InputTextForm
            placeholder="답변을 입력해주세요"
            buttonText="수정 완료"
            value={answerContent}
            onChange={(e) => setAnswerContent(e.target.value)}
          />
        </>
      )
    }
    //답변 거절일 경우 인풋 창이나 답변 내용을 보여주지 않습니다.
    if (isRejected) {
      return (
        <>
          <SubjectProfile subject={subject} answer={answer} />
          <RejectDiv>답변 거절</RejectDiv>
        </>
      )
    }
    //그 외의 답변 완료일 경우 답변 내용을 보여줍니다.
    return (
      <>
        <SubjectProfile subject={subject} answer={answer} />
        {answer?.content}
      </>
    )
  } else {
    // 답변을 아직 하지 않은 경우
    // 답변자의 정보와 'post/{id}/answer'페이지는 인풋 폼을 보여줍니다.
    if (isAnswerPage) {
      return (
        <StyledAnswer>
          <SubjectProfile subject={subject} answer={answer} />
          <div>
            <InputTextForm
              placeholder="답변을 입력해주세요"
              buttonText="답변 완료"
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
            />
          </div>
        </StyledAnswer>
      )
    }
    // 답변을 하지 않았고, answer페이지가 아니라면 아무것도 보여주지 않습니다.
    return <></>
  }
}
export default FeedCardAnswer
