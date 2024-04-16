import { useState, useCallback } from 'react';

// 입력 폼을 위한 커스텀 훅
export const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  
  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return {
    value,
    onChange: handleChange
  };
};

// 단순 상태 업데이트를 위한 커스텀 훅
export const useToggle = (initialValue = false) => {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback(() => {
    setState((prevState) => !prevState);
  }, []);

  return [state, toggle];
};

// 비동기 데이터 요청을 위한 상태 관리 커스텀 훅
export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  const execute = useCallback(async (...args) => {
    setStatus('pending');
    setData(null);
    setError(null);
    try {
      const response = await asyncFunction(...args);
      setData(response);
      setStatus('success');
    } catch (error) {
      setError(error);
      setStatus('error');
    }
  }, [asyncFunction]);

  // 즉시 실행 옵션
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
};
