import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import AnswerPage from './pages/answer/AnswerPage';
import './global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id/answer" element={<AnswerPage />} />
        {/* 다른 루트 넣는 곳 */}
      </Routes>
    </Router>
  );
}

export default App;
