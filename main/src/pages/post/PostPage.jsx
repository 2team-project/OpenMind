import ButtonShare from '../../components/ButtonShare'
import FeedCard from '../../components/FeedCard'
import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getId, getQuestions } from '../../utils/apiUtils'
import * as S from './PostPageStyled'
import ButtonFloating from '../../components/ButtonFloating'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import ToastMessage from '../../components/ToastMessage'
import { createQuestion } from '../../utils/apiUtils'

// 질문 리스트의 마지막 요소 스타일 설정
const StyledFeedCardWrapper = styled.div`
  width: 100%;
`
const StyledFloatingButtonWrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
`

import Modal from '../modal/Modal'

function PostPage() {
  const { id } = useParams()
  const [subject, setSubject] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1) // 페이지 수
  const [totalQuestions, setTotalQuestions] = useState(0) // 전체 질문 개수
  const [isModalOpen, setIsModalOpen] = useState(false) //모달 창 표시 여부
  const [toastMessage, setToastMessage] = useState('')

  const observer = useRef(null)
  const lastQuestionElementRef = useRef(null)

  const navigate = useNavigate()
  const goToHome = () => {
    navigate('/')
  }

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

  useEffect(() => {
    if (toastMessage) {
      // 토스트 메시지가 존재할 경우 3초 후에 메시지를 지웁니다.
      const timer = setTimeout(() => {
        setToastMessage('')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  if (error) return <p>Error: {error}</p>
  if (!subject) {
    return <p>해당 id의 정보가 없습니다.</p>
  }

  //모달 창 표시 및 비표시 제어
  const switchModalOpen = () => {
    setIsModalOpen((prevState) => !prevState)
  }
  const updateQuestions = async () => {
    try {
      const response = await getQuestions(id, 1) // 페이지는 항상 1부터 시작
      setQuestions(response.results)
      setTotalQuestions(response.count)
    } catch (err) {
      console.error('질문 목록 업데이트 실패: ', err)
      setError('질문목록 업데이트 실패')
    }
  }
  return (
    <S.PageContainer>
      <S.Logo onClick={goToHome} />
      <S.ProfileContainer>
        <S.ProfileImage src={subject.imageSource} />
        <S.ProfileName>{subject.name}</S.ProfileName>
        <ButtonShare setToastMessage={setToastMessage} />
      </S.ProfileContainer>
      <S.QuestionsContainer>
        <S.QuestionCount>
          <S.MessageIcon />
          {totalQuestions}개의 질문이 있습니다.
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
      </S.QuestionsContainer>
      <StyledFloatingButtonWrapper onClick={switchModalOpen}>
        <ButtonFloating />
      </StyledFloatingButtonWrapper>
      {isModalOpen && (
        <Modal
          onClose={switchModalOpen}
          subject={subject}
          updateQuestions={updateQuestions}
        />
      )}
      {toastMessage && <ToastMessage message={toastMessage} />}
    </S.PageContainer>
  )
}

export default PostPage
