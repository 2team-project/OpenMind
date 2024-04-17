import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuestion, createAnswer } from '../../utils/apiUtils';
import { useAsync } from '../../utils/stateUtils';
import FeedCardQuestion from '../../components/FeedCardQuestion';

function AnswerCard() {
  const { questionId } = useParams();
  const [answer, setAnswer] = useState('');
  const { data: question, status, error, execute } = useAsync(async () => {
    const response = await fetchQuestion(questionId);
    return response;
  }, false);

  useEffect(() => {
    if (questionId) {
      execute();
    }
  }, [questionId, execute]);

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleAnswerSubmit = async () => {
    if (!answer.trim()) {
      alert('답변을 입력해주세요.');
      return;
    }

    try {
      const submittedAnswer = await createAnswer(questionId, answer);
      setAnswer('');
      // 성공적으로 답변을 제출한 후에는 페이지를 새로고침하거나 사용자에게 피드백을 줘야할까요?
      alert('답변이 성공적으로 제출되었습니다.');
    } catch (error) {
      alert('답변 제출 중 오류가 발생했습니다.');
    }
  };

  if (status === 'idle' || status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error: {error}</div>;
  if (!question) return <div>No data available</div>;

  return (
    <div className="answer-container">
      <FeedCardQuestion /> {/* 사용자가 질문한 내용을 여기서 렌더링 */}
      <h1>{question.content}</h1>
      {question.answer ? (
        <div>
          <p>{question.answer.content}</p>
        </div>
      ) : (
        <>
          <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="답변을 입력해주세요" />
          <button onClick={handleAnswerSubmit}>Submit Answer</button>
        </>
      )}
    </div>
  );
}

export default AnswerCard;