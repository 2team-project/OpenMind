import { handleApiError } from './errorUtils'

const BASE_URL = 'https://openmind-api.vercel.app/5-2'

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
  }
}

// 질문 하나를 조회하는 함수(질문ID 사용)
export const getQuestionDetails = async (questionId) => {
  const url = `${BASE_URL}/questions/${questionId}/`
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(),
  })
  return handleApiError(response)
}

// 질문에 대한 답변을 생성하는 API 함수
export const createAnswer = async (questionId, content, isRejected) => {
  const url = `${BASE_URL}/questions/${questionId}/answers/`
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ content, isRejected }),
  })
  return handleApiError(response)
}

// 답변을 수정하는 API 함수
export const updateAnswer = async (answerId, content, isRejected) => {
  const url = `${BASE_URL}/answers/${answerId}/`
  const response = await fetch(url, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ content, isRejected }),
  })
  return handleApiError(response)
}

// 질문을 삭제하는 API 함수
export const deleteQuestion = async (id) => {
  const url = `${BASE_URL}/questions/${id}/`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return handleApiError(response)
}

// 답변을 조회하는 API 함수
export const getAnswer = async (answerId) => {
  const url = `${BASE_URL}/answers/${answerId}/`
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(),
  })
  return handleApiError(response)
}

// 답변을 삭제하는 API 함수
export const deleteAnswer = async (answerId) => {
  const url = `${BASE_URL}/answers/${answerId}/`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return handleApiError(response)
}

// 질문에 리액션을 추가하는 API 함수
export const addReactionToQuestion = async (questionId, type) => {
  const url = `${BASE_URL}/questions/${questionId}/reaction/`
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ type }),
  })
  return handleApiError(response)
}

// subject (답변자)를 생성하는 API 함수
export const createSubject = async (name) => {
  const url = `${BASE_URL}/subjects/`
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ name }),
  })
  return handleApiError(response)
}

// 질문을 생성하는 API 함수
export const createQuestion = async (subjectId, content) => {
  const url = `${BASE_URL}/subjects/${subjectId}/questions/`
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ subjectId, content }),
  })
  return handleApiError(response)
}

// 답변자들의 목록(등록된 답변자들 총 숫자, 및 표시할 답변자들의 정보_이름,id,이미지 등)을 조회하는 API 함수
export const getSubjects = async ({ limit, offset, sort }) => {
  const queryParams = new URLSearchParams({ limit, offset, sort }).toString()
  const url = `${BASE_URL}/subjects/?${queryParams}`
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(),
  })
  return handleApiError(response)
}

// 질문 목록을 조회하는 API 함수 (subjectID필요)
export const getQuestions = async (subjectId) => {
  const url = `${BASE_URL}/subjects/${subjectId}/questions/`
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(),
  })
  return handleApiError(response)
}

// subject 하나의 Id 정보를 가져오는 API 함수 (프로필 이미지/name 조회)
export const getId = async (subjectId) => {
  const url = `${BASE_URL}/subjects/${subjectId}/`
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(),
  })
  return handleApiError(response)
}

// 답변자 Id를 삭제하는 함수. createSubject와 반대동작. 테스트시 삭제된 id는 결번으로 남음.
export const deleteId = async (subjectId) => {
  const url = `${BASE_URL}/subjects/${subjectId}/`
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return handleApiError(response)
}
