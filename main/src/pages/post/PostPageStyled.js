import styled from 'styled-components'

export const PageContainer = styled.div`
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

export const Logo = styled.a`
  background-image: url('../../../public/images/logo.png');
  width: 15.5rem;
  height: 6rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-top: 1rem;
  margin-bottom: 1rem;
`

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`

export const ProfileName = styled.h2`
  font-size: 1.5rem;
  color: var(--grayScale60);
`

export const QuestionsContainer = styled.div`
  width: 80%;
  margin-top: 20px;
`

export const NoQuestion_text = styled.div`
  display: flex;
`

export const NoQuestion = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  background-color: var(--brown10);
  height: 20rem;
  flex-direction: column;
  border-radius: 1rem;
  background-image: url('../../images/noItemImg.png');
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid var(--brown20);
  margin-top: 2rem;
  margin-bottom: 5rem;
`
