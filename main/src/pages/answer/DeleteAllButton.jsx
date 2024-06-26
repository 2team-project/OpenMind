import styled from 'styled-components'
import media, { size } from '../../utils/media'

const StyledDeleteButton = styled.button`
  width: 4.375rem;
  height: 1.5625rem;
  color: var(--Grayscale-10, #fff);
  font-family: Pretendard;
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5625rem;
  background-color: var(--brown40);
  border-radius: 200px;
  color: var(--grayScale10);
  box-shadow:
    -2px 2px 4px rgba(0, 0, 0, 0.25),
    2px 2px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${media(size.tablet)` 
    width: 6.25rem;
    height: 2.1875rem;
    font-size: 0.9375rem;
  `}
`

const DeleteAllButton = ({ onClick }) => {
  return (
    <StyledDeleteButton onClick={onClick}>
      삭제하기
    </StyledDeleteButton>
  );
};

export default DeleteAllButton
