import { useState } from 'react'
import styled from 'styled-components'
import temporaryProfile from '/public/images/temporaryProfile.png'

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
function FeedCardAnswer() {
  const [answerState, setAnswerState] = useState({})
  const [modifyState, setModifyState] = useState(false)
  const [rejectState, setRejectState] = useState(false)
  //미답변, 답변 작성 중, 답변 수정 중, 답변 완료, 답변 거절 5가지 케이스의 구현 필요

  return (
    <StyledAnswer>
      <StyledProfile src={temporaryProfile} />
      <div>
        <StyledUserName>
          아초는 고양이<StyledDate>2주전</StyledDate>
        </StyledUserName>

        <div>
          (임시로 넣은 내용임. state 에따라 이부분이 변경되는 기능 구현 필요.)
          그들을 불러 귀는 이상의 오직 피고, 가슴이 이상, 못할 봄바람이다.
          찾아다녀도, 전인 방황하였으며, 대한 바이며, 이것이야말로 가치를 청춘의
          따뜻한 그리하였는가? 몸이 열락의 청춘의 때문이다. 천고에 피어나는 간에
          밝은 이상, 인생의 만물은 피다. 대중을 이성은 방황하여도, 그리하였는가?
          크고 평화스러운 품에 방황하였으며, 말이다. 이상은 들어 예수는 크고
          긴지라 역사를 피다. 얼음에 있음으로써 꽃 보배를 곧 가는 교향악이다.
          우는 새 예가 우리의 것은 피다. 피가 그것을 어디 앞이 기쁘며, 이상의
          열락의 위하여서 끝까지 것이다. 있는 봄바람을 방황하여도, 우리의 것은
          작고 아니한 영원히 듣기만 운다.
        </div>
      </div>
    </StyledAnswer>
  )
}
export default FeedCardAnswer
