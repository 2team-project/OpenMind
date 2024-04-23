import ListNav from './ListNav'
import CardListManager from '../../components/CardListManager'
import styled from 'styled-components'

const Container = styled.div`
  background-size: contain;
  background: var(--Grayscale-20, #f9f9f9);
`

function ListPage() {
  return (
    <Container>
      <ListNav />
      <CardListManager />
    </Container>
  )
}

export default ListPage
