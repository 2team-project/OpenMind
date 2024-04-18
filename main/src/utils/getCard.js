//카드 리스트 불러오는 api
export async function getCards({ offset = 0, limit = 8, sort = 'time' }) {
  const query = `limit=${limit}&offset=${offset}&sort=${sort}`
  const response = await fetch(
    `https://openmind-api.vercel.app/4-1/subjects/?${query}`
  )
  const body = await response.json()
  console.log(body)
  return body
}
