import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnswerPage from './pages/answer'; // AnswerPage 컴포넌트를 임포트합니다.
import './global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>openMind</div>} />
        <Route path="/answer" element={<AnswerPage />} /> {/* AnswerPage 라우트 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
