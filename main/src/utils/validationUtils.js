// 사용자 이름 유효성 검사
export const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9._-]{3,}$/; // 최소 3자 이상, 특수 문자는 ., _, -만 허용
  return regex.test(username);
};

// 숫자 범위 검사
export const validateNumberRange = (number, min, max) => {
  return number >= min && number <= max;
};

// 필수 입력 필드 검사
export const isRequired = (value) => {
  return value !== null && value !== undefined && value.trim() !== '';
};


/*
 * 사용 예시
import { validateUsername, isRequired } from './validationUtils';

const username = "user_name";

if (!validateUsername(username)) {
    console.log("Username must be at least 3 characters long and can include letters, numbers, '.', '_', and '-'.");
}

if (!isRequired(username)) {
    console.log("Username is required.");
}

 */