import { useRouter } from 'next/router'
import styled from 'styled-components'
import Button from '../styles/layout/Button'
import { Container } from '../styles/layout/Container'
import Text from '../styles/layout/Text'

const Custom404 = () => {
  const router = useRouter()

  const handleToHome = () => {
    router.push('/')
  }

  return (
    <Wrapper>
      <Container>
        <Content>
          <Text as='h2' fontSize='xl' textAlign='center'>
            404 | Страница не найдена
          </Text>
          <Button onClick={handleToHome} variant='contained'>
            на главную
          </Button>
        </Content>
      </Container>
    </Wrapper>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin-bottom: 20px;
  }
`

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`

export default Custom404
