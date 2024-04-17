import { useEffect, useRef } from 'react'
import * as S from './styled'
import CardListItem from './CardListItem'

function CardList({ items, onWidthChange, limit }) {
  const cardRef = useRef()

  useEffect(() => {
    const handleResize = () => {
      if (cardRef.current) {
        const width = cardRef.current.offsetWidth
        onWidthChange(width)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [onWidthChange])

  return (
    <S.CardContainer ref={cardRef}>
      {items.slice(0, limit).map((item) => (
        <div key={item.id}>
          <CardListItem item={item} />
        </div>
      ))}
    </S.CardContainer>
  )
}

export default CardList
