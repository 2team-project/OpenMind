import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchQuestion } from '../../utils/apiUtils';
import { useAsync } from '../../utils/stateUtils';
import { handleApiError } from '../../utils/errorUtils';

function AnswerCard() {
  const { questionId } = useParams();
  const { data: question, status, error, execute } = useAsync(async () => {
    const response = await fetchQuestion(questionId);
    return await handleApiError(response);
  }, false);

  React.useEffect(() => {
    if (questionId) {
      execute();
    }
  }, [questionId, execute]);

  // 로딩 상태 처리
  if (status === 'idle' || status === 'pending') return <div>Loading...</div>;
  // 에러 상태 처리
  if (status === 'error') return <div>Error: {error.message}</div>;
  // 데이터 미존재 처리
  if (!question) return <div>No data available</div>;

  return (
    <div className="answer-container">
      <h1>{question.content}</h1>
      {question.answer ? (
        <div>
          <p>{question.answer.content}</p>
        </div>
      ) : (
        <button onClick={() => console.log('Answering...')}>Answer this question</button>
      )}
    </div>
  );
}

export default AnswerCard;
