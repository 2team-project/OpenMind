import MessageImg from '../../public/icons/messages-gray.svg'
import * as S from './styled'

function CardListItem({ item }) {
  return (
    <>
      <S.CardItem>
        <div>
          <S.ItemImg src={item.imageSource} alt="item-image" />
          <S.ItemName>{item.name}</S.ItemName>
        </div>
        <S.QuestionContainer>
          <S.Question>
            <S.QuestionImg src={MessageImg} alt="message-image" />
            <p>받은 질문</p>
          </S.Question>
          <p>{item.questionCount}개</p>
        </S.QuestionContainer>
      </S.CardItem>
    </>
  )
}

export default CardListItem
