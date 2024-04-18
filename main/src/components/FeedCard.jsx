import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import FeedCardQuestion from './FeedCardQuestion'
import FeedCardAnswer from './FeedCardAnswer'
import kebabImg from '/public/icons/more.svg'
import Badge from './Badge'
import { fetchQuestionsForQuestionId } from '../utils/apiUtils';

const StyledDiv = styled.div`
  padding: 1.5rem;
  max-width: 684px;
  margin: 0 auto;
  border-radius: 1rem;
  box-shadow: 0 4px 4px var(--grayScale40); //임시값임. shadow 2pt 적용해야함.
`

const StyledMenubar = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledReactionLine = styled.div`
  hr: {
    border: none;
    height: 2px;
    background-color: #333;
    margin: 1.25rem;
  }
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

function FeedCardLayout({ questionId }) {
  const [questionData, setQuestionData] = useState(null);
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    fetchQuestionsForQuestionId(questionId)
      .then(data => {
        setQuestionData(data.results);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, [questionId]);

  const handleKebabToggle = () => {
    setIsKebabOpen(prev => !prev);
  };

  const handleKebabClose = (e) => {
    if (!optionsRef.current.contains(e.relatedTarget)) {
      setIsKebabOpen(false);
    }
  };

  if (!questionData) return <div>Loading...</div>;

  return (
    <StyledDiv>
      <StyledMenubar>
        <Badge isAnswered={questionData.some(question => question.answer)} />
        <StyledKebabButton onClick={handleKebabToggle} onBlur={handleKebabClose} />
        {isKebabOpen && <Dropdown />}
      </StyledMenubar>
      <Margin />
      {questionData.map((question, index) => (
        <React.Fragment key={question.id}>
          <FeedCardQuestion question={question} />
          <Margin />
          <FeedCardAnswer answer={question.answer} />
          {index < questionData.length - 1 && <Margin />}
        </React.Fragment>
      ))}
      <StyledReactionLine>
        <hr />
        <div>좋아요 싫어요</div>
      </StyledReactionLine>
    </StyledDiv>
  );
}


export default FeedCardLayout
