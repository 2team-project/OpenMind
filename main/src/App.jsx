import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnswerCard from './pages/answer/AnswerCard';
import './global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>openMind</div>} />
        <Route path="/answer" element={<AnswerCard />} /> // 답변페이지
      </Routes>
    </Router>
  );
}
export default App;
