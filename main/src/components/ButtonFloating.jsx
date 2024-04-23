import styled from 'styled-components'
import media, { size } from '../utils/media'

const Button = styled.button`
  width: ${props => props.width || '7.6rem'};
  height: ${props => props.height || '3.3rem'};
  background-color: var(--brown40);
  border-radius: 200px;
  font-size: ${props => props.fontSize || '1.25rem'};
  color: var(--grayScale10);
  box-shadow:
    -2px 2px 4px rgba(0, 0, 0, 0.25),
    2px 2px 4px rgba(0, 0, 0, 0.25);

  ${media(size.tablet)`
    width: ${props => props.widthTablet || '13rem'};
    height: ${props => props.heightTablet || '3.3rem'};
    font-size: ${props => props.fontSizeTablet || '1.25rem'};
    &:after {
      content: ${props => `"${props.afterContent || '하기'}"`};
    }
  `}
`

function ButtonFloating({ label = "질문 작성", width, height, fontSize, widthTablet, heightTablet, fontSizeTablet, afterContent }) {
  return <Button 
            width={width} height={height} fontSize={fontSize}
            widthTablet={widthTablet} heightTablet={heightTablet} fontSizeTablet={fontSizeTablet}
            afterContent={afterContent}>
            {label}
         </Button>;
}

export default ButtonFloating
