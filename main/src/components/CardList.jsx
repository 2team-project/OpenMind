import { useEffect, useRef } from 'react'
import { Link } from 'react'
import * as S from './listStyled'
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

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [onWidthChange])

  return (
    <S.CardContainer ref={cardRef}>
      {items.slice(0, limit).map((item) => (
        <div key={item.id}>
          {/* <Link to={`/post/${item.id}`}> */}
          <CardListItem item={item} />
          {/* </Link> */}
        </div>
      ))}
    </S.CardContainer>
  )
}

export default CardList
