import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import FeedCardQuestion from '../../components/FeedCardQuestion';
import FeedCardAnswer from '../../components/FeedCardAnswer';
import InputTextArea from '../../components/InputTextArea';
import { fetchQuestion, createAnswer } from '../../utils/apiUtils';
import { handleApiError } from '../../utils/errorUtils';

const AnswerContainer = styled.div`
  /* 레이아웃 넣는 곳 */
`;

function AnswerCard() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [answerContent, setAnswerContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestion = async () => {
        try {
            const data = await fetchQuestion(questionId);
            setQuestion(data);
        } catch (error) {
            setError('Question 정보를 가져오지 못했습니다.');
            console.error(error);
        }
    };

    if (questionId) {
        loadQuestion();
    }
}, [questionId]);

  const handleSubmitAnswer = async () => {
    if (!answerContent.trim()) {
      alert('답변을 입력하세요');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await createAnswer(questionId, answerContent, false);
      const newAnswer = await handleApiError(response);
      console.log('답변이 성공적으로 입력되었습니다:', newAnswer);
      setAnswerContent('');
      setQuestion({ ...question, answer: newAnswer });
    } catch (error) {
      setError('답변 제출에 오류가 발생했습니다');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <AnswerContainer>
      <FeedCardQuestion />
      {question.answer ? (
        <FeedCardAnswer />
      ) : (
        <InputTextArea
          placeholder="답변을 입력해주세요"
          value={answerContent}
          onChange={(e) => setAnswerContent(e.target.value)}
        />
      )}
      {!question.answer && (
        <button disabled={isSubmitting} onClick={handleSubmitAnswer}>
          Submit Answer
        </button>
      )}
    </AnswerContainer>
  );
}

export default AnswerCard;
