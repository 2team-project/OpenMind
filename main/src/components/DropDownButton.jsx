import { useState } from 'react'
import * as S from './listStyled'

function DropDownButton({ value, onChange }) {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSort = (value) => {
    onChange(value)
    setShowDropdown(false)
  }

  return (
    <S.DropButtonContainer>
      <S.DropDownButtonStyled
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
