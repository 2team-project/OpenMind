import { handleApiError } from './errorUtils'

const BASE_URL = 'https://openmind-api.vercel.app/5-2'

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
  }
}

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.text()
    throw new Error(`API 오류: ${errorData}`)
  }
  return response.json()
}

// id 조회 함수
export const fetchSubjectById = async (subjectId) => {
  const url = `${BASE_URL}/subjects/${subjectId}/`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const error = await handleApiError(response);
    throw new Error(`API 요청 실패: ${error}`);
  }

  return response.json();
};

// id에 들어 온 질문을 조회하는 API 함수
export const fetchQuestionsForSubject = async (questionId) => {
  if (!questionId) {
    console.error("fetchQuestionsForSubject 함수가 questionId 없이 호출되었습니다.");
    return;
  }

  const url = `${BASE_URL}/subjects/${questionId}/questions/`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {

    const errorData = await response.text();
    throw new Error(`API 오류: ${errorData}`);
    }
  return await response.json();
};


// 질문에 대한 답변을 생성하는 API 함수
export const createAnswer = async (questionId, content, isRejected) => {
  const url = `${BASE_URL}/questions/${questionId}/answers/`
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ content, isRejected }),
  })

  const data = await response.json()

  console.log('HTTP Status:', response.status)
  console.log('Response Headers:', Array.from(response.headers.entries()))
  console.log('Response Body:', data)

  return handleApiError(response)
}

// 답변을 조회하는 API 함수
export const getAnswer = async (answerId) => {
  const response = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: 'GET',
    headers: getHeaders(),
  })
  return handleApiError(response)
}

// 답변을 수정하는 API 함수
export const updateAnswer = async (answerId, content, isRejected) => {
  const response = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ content, isRejected }),
  })
  return handleApiError(response)
}

// 답변을 삭제하는 API 함수
export const deleteAnswer = async (answerId) => {
  const response = await fetch(`${BASE_URL}/answers/${answerId}/`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return handleApiError(response)
}

// 질문에 리액션을 추가하는 API 함수
export const addReactionToQuestion = async (questionId, type) => {
  const response = await fetch(
    `${BASE_URL}/questions/${questionId}/reaction/`,
    {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ type }),
    }
  )
  return handleApiError(response)
}

export const getSubjects = async (limit, offset, sort) => {
  const queryParams = new URLSearchParams({ limit, offset, sort }).toString()
  const response = await fetch(`${BASE_URL}/subjects/?${queryParams}`, {
    method: 'GET',
    headers: getHeaders(),
  })
  const body = await response.json()
  console.log(body)
  return body
}

// 여기에 다른 API 함수들을 계속 추가
