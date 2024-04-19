import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FeedCardLayout from '../../components/FeedCard'
import { getQuestionDetails } from '../../utils/apiUtils'

function AnswerPage() {
  const { id } = useParams()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await getQuestionDetails(id)
        setQuestions(data.results.filter((q) => q.answer !== null))
      } catch (error) {
        console.error('질문 정보를 불러오는 데 실패했습니다:', error)
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!questions.length) return <p>해당 주제에 답변된 질문이 없습니다.</p>

  return (
    <div>
      {questions.map((question) => (
        <FeedCardLayout key={question.id} question={question} />
      ))}
    </div>
  )
}

export default AnswerPage
