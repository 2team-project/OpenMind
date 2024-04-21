import { useState, useEffect, useRef } from 'react'
import * as S from '../../components/listStyled'
import MoreIcon from '../../../public/icons/more.svg'

function DropdownForAnswer() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <S.DropButtonContainer ref={dropdownRef}>
      <S.DropDownButtonStyled onClick={() => setShowDropdown(!showDropdown)} style={{ border: 'none' }}>
        <img src={MoreIcon} alt="More options" style={{ marginRight: '8px' }} />
        <S.ArrowIcon $show={showDropdown.toString()} />
      </S.DropDownButtonStyled>
      {showDropdown && (
        <S.DropDownContent $show={showDropdown.toString()}>
          <S.DropDownItem onClick={() => console.log('수정하기')}>
            수정하기
          </S.DropDownItem>
          <S.DropDownItem onClick={() => console.log('거절하기')}>
            거절하기
          </S.DropDownItem>
          <S.DropDownItem onClick={() => console.log('삭제하기')}>
            삭제하기
          </S.DropDownItem>
        </S.DropDownContent>
      )}
    </S.DropButtonContainer>
  );
}

export default DropdownForAnswer;