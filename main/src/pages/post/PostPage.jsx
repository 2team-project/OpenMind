import ButtonShare from '../../components/ButtonShare'
import FeedCard from '../../components/FeedCard'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getId, getQuestions } from '../../utils/apiUtils'
import * as S from './PostPageStyled'

function PostPage() {
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
    <S.PageContainer>
      <S.Logo />
      <S.ProfileContainer>
        <S.ProfileImage src={subject.imageSource} />
        <S.ProfileName>{subject.name}</S.ProfileName>
        <ButtonShare />
      </S.ProfileContainer>
      <S.QuestionsContainer>
        {questions.length ? (
          questions.map((question) => (
            <FeedCard key={question.id} subject={subject} question={question} />
          ))
        ) : (
          <S.NoQuestion>
            <S.NoQuestion_text>
              <img src="../../icons/messages.svg" />
              <p>&nbsp;아직 질문이 없습니다.</p>
            </S.NoQuestion_text>
          </S.NoQuestion>
        )}
      </S.QuestionsContainer>
    </S.PageContainer>
  )
}

export default PostPage
