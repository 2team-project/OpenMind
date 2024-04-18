import { useState, useEffect } from 'react'
import ArrowLeft from '../../public/icons/arrowLeft.svg'
import ArrowRight from '../../public/icons/arrowRight.svg'
import * as S from './listStyled'

function PagenationButton({ onClick, nextpage, prevpage, usercount, width }) {
  const totalPages = Math.ceil(usercount / (width > 868 ? 8 : 6))
  const pagesToShow = 5
  const [currentPageGroup, setCurrentPageGroup] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPageGroup(Math.ceil(currentPage / pagesToShow))
  }, [currentPage])

  const handlePageClick = (page) => {
    setCurrentPage(page)
    const offset = (page - 1) * (width > 868 ? 8 : 6)
    onClick(offset)
  }

  const handleNextClick = () => {
    if (nextpage && totalPages > currentPageGroup * pagesToShow) {
      setCurrentPageGroup((prev) => prev + 1)
      setCurrentPage(currentPageGroup * pagesToShow + 1)
      handlePageClick(currentPageGroup * pagesToShow + 1)
    }
  }

  const handlePrevClick = () => {
    if (prevpage && currentPageGroup > 1) {
      setCurrentPageGroup((prev) => prev - 1)
      setCurrentPage((currentPageGroup - 1) * pagesToShow)
      handlePageClick((currentPageGroup - 1) * pagesToShow)
    }
  }

  const renderPageButtons = () => {
    const pageButtons = []
    const startPage = (currentPageGroup - 1) * pagesToShow + 1
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1)

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <S.PageButton
          key={i}
          onClick={() => handlePageClick(i)}
          $active={i === currentPage}
        >
          {i}
        </S.PageButton>
      )
    }

    return pageButtons
  }

  return (
    <S.PagenationContainer>
      <S.PrevButton onClick={handlePrevClick} disabled={!prevpage}>
        <S.PrevImg src={ArrowLeft} alt="이전" />
      </S.PrevButton>
      {renderPageButtons()}
      <S.NextButton onClick={handleNextClick} disabled={!nextpage}>
        <S.NextImg src={ArrowRight} alt="다음" />
      </S.NextButton>
    </S.PagenationContainer>
  )
}

export default PagenationButton
