import ButtonShare from '../../components/ButtonShare'
import FeedCard from '../../components/FeedCard'
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getId, getQuestions } from '../../utils/apiUtils'
import * as S from './PostPageStyled'
import ButtonFloating from '../../components/ButtonFloating'
import styled, { css } from 'styled-components'

// 질문 리스트의 마지막 요소 스타일 설정
const StyledFeedCardWrapper = styled.div`
  width: 100%;
`
import Modal from '../modal/Modal'

function PostPage() {
  const { id } = useParams()
  const [subject, setSubject] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1) // 페이지 수
  const [hasMore, setHasMore] = useState(true) // 추가 데이터가 있는지 여부 없으면 스크롤 멈춤
  const limit = 8 //한 페이지에 보여줄 질문 개수
  const [totalQuestions, setTotalQuestions] = useState(0) // 전체 질문 개수
  const [isModalOpen, setIsModalOpen] = useState(false) //모달 창 표시 여부

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
    }

    if (id) {
      loadSubject()
    }
  }, [id])

  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await getQuestions(id, page)
        const newQuestions = response.results
        setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions])
        setTotalQuestions(response.count)
      } catch (err) {
        console.error('질문 목록 실패: ', err)
        setError('질문목록 불러오기 실패')
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      loadQuestions()
    }
  }, [id, page])

  useEffect(() => {
    if (!loading && totalQuestions > questions.length) {
      const options = {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1)
        }
      }, options)

      if (lastQuestionElementRef.current) {
        observer.current.observe(lastQuestionElementRef.current)
      }

      return () => {
        if (observer.current) {
          observer.current.disconnect()
        }
      }
    }
  }, [loading, totalQuestions, questions.length])

  if (error) return <p>Error: {error}</p>
  if (!subject) {
    return <p>해당 id의 정보가 없습니다.</p>
  }

  //모달 창 표시 및 비표시 제어
  const switchModalOpen = () => {
    setIsModalOpen((prevState) => !prevState)
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
        <S.QuestionCount>
          <S.MessageIcon />
          {subject.questionCount}개의 질문이 있습니다.
        </S.QuestionCount>
        {questions.length ? (
          questions.map((question, index) => {
            const key = `${question.id}_${index}` // 고유한 키 생성 (안 하고 qusetion.id로 key 설정하면 로드될때 warning 겁나 뜸)
            if (questions.length === index + 1) {
              return (
                <StyledFeedCardWrapper ref={lastQuestionElementRef} key={key}>
                  <FeedCard subject={subject} question={question} />
                </StyledFeedCardWrapper>
              )
            } else {
              return (
                <FeedCard key={key} subject={subject} question={question} />
              )
            }
          })
        ) : (
          <S.NoQuestion></S.NoQuestion>
        )}
        {loading && <p>로딩중...</p>}

        <S.FloatingButtonWrapper onClick={switchModalOpen}>
          <ButtonFloating />
        </S.FloatingButtonWrapper>
      </S.QuestionsContainer>
      {isModalOpen && <Modal onClose={switchModalOpen} subject={subject} />}
    </S.PageContainer>
  )
}

export default PostPage
