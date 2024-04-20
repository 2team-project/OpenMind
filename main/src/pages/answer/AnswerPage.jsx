import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import media, { size } from '../../utils/media'
import ButtonShare from '../../components/ButtonShare'
import DeleteButton from './DeleteButton'
import { ReactComponent as MessagesIcon } from '../../../public/icons/messages.svg'
import { getId, getQuestions } from '../../utils/apiUtils'
import FeedCard from '../../components/FeedCard'

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
  width: 100px;
  height: 100px;
  border-radius: 50%;
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
`}
`

const Icon = styled(MessagesIcon)`
  path {
    fill: #542f1a;
  }
  height: 1.375rem;
  width: 1.375rem;
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
      <Logo to="/" />
      <Header>
        <ProfileImage src={subject.imageSource} />
        <ProfileName>{subject.name}</ProfileName>
        <ButtonShare />
      </Header>
      <Body>
        <DeleteButtonContainer>
          <DeleteButton />
        </DeleteButtonContainer>
        <QuestionsContainer>
          <QuestionCount>
            <Icon />
            {subject.questionCount} 개의 질문이 있습니다.
          </QuestionCount>
          {questions.length ? (
            questions.map((question) => (
              <FeedCard
                key={question.id}
                subject={subject}
                question={question}
              />
            ))
          ) : (
            <p>답변된 질문이 없습니다.</p>
          )}
        </QuestionsContainer>
      </Body>
    </PageContainer>
  )
}

export default AnswerPage
