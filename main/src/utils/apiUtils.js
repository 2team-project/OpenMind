import { handleApiError } from './errorUtils'

const BASE_URL = 'https://openmind-api.vercel.app/5-2'

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    // 필요하면 다른 헤더를 여기에 포함
  }
}

// 특정 id에 들어 온 질문을 조회하는 API 함수
export const fetchQuestionsForQuestionId = async (questionId) => {
  if (!questionId) {
    console.error(
      'fetchQuestionsForQuestionId 함수가 questionId 없이 호출되었습니다.'
    )
    return
  }
  const url = `${BASE_URL}/subjects/${questionId}/questions/`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    const errorData = await response.text()
    throw new Error(`API 오류: ${errorData}`)
  }
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

// subject (답변자)를 생성하는 API 함수
export const createSubject = async (name) => {
  const url = `${BASE_URL}/subjects/`
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ name }),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
  return handleApiError(response)
}

// 질문을 생성하는 API 함수
export const createQuestion = async (subjectId, content) => {
  const url = `${BASE_URL}/subjects/{subjectId}/questions/`
  const response = await fetch(url, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ subjectId, content }),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
  return handleApiError(response)

}

// 답변자들의 feed를 조회하는 API 함수
export const getSubjects = async (limit, offset, sort) => {
  const queryParams = new URLSearchParams({ limit, offset, sort }).toString()
  const response = await fetch(`${BASE_URL}/subjects/?${queryParams}`, {
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
  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
  return handleApiError(response)
}

// subject의 Id 정보를 가져오는 API 함수 (프로필 이미지/name 조회)
export const getId = async (Id) => {
  const url = `${BASE_URL}/subjects/${Id}`
  const response = await fetch(url, {
    method: 'GET',
    headers: getHeaders(),
  })
  if (!response.ok) {
    throw new Error('Network response was not ok.')
  }
  return handleApiError(response)
}

// 답변자 (feed)를 삭제하는 함수
export const deleteId = async (Id) => {
  const response = await fetch(`${BASE_URL}/subjects/${Id}/`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  return handleApiError(response)
}
