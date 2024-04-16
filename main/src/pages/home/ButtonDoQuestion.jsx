import styled from 'styled-components'
import media, { size } from '../../utils/media'

const Button = styled.button`
  width: 9rem;
  height: 2rem;
  background-color: var(--brown10);
  border-radius: 8px;
  font-size: 0.8;
  color: var(--brown40);
  margin-top: 1rem;
  border: 1px solid var(--brown40);

  &:hover {
    border: 2px solid var(--brown40);
  }
  &:active {
    background-color: var(--brown20);
  }
  &:disabled {
    background-color: var(--brown30);
    color: var(--grayScale10);
    border: none;
  }

  ${media(size.tablet)`
    width: 10rem;
    height: 3rem;
    margin-top:2rem;
    font-size:1rem;
    position: fixed;
    right:5%;
    top:0;
  `}
`
function ButtonDoQuestion() {
  return <Button>질문하러 가기 &rarr; </Button>
}
export default ButtonDoQuestion
