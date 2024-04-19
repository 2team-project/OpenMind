import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import AnswerPage from './pages/answer/AnswerPage'
import './global.css'
<<<<<<< HEAD
import DB from './components/DB'
import ListPage from './pages/list/ListPage'

function App() {
  return (
    <>
      <ListPage />
    </>
=======
import PostPage from './pages/post/PostPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id/answer" element={<AnswerPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        {/* 다른 루트 넣는 곳 */}
      </Routes>
    </Router>
>>>>>>> develop
  )
}

export default App
