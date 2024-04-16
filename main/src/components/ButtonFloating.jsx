import styled from 'styled-components'
import media, { size } from '../utils/media'

const Button = styled.button`
  width: 7.6rem;
  height: 3.3rem;
  background-color: var(--brown40);
  border-radius: 200px;
  font-size: 1.25rem;
  color: var(--grayScale10);
  box-shadow:
    -2px 2px 4px rgba(0, 0, 0, 0.25),
    2px 2px 4px rgba(0, 0, 0, 0.25);

  ${media(size.tablet)`
    width:13rem;
    &:after {
        content:"하기";
    }
  `}
`

function ButtonFloating() {
  return <Button>질문 작성</Button>
}

export default ButtonFloating
