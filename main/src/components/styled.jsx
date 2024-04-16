import styled from 'styled-components'
import media, { size } from '../utils/media'
import ArrowUpImg from '../../public/icons/arrowUp.svg'
import ArrowDownImg from '../../public/icons/arrowDown.svg'

export const Head = styled.div`
  position: relative;
`

export const ListText = styled.h1`
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Actor;
  font-size: 24px;
  font-weight: 400;
  line-height: 30px;

  ${media(size.tablet)`
    font-size: 40px;
  `}
`
export const DropButtonContainer = styled.div`
  position: relative;
`
export const DropDownButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  height: 34px;
  color: ${({ $show }) => ($show === 'true' ? '#000' : '#818181')};
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  font-feature-settings:
    'clig' off,
    'liga' off;
  border-radius: 8px;
  border: 1px solid ${({ $show }) => ($show === 'true' ? '#000' : '#818181')};
  background: var(--Grayscale-10, #fff);
  cursor: pointer;
`

export const DropDownContent = styled.div`
  display: ${({ $show }) => ($show === 'true' ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  margin-top: 3px;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  background-color: #fff;
  z-index: 1;
  border-radius: 8px;
  border: 1px solid var(--Grayscale-30, #cfcfcf);
`

export const DropDownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    color: var(--Blue-50, #1877f2);
  }
`

export const ArrowIcon = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  background-image: url(${({ $show }) =>
    $show === 'true' ? ArrowUpImg : ArrowDownImg});
  background-size: cover;
  path {
    fill: ${({ $show }) => ($show === 'true' ? '#000' : 'currentColor')};
  }
`

export const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 156px;
  padding: 16px;
  height: 168px;
  justify-content: space-between;
  margin-top: 16px;
  border-radius: 16px;
  border: 1px solid var(--Grayscale-40, #818181);
  background: var(--Grayscale-10, #fff);
  margin: 0;

  ${media(size.tablet)`
    height: 187px;
  `}

  ${media(size.desktop)`
    
  `}
`

export const ItemImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 48px;

  ${media(size.tablet)`
    width: 60px;
    height: 60px;
  `}
`

export const ItemName = styled.h1`
  color: var(--Grayscale-60, #000);
  font-size: 18px;
  margin-top: 12px;
  font-weight: 400;
  line-height: 24px;

  ${media(size.tablet)`
    font-size: 20px;
    line-height: 25px;
  `}
`

export const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: var(--Grayscale-40, #818181);
`

export const Question = styled.div`
  display: flex;
`
export const QuestionImg = styled.img`
  width: 16px;
  height: 16px;
`
export const CardList = styled.div``

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  gap: 16px;
  padding: 0 24px;
  margin-top: 18px;

  ${media(size.tablet)`
    grid-template-columns: repeat(3, minmax(186px, 220px));
    gap: 20px;
    padding: 0 32px;
    margin-top: 30px;
  `}
  @media (min-width: 868px) {
    grid-template-columns: repeat(4, minmax(186px, 220px));
  }

  ${media(size.desktop)`
  `}
`
export const CardListDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  gap: 20px;

  ${media(size.tablet)`
    flex-direction: row;
    margin: 0 50px;
    margin-top: 44px;
  `}
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 54px 24px 0;

  ${media(size.tablet)`
    flex-direction: column;
    align-items: center;
    gap: 12px;
  `}
`

export const PageButton = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $active }) => ($active ? '#542F1A' : '#818181')};
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Actor;
  font-weight: 400;
  line-height: 25px;
  width: 40px;
  height: 40px;
  cursor: pointer;

  &:hover {
    color: var(--Grayscale-60, #000);
  }
`

export const PagenationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 31px;
`

export const PrevButton = styled.button`
  width: 40px;
  height: 40px;
  &:hover {
    color: var(--Grayscale-60, #000);
  }
`
export const PrevImg = styled.img`
  width: 15px;
  height: 15px;
`

export const NextButton = styled.button`
  width: 40px;
  height: 40px;
`
export const NextImg = styled.img`
  width: 15px;
  height: 15px;
`
