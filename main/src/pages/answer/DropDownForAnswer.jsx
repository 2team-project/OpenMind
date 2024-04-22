import React, { useState, useEffect, useRef } from 'react'
import * as S from '../../components/listStyled'
import MoreIcon from '../../../public/icons/more.svg'

function DropdownForAnswer({ onEdit, onReject }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <S.DropButtonContainer ref={dropdownRef}>
      <S.DropDownButtonStyled
        onClick={() => setShowDropdown(!showDropdown)}
        style={{ border: 'none', marginLeft: '2rem' }}
        $show={showDropdown.toString()}
      >
        <img
          src={MoreIcon}
          alt="More options"
          style={{
            height: '1.625rem',
            width: '1.625rem',
            filter: showDropdown
              ? 'brightness(0) sepia(1) saturate(100%) hue-rotate(17deg)'
              : 'none',
          }}
        />
      </S.DropDownButtonStyled>
      {showDropdown && (
        <S.DropDownContent $show={showDropdown.toString()}>
          <S.DropDownItem onClick={onEdit}>
            수정하기
          </S.DropDownItem>
          <S.DropDownItem onClick={onReject}>
            거절하기
          </S.DropDownItem>
        </S.DropDownContent>
      )}
    </S.DropButtonContainer>
  )
}

export default DropdownForAnswer
