// 응답으로부터 에러 메시지를 추출하는 함수
export const extractErrorMessage = async (response) => {
  let errorMessage = '처리 중에 오류가 발생했습니다.';
  const contentType = response.headers.get('content-type');
  
  try {
    if (contentType && contentType.indexOf('application/json') !== -1) {
      // JSON 형식의 에러 메시지를 처리
      const errorData = await response.json();
      errorMessage = errorData.message || JSON.stringify(errorData);
    } else {
      // 텍스트 형식의 에러 메시지를 처리
      errorMessage = await response.text();
    }
  } catch (error) {
    // 에러 메시지 파싱 과정에서 문제가 발생한 경우 기본 메시지를 사용
    errorMessage = '오류 응답을 파싱하는 데 실패했습니다.';
  }

  return errorMessage;
};

// API 호출에서 발생하는 에러를 핸들링하는 함수
export const handleApiError = async (response) => {
  if (!response.ok) {
    const errorMessage = await extractErrorMessage(response);
    throw new Error(errorMessage);
  }
  return response.json();  // 성공적인 응답 처리
};

// 사용 예시:
// try {
//   const response = await fetch('...');
//   await handleApiError(response);
// } catch (error) {
//   console.error(error);
// }
