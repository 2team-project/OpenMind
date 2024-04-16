// Head.jsx

import { useState, useEffect } from 'react'
import CardList from './CardList'
import { getCards } from '../utils/getCard'
import DropDownButton from './DropDownButton'
import PagenationButton from './PagenationButton'
import * as S from './styled'

function Head() {
  const [items, setItems] = useState([])
  const [limit, setLimit] = useState(6)
  const [offset, setOffset] = useState(0)
  const [sort, setSort] = useState('time')
  const [userCount, setUserCount] = useState(0)
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [cardWidth, setCardWidth] = useState(0)

  const handleLoad = async (options) => {
    try {
      const Cards = await getCards(options)
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
    setCardWidth(width)
    // 너비에 따라 limit 상태 변경
    if (width > 868 && limit !== 8) {
      setLimit(8)
    } else if (width <= 868 && limit !== 6) {
      setLimit(6)
    }
  }

  return (
    <S.Head>
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
      <PagenationButton
        onClick={handleOffsetClick}
        nextpage={nextPage}
        prevpage={prevPage}
        usercount={userCount}
      />
    </S.Head>
  )
}

export default Head
