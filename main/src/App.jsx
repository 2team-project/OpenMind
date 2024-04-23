import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import AnswerPage from './pages/answer/AnswerPage'
import './global.css'
import PostPage from './pages/post/PostPage'
import ListPage from './pages/list/ListPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id/answer" element={<AnswerPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/list" element={<ListPage />} />
        {/* 다른 루트 넣는 곳 */}
      </Routes>
    </Router>
  )
}

export default App
