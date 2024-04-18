import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ButtonShare from '../../components/ButtonShare';
import { fetchSubjectById } from '../../utils/apiUtils';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.a`
  background-image: url('../../../public/images/logo.png');
  width: 15.5rem;
  height: 6rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-top: 5rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;  // 요소들 사이의 간격
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const ProfileName = styled.h2`
  font-size: 1.5rem;
  color: var(--grayScale60);
`;

const QuestionsContainer = styled.div`
  width: 80%;
  margin-top: 20px;
`;

function AnswerPage() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSubject() {
      try {
        const data = await fetchSubjectById(id);
        setSubject(data);
      } catch (error) {
        console.error('회원 정보를 불러오는 데 실패:', error);
        setError('회원 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadSubject();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!subject) return <p>해당 id의 정보가 없습니다.</p>;

  const questions = subject.questions || [];

  return (
    <PageContainer>
      <Logo />
      <ProfileContainer>
        <ProfileImage src={subject.imageSource} alt="프로필 이미지" />
        <ProfileName>{subject.name}</ProfileName>
        <ButtonShare /> {/* 공유 버튼 컴포넌트 배치 */}
      </ProfileContainer>
      <QuestionsContainer>
        <h3>{subject.questionCount} 개의 질문이 있습니다</h3>
        {questions.length ? questions.map(question => (
          <FeedCardLayout key={question.id} question={question} />
        )) : <p>답변된 질문이 없습니다.</p>}  
      </QuestionsContainer>
    </PageContainer>
  );
}

export default AnswerPage;
