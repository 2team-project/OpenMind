import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnswerCard from './pages/answer/AnswerCard';
import './global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>openMind</div>} />
        <Route path="/answer" element={<AnswerCard />} /> {/* AnswerPage 라우트 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
