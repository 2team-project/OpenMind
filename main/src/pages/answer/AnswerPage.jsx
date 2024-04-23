import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import media, { size } from '../../utils/media'
import ButtonShare from '../../components/ButtonShare'
import DeleteAllButton from './DeleteAllButton'
import { ReactComponent as MessagesIcon } from '../../../public/icons/messages.svg'
import {
  getId,
  getQuestions,
  deleteQuestion,
  getQuestionDetails,
} from '../../utils/apiUtils'
import FeedCard from '../../components/FeedCard'
import ToastMessage from '../../components/ToastMessage'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-image: url('../../images/backgroundImg.png');
  background-position: top;
  background-repeat: no-repeat;
  z-index: -1;
`

const Logo = styled(Link)`
  background-image: url('../../../public/images/logo.png');
  width: 7.75rem;
  height: 3.0625rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: block;
  ${media(size.tablet)`
    width: 10.625rem;
    height: 4.1875rem;
  `}
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

const ProfileImage = styled.img`
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 50%;
  ${media(size.tablet)`
    width: 8.5rem;
    height: 8.5rem;
  `}
`

const ProfileName = styled.h2`
  color: var(--Grayscale-60, #000);
  font-family: Actor;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.875rem ${media(size.tablet)`
  font-size: 2rem;
  line-height: 2.5rem;
`};
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`

const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1.44rem;
  margin-bottom: 0.37rem;
  ${media(size.tablet)`
    margin-bottom: 1.19rem;
  `}
`

const QuestionsContainer = styled.div`
  display: flex;
  width: 20.4375rem;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--Brown-20, #e4d5c9);
  background: var(--Brown-10, #f5f1ee);
  ${media(size.tablet)`
    width: 44rem;  
    border: 1px solid var(--Brown-30, #C7BBB5);
  `}
`

const MessageIcon = styled(MessagesIcon)`
  path {
    fill: #542f1a;
  }
  height: 1.375rem;
  width: 1.375rem;
  ${media(size.tablet)`
    width: 1.5rem;
    height: 1.5rem;
  `}
`

const QuestionCount = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--Brown-40, #542f1a);
  font-family: Actor;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem;
  height: 1.5rem;
  ${media(size.tablet)`
  font-size: 1.25rem;
  line-height: 1.5625rem;
`}
`

const QuestionCard = styled(FeedCard)``

function AnswerPage() {
  const { id } = useParams()
  const [subject, setSubject] = useState(null)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1) // 페이지 수
  const [totalQuestions, setTotalQuestions] = useState(0) // 전체 질문 개수
  const [needRefresh, setNeedRefresh] = useState(null) //리렌더링 필요시 값을 변경시켜서 사용
  const [toastMessage, setToastMessage] = useState('')

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

  //질문 새로고침 로직
  useEffect(() => {
    async function refreshQuestions() {
      try {
        setLoading(true)
        const questionId = needRefresh.questionId
        const refreshedQuestion = await getQuestionDetails(questionId)
        const refreshedQuestions = questions.map((question) => {
          if (question.id === questionId) {
            return refreshedQuestion
          }
          return question
        })
        setQuestions([...refreshedQuestions])
      } catch (err) {
        console.err('새로고침 실패', err)
      } finally {
        setLoading(false)
      }
    }

    if (needRefresh !== null) {
      refreshQuestions()
    }
  }, [needRefresh])

  useEffect(() => {
    async function loadQuestions() {
      try {
        const subjectId = id
        const response = await getQuestions(subjectId, page)
        const newQuestions = response.results
        setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions])
        setTotalQuestions(response.count)
      } catch (error) {
        console.error('질문 목록을 불러오는 데 실패:', error)
        setError('질문 목록을 불러오지 못하였습니다.')
      } finally {
        setLoading(false)
      }
    }
    //로컬 스토리지에 저장된 id불러오기
    const storedId = localStorage.getItem('postId')
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

  const handleDeleteAllQuestions = async () => {
    Promise.all(questions.map((question) => deleteQuestion(question.id)))
      .then(() => {
        setQuestions([])
        alert('모든 질문을 삭제했습니다.')
        setTotalQuestions(0)
      })
      .catch((error) => {
        console.error('질문 삭제에 오류가 일어났습니다:', error)
        alert('질문 삭제를 실패했습니다')
      })
  }

  useEffect(() => {
    if (toastMessage) {
      // 토스트 메시지가 존재할 경우 3초 후에 메시지를 지웁니다.
      const timer = setTimeout(() => {
        setToastMessage('')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!subject) {
    return <p>해당 id의 정보가 없습니다.</p>
  }

  return (
    <PageContainer>
      <Logo to="/" />
      <Header>
        <ProfileImage src={subject.imageSource} />
        <ProfileName>{subject.name}</ProfileName>
        <ButtonShare setToastMessage={setToastMessage} />
      </Header>
      <Body>
        <DeleteButtonContainer>
          <DeleteAllButton onClick={handleDeleteAllQuestions} />
        </DeleteButtonContainer>
        <QuestionsContainer>
          <QuestionCount>
            <MessageIcon />
            {totalQuestions}개의 질문이 있습니다.
          </QuestionCount>
          {questions.length ? (
            questions.map((question, index) => {
              const key = `${question.id}__${index}` // 고유한 키 생성 (안 하고 qusetion.id로 key 설정하면 로드될때 warning 겁나 뜸)
              if (questions.length === index + 1) {
                return (
                  <div ref={lastQuestionElementRef} key={key}>
                    <QuestionCard
                      key={question.id}
                      subject={subject}
                      question={question}
                      setNeedRefresh={setNeedRefresh}
                    />
                  </div>
                )
              } else {
                return (
                  <QuestionCard
                    key={question.id}
                    subject={subject}
                    question={question}
                    setNeedRefresh={setNeedRefresh}
                  />
                )
              }
            })
          ) : (
            <p>답변된 질문이 없습니다.</p>
          )}
        </QuestionsContainer>
      </Body>
      {toastMessage && <ToastMessage message={toastMessage} />}
    </PageContainer>
  )
}

export default AnswerPage
