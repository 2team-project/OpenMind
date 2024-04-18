import { useState } from 'react'
import styled from 'styled-components'

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
function FeedCardAnswer({ answer }) {
  const [answerContent, setAnswerContent] = useState(answer ? answer.content : '');
  // 미답변, 답변 작성 중, 답변 수정 중, 답변 완료, 답변 거절 5가지 케이스의 구현 필요

  return (
<StyledAnswer>
      <StyledProfile src={answer ? answer.imageSource : '/path/to/default/image.jpg'} />
      <div>
        <StyledUserName>
          {answer ? answer.name : "No Name Provided"}<StyledDate>{answer ? new Date(answer.createdAt).toLocaleDateString() : '2주전'}</StyledDate>
        </StyledUserName>
        {answer ? (
          <div>{answerContent}</div>
        ) : (
          <InputTextArea placeholder="답변을 입력해주세요" value={answerContent} onChange={e => setAnswerContent(e.target.value)} />
        )}
      </div>
    </StyledAnswer>
  )
}
export default FeedCardAnswer