import { useEffect, useState } from 'react'
import styled from 'styled-components'
import InputTextForm from './InputTextForm'
import getElapsedTime from '../utils/getElapsedTime'
import media, { size } from '../utils/media'
import { createAnswer, updateAnswer } from '../utils/apiUtils'

const AnswerContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  align-self: stretch;
  width: 15.4375rem;
  ${media(size.tablet)`
    width: 38rem;
  `}
`
const StyledAnswer = styled.div`
  display: flex;
  flex-flow: row;
`
const StyledProfile = styled.img`
  display: flex;
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  border-radius: 999px;
  ${media(size.tablet)`
   width: 3rem;
   height: 3rem; 
  `}
`
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 0.25rem;
  flex: 1 0 0;
`
const StyledUserName = styled.div`
  color: var(--Grayscale-60, #000);
  display: flex;
  align-items: center;
  font-family: Actor;
  font-size: 0.875rem;
  line-height: 1.125rem;
  ${media(size.tablet)`
    font-size: 1.125rem;
    line-height: 1.5rem;
  `}
`
const StyledDate = styled.span`
  color: var(--grayScale40);
  margin-left: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.125rem;
  ${media(size.tablet)`
    font-size: 0.875rem;
  `}
`
const RejectDiv = styled.div`
  color: var(--red50);
`

//여러 상태에서 공통적으로 나오는 subject의 프로필이미지, 이름, 답변생성시간을 표시하는 컴포넌트입니다.
//답변 생성시간은 답변이 작성된 시간이며, 답변이 없을 경우 보이지 않습니다.
function SubjectProfile({
  subject,
  showCreatedTime,
  answerCreatedTime,
  children,
}) {
  return (
    <AnswerContainer>
      <StyledProfile
        src={subject ? subject.imageSource : '/images/temporaryProfile.png'}
      />
      <StyledDiv>
        <StyledUserName>
          {subject ? subject.name : 'No Name Provided'}
          <StyledDate>
            {showCreatedTime ? getElapsedTime(answerCreatedTime) : ''}
          </StyledDate>
        </StyledUserName>
        {children}
      </StyledDiv>
    </AnswerContainer>
  )
}

// subject : 답변자 객체를 받습니다. 프로필 이미지, 이름 등을 표시하는데 쓰입니다.
// question : 질문 하나를 받습니다. 질문 목록 배열에서 map 메서드로 하나만 전달해주세요.
// isAnswerPage : 현재 페이지가 AnswerPage인지를 받습니다. AnswerPage에서만 prop으로 내리면 됩니다.
// editing : 현재의 FeedCard가 수정 중인지를 받습니다. AnswerPage에서만 prop으로 내리면 됩니다.
function FeedCardAnswer({
  subject,
  question,
  isAnswerPage = false,
  editing = false,
  setNeedRefresh,
}) {
  const [isRejected, setIsRejected] = useState(false)
  const [isAnswered, setIsAnswered] = useState(false)
  const [answer, setAnswer] = useState(null)
  const [answerCreatedTime, setAnswerCreatedTime] = useState('')

  const showCreatedTime = !editing || !isAnswered

  useEffect(() => {
    setAnswer(question.answer ?? null)
    setIsAnswered(answer !== null)
    if (isAnswered) {
      setIsRejected(answer?.isRejected)
      setAnswerCreatedTime(question?.answer?.createdAt)
    }
  }, [isAnswered, answer?.isRejected])

  //수정하기 버튼 동작
  const editButtonOnClick = async (content) => {
    console.log(content)
    await updateAnswer(answer.id, content, false)
    setNeedRefresh((prevValue) => prevValue + 1)
  }
  //답변하기 버튼 동작
  const answerButtonOnClick = async (content) => {
    console.log(content)
    await createAnswer(question.id, content, false)
    setNeedRefresh((prevValue) => prevValue + 1)
  }

  // 답변을 한 경우
  // 답변을 수정중일 경우 인풋 창을 보여주고 수정 중인 버튼이 보입니다.
  if (isAnswered) {
    if (editing) {
      return (
        <StyledAnswer>
          <SubjectProfile
            subject={subject}
            showCreatedTime={showCreatedTime}
            answerCreatedTime={answerCreatedTime}
          >
            <InputTextForm
              placeholder="답변을 입력해주세요"
              buttonText="수정 완료"
              onSubmit={editButtonOnClick}
            />
          </SubjectProfile>
        </StyledAnswer>
      )
    }
    //답변 거절일 경우 인풋 창이나 답변 내용을 보여주지 않습니다.
    if (isRejected) {
      return (
        <StyledAnswer>
          <SubjectProfile
            subject={subject}
            showCreatedTime={showCreatedTime}
            answerCreatedTime={answerCreatedTime}
          >
            <RejectDiv>답변 거절</RejectDiv>
          </SubjectProfile>
        </StyledAnswer>
      )
    }
    //그 외의 답변 완료일 경우 답변 내용을 보여줍니다.
    return (
      <StyledAnswer>
        <SubjectProfile
          subject={subject}
          showCreatedTime={showCreatedTime}
          answerCreatedTime={answerCreatedTime}
        >
          {answer?.content}
        </SubjectProfile>
      </StyledAnswer>
    )
  } else {
    // 답변을 아직 하지 않은 경우
    // 답변자의 정보와 'post/{id}/answer'페이지는 인풋 폼을 보여줍니다.
    if (isAnswerPage) {
      return (
        <StyledAnswer>
          <SubjectProfile
            subject={subject}
            showCreatedTime={showCreatedTime}
            answerCreatedTime={answerCreatedTime}
          >
            <InputTextForm
              placeholder="답변을 입력해주세요"
              buttonText="답변 완료"
              onSubmit={answerButtonOnClick}
            />
          </SubjectProfile>
        </StyledAnswer>
      )
    }
    // 답변을 하지 않았고, answer페이지가 아니라면 아무것도 보여주지 않습니다.
    return <></>
  }
}
export default FeedCardAnswer
