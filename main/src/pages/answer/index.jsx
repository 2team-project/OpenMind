import React from 'react';
import { useFormInput } from './stateUtils';
import { createAnswer } from './apiUtils';

function AnswerPage({ questionId }) {
  const answerInput = useFormInput('');

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
      <div className="question-header">
        <span className="question-title">질문: 어떤 것을 좋아하시나요?</span>
        <div className="question-actions">
          {/* 액션 버튼들이 위치할 곳 (수정, 삭제 등) */}
        </div>
      </div>
      <textarea {...answerInput} className="answer-input" placeholder="여기에 답변을 작성해주세요..." />
      <button onClick={handleSubmitAnswer} className="submit-answer">답변하기</button>
    </div>
  );
}

export default AnswerPage;
