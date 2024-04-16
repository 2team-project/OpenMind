import React from 'react';
import { useFormInput } from '../../utils/stateUtils';
import { createAnswer } from '../../utils/apiUtils';

function AnswerPage({ team, questionId }) {
  const [question, setQuestion] = useState(null);
  const answerInput = useFormInput('');

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const data = await fetchQuestion(team, questionId);
        setQuestion(data);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    loadQuestion();
  }, [team, questionId]);

  // 답변 제출 함수
  const handleSubmitAnswer = async () => {
    if (answerInput.value.trim()) {
      try {
        const newAnswer = await createAnswer(questionId, answerInput.value, false);
        console.log('Answer submitted successfully:', newAnswer);
        answerInput.onChange({ target: { value: '' } });
        alert('답변이 성공적으로 제출되었습니다.');
      } catch (error) {
        console.error('Error submitting answer:', error);
        alert('답변 제출 중 오류가 발생했습니다.');
      }
    } else {
      alert('답변을 입력해주세요.');
    }
  };

  return (
    <div className="answer-container">
      {question && (
        <>
          <div className="question-header">
            <span className="question-title">{question.content}</span>
          </div>
          <textarea {...answerInput} placeholder="답변을 입력해주세요" />
          <button onClick={() => {}}>Submit Answer</button>
        </>
      )}
    </div>
  );
}

export default AnswerPage;
