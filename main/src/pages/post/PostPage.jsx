import ButtonShare from '../../components/ButtonShare'
import FeedCard from '../../components/FeedCard'
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getId, getQuestions } from '../../utils/apiUtils'
import * as S from './PostPageStyled'
import ButtonFloating from '../../components/ButtonFloating'

function PostPage() {
  const { id } = useParams()
  const [subject, setSubject] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1) // 페이지 수
  const [hasMore, setHasMore] = useState(true) // 추가 데이터가 있는지 여부 없으면 스크롤 멈춤

  const observer = useRef(null)
  const lastQuestionElementRef = useRef(null)

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
        const response = await getQuestions(subjectId, page)
        const newQuestions = response.results
        setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions])
        setHasMore(newQuestions.length > 0)
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
  }, [id, page])

  // page 상태 변경 시 새로운 데이터 로드
  useEffect(() => {
    if (!loading && hasMore) {
      const options = {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      }

      observer.current = new IntersectionObserver((entries) => {
        // 끝에 도달햇을 때 새로운 데이터 로드
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1)
        }
      }, options)

      if (lastQuestionElementRef.current) {
        observer.current.observe(lastQuestionElementRef.current)
      }
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [loading, hasMore])

  if (loading && page === 1) return <p>Loading...</p>
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
        {questions.map((question, index) => {
          const key = `${question.id}_${index}` // 고유한 키 생성 (안 하고 qusetion.id로 key 설정하면 로드될때 warning 겁나 뜸)
          if (questions.length === index + 1) {
            return (
              <div ref={lastQuestionElementRef} key={key}>
                <FeedCard subject={subject} question={question} />
              </div>
            )
          } else {
            return <FeedCard key={key} subject={subject} question={question} />
          }
        })}
        {loading && <p>로딩중...</p>}
        <S.FloatingButtonWrapper>
          <ButtonFloating />
        </S.FloatingButtonWrapper>
      </S.QuestionsContainer>
    </S.PageContainer>
  )
}

export default PostPage
