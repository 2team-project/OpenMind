import ButtonShare from '../../components/ButtonShare'
import getElapsedTime from '../../utils/getElapsedTime'

function PostPage() {
  return (
    <>
      <ButtonShare />
      <div>
        <p>{getElapsedTime('2024-02-18T11:20:13.607757Z')}</p>
      </div>
    </>
  )
}

export default PostPage
