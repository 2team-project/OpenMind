const BASE_URL = 'https://openmind-api.vercel.app/5-2';

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    // 필요하다면 다른 헤더들(인증 등)을 여기에 포함
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`API 오류: ${errorData}`);
  }
  return response.json();
};

// 질문 대상을 생성하는 API 함수
export const createSubject = async (name) => {
  const response = await fetch(`${BASE_URL}/subjects/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ name }),
  });
  return handleResponse(response);
};

// 질문 대상 목록을 조회하는 API 함수
export const getSubjects = async (limit, offset, sort) => {
  const queryParams = new URLSearchParams({ limit, offset, sort }).toString();
  const response = await fetch(`${BASE_URL}/subjects/?${queryParams}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// 특정 질문 대상을 조회하는 API 함수
export const getSubject = async (subjectId) => {
  const response = await fetch(`${BASE_URL}/subjects/${subjectId}/`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// 특정 질문 대상을 삭제하는 API 함수
export const deleteSubject = async (subjectId) => {
  const response = await fetch(`${BASE_URL}/subjects/${subjectId}/`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// 특정 질문에 대한 답변을 생성하는 API 함수
export const createAnswer = async (questionId, content, isRejected) => {
  const response = await fetch(`${BASE_URL}/questions/${questionId}/answers/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ content, isRejected }),
  });
  return handleResponse(response);
};

// 특정 답변을 조회하는 API 함수
export const getAnswer = async (answerId) => {
  const response = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// 특정 답변을 수정하는 API 함수
export const updateAnswer = async (answerId, content, isRejected) => {
  const response = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ content, isRejected }),
  });
  return handleResponse(response);
};

// 특정 답변을 삭제하는 API 함수
export const deleteAnswer = async (answerId) => {
  const response = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// 질문에 리액션을 추가하는 API 함수
export const addReactionToQuestion = async (questionId, type) => {
  const response = await fetch(`${BASE_URL}/questions/${questionId}/reaction/`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ type }),
  });
  return handleResponse(response);
};

// 여기에 다른 API 함수들을 계속 추가
