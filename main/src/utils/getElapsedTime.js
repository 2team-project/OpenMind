import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

function getElapsedTime(date) {
  const d = new Date(date) // 질문 시간
  const now = Date.now() // 현재 시간

  const diff = (now - d.getTime()) / 1000 // 현재 시간과의 차이(초)

  if (diff < 60 * 1) {
    // 1분 미만일땐 방금 전 표기
    return '방금 전'
  } else if (diff < 60 * 60 * 24 * 30) {
    // 한달 미만일땐 n일 전 표기
    return formatDistanceToNow(d, { addSuffix: true, locale: ko })
  } else if (diff < 60 * 60 * 24 * 30 * 12) {
    // 한달 넘어가면 n달 전
    const monthsAgo = Math.floor(diff / (60 * 60 * 24 * 30))
    return `${monthsAgo}달 전`
  } else if (diff >= 60 * 60 * 24 * 30 * 12) {
    // 1년 넘어가면 n년 전
    const yearsAgo = Math.floor(diff / (60 * 60 * 24 * 30 * 12))
    return `${yearsAgo}년 전`
  } else return ''
  // 예외처리
}
export default getElapsedTime
