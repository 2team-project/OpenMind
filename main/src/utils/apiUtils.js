import { handleApiError } from './errorUtils';

const BASE_URL = 'https://openmind-api.vercel.app/5-2';

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    // 필요하면 다른 헤더를 여기에 포함
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`API 오류: ${errorData}`);
  }
  return response.json();
};

// 질문을 조회하는 API 함수
export const fetchQuestion = async (team, questionId) => {
  const response = await fetch(`https://openmind-api.vercel.app/${team}/questions/${questionId}/`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleApiError(response);
};

// 질문에 대한 답변을 생성하는 API 함수
export const createAnswer = async (questionId, content, isRejected) => {
  const response = await fetch(`${BASE_URL}/questions/${questionId}/answers/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ content, isRejected }),
  });
  return handleApiError(response);
};

// 답변을 조회하는 API 함수
export const getAnswer = async (answerId) => {
  const response = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleApiError(response);
};

// 답변을 수정하는 API 함수
export const updateAnswer = async (answerId, content, isRejected) => {
  const response = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ content, isRejected }),
  });
  return handleApiError(response);
};

// 답변을 삭제하는 API 함수
export const deleteAnswer = async (answerId) => {
  const response = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return handleApiError(response);
};

// 질문에 리액션을 추가하는 API 함수
export const addReactionToQuestion = async (questionId, type) => {
  const response = await fetch(`${BASE_URL}/questions/${questionId}/reaction/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ type }),
  });
  return handleApiError(response);
};

// 여기에 다른 API 함수들을 계속 추가
