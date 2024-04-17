import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnswerCard from './AnswerCard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/answer/:questionId" element={<AnswerCard />} />
        {/* 다른 라우트 설정 */}
      </Routes>
    </Router>
  );
}

export default App;
