import styled from 'styled-components'
import media, { size } from '../../utils/media'
import { ReactComponent as MessagesIcon } from '../../../public/icons/messages.svg'

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
  background-image: url('/images/logo.png');
  width: 15.5rem;
  height: 6rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-top: 1rem;
  margin-bottom: 1rem;
  ${media(size.tablet)`
    width: 10.625rem;
    height: 4.1875rem;
  `}
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
  line-height: 1.875rem ${media(size.tablet)`
  font-size: 2rem;
  line-height: 2.5rem;
`};
  ${media(size.tablet)`
    width: 8.5rem;
    height: 8.5rem;
  `}
`

export const ProfileName = styled.h2`
  font-size: 1.5rem;
  color: var(--grayScale60);
`

export const QuestionsContainer = styled.div`
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
  margin-top:1rem
`

export const NoQuestion_text = styled.div`
  display: flex;
`

export const NoQuestion = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  background-color: var(--brown10);
  height: 9rem;
  flex-direction: column;
  border-radius: 1rem;
  background-image: url('../../images/noItemImg.png');
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 2rem;
  margin-bottom: 5rem;
  width: 100%;
`
export const FloatingButtonWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
`

export const QuestionCount = styled.p`
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

export const MessageIcon = styled(MessagesIcon)`
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
