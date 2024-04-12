import { css } from 'styled-components'
// 장치별 사이즈 정의
export const size = {
  tablet: 768,
  desktop: 1024,
}

const media =
  (size) =>
  (...args) => css`
    @media (min-width: ${size}px) {
      ${css(...args)}
    }
  `

export default media
