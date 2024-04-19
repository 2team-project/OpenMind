import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import ButtonShare from '../../components/ButtonShare'
import { getId, getQuestions } from '../../utils/apiUtils'
import FeedCard from '../../components/FeedCard'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-image: url('../../images/backgroundImg.png');
  background-position: top;
  background-repeat: no-repeat;
  z-index: -1;
`

const Logo = styled.a`
  background-image: url('../../../public/images/logo.png');
  width: 15.5rem;
  height: 6rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`

const ProfileName = styled.h2`
  font-size: 1.5rem;
  color: var(--grayScale60);
`

const QuestionsContainer = styled.div`
  width: 80%;
  margin-top: 20px;
`

function AnswerPage() {
  const { id } = useParams()
  const [subject, setSubject] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadSubject() {
      try {
        const data = await getId(id)
        setSubject(data)
      } catch (error) {
        console.error('회원 정보를 불러오는 데 실패:', error)
        setError('회원 정보를 불러오는 데 실패했습니다.')
      }
      try {
        const subjectId = id
        const response = await getQuestions(subjectId)
        console.log(response)
        const questions = response.results
        setQuestions(questions)
      } catch (error) {
        console.error('질문 목록을 불러오는 데 실패:', error)
        setError('질문 목록을 불러오지 못하였습니다.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadSubject()
    }
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!subject) {
    return <p>해당 id의 정보가 없습니다.</p>
  }

  return (
    <PageContainer>
      <Logo />
      <ProfileContainer>
        <ProfileImage src={subject.imageSource} />
        <ProfileName>{subject.name}</ProfileName>
        <ButtonShare />
      </ProfileContainer>
      <QuestionsContainer>
        <h3>{subject.questionCount} 개의 질문이 있습니다</h3>
        {questions.length ? (
          questions.map((question) => (
            <FeedCard key={question.id} question={question} />
          ))
        ) : (
          <p>답변된 질문이 없습니다.</p>
        )}
      </QuestionsContainer>
    </PageContainer>
  )
}

export default AnswerPage
