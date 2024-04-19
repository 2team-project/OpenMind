import { useState, useEffect } from 'react'
import CardList from './CardList'
import DropDownButton from './DropDownButton'
import PagenationButton from './PagenationButton'
import * as S from './listStyled'
import { getSubjects } from '../utils/apiUtils'
import { getSubs } from '../utils/apiUtils'

function CardListManager() {
  const [items, setItems] = useState([])
  const [limit, setLimit] = useState(8)
  const [offset, setOffset] = useState(0)
  const [sort, setSort] = useState('time')
  const [userCount, setUserCount] = useState(0)
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [cardListWidth, setCardListWidth] = useState(0)

  const handleLoad = async (options) => {
    try {
      const Cards = await getSubs(options)
      setItems(Cards.results)
      setUserCount(Cards.count)
      setNextPage(Cards.next)
      setPrevPage(Cards.previous)
    } catch (error) {
      console.error('Error fetching cards:', error)
    }
  }

  useEffect(() => {
    handleLoad({ limit, offset, sort })
  }, [limit, offset, sort])

  const handleOffsetClick = (newOffset) => {
    setOffset(newOffset)
  }

  const handleSort = (value) => {
    setSort(value)
  }

  const handleCardWidthChange = (width) => {
    if (width >= 868 && limit !== 8) {
      setLimit(8)
    } else if (width < 868 && limit !== 6) {
      setLimit(6)
    }
    setCardListWidth(width)
  }

  return (
    <S.Container>
      <S.Header>
        <S.ListText>누구에게 질문할까요?</S.ListText>
        <DropDownButton value={sort} onChange={handleSort} />
      </S.Header>
      <S.CardListDisplay>
        <CardList
          items={items}
          onWidthChange={handleCardWidthChange}
          limit={limit}
        />
      </S.CardListDisplay>
      <S.PagenationPosition>
        <PagenationButton
          onClick={handleOffsetClick}
          nextpage={nextPage}
          prevpage={prevPage}
          usercount={userCount}
          width={cardListWidth}
        />
      </S.PagenationPosition>
    </S.Container>
  )
}

export default CardListManager
