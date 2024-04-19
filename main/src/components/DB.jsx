import ModifyImg from '../../public/icons/edit.svg'
import CloseImg from '../../public/icons/close.svg'

function DB() {
  return (
    <>
      {isOpen && (
        <ul>
          <li>
            <img src={ModifyImg} alt="수정하기" />
            <p>수정하기</p>
          </li>
          <li>
            <img src={CloseImg} alt="삭제하기" />
            <p>삭제하기</p>
          </li>
        </ul>
      )}
    </>
  )
}

export default DB
