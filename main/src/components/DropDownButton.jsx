import { useState, useEffect, useRef } from 'react'
import * as S from './listStyled'

function DropDownButton({ value, onChange }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropButtonRef = useRef(null)

  //DropDownButton 이외의 요소를 누를 때 버튼 끄기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropButtonRef.current &&
        !dropButtonRef.current.contains(event.target)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleSort = (value) => {
    onChange(value)
    setShowDropdown(false)
  }

  return (
    <S.DropButtonContainer>
      <S.DropDownButtonStyled
        ref={dropButtonRef}
        $show={showDropdown.toString()}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {value === 'name' ? '이름순' : '최신순'}
        <S.ArrowIcon $show={showDropdown.toString()} />
      </S.DropDownButtonStyled>
      <S.DropDownContent $show={showDropdown.toString()}>
        <S.DropDownItem onClick={() => handleSort('name')}>
          이름순
        </S.DropDownItem>
        <S.DropDownItem onClick={() => handleSort('time')}>
          최신순
        </S.DropDownItem>
      </S.DropDownContent>
    </S.DropButtonContainer>
  )
}

export default DropDownButton
