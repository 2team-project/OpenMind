import { useState, useEffect } from 'react'
import ArrowLeft from '../../public/icons/arrowLeft.svg'
import ArrowRight from '../../public/icons/arrowRight.svg'
import * as S from './styled'

function PagenationButton({ onClick, nextpage, prevpage, usercount }) {
  const totalPages = Math.ceil(usercount / 6) // 총 페이지 수 계산
  const pagesToShow = 5 // 보여질 페이지 버튼 수
  const [currentPageGroup, setCurrentPageGroup] = useState(1) // 현재 페이지 그룹 상태
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지 상태

  useEffect(() => {
    setCurrentPageGroup(Math.ceil(currentPage / pagesToShow))
  }, [currentPage])

  // 페이지 버튼 클릭 핸들러
  const handlePageClick = (page) => {
    setCurrentPage(page)
    onClick((page - 1) * 6) // 부모 컴포넌트의 onClick 함수 호출하여 offset 변경
  }

  // 다음 페이지 버튼 클릭 핸들러
  const handleNextClick = () => {
    if (nextpage && totalPages > currentPageGroup * pagesToShow) {
      setCurrentPageGroup((prev) => prev + 1)
    }
  }

  // 이전 페이지 버튼 클릭 핸들러
  const handlePrevClick = () => {
    if (prevpage && currentPageGroup > 1) {
      setCurrentPageGroup((prev) => prev - 1)
    }
  }

  // 페이지 버튼 렌더링 함수
  const renderPageButtons = () => {
    const pageButtons = []
    const startPage = (currentPageGroup - 1) * pagesToShow + 1 // 페이지 그룹 시작 페이지
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1) // 페이지 그룹 끝 페이지

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
