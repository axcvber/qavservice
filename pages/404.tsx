import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import image from '../public/404.png'
import { Button } from '../styles'

const Custom404 = () => {
  const router = useRouter()

  const handleToHome = () => {
    router.push('/')
  }

  return (
    <Wrapper>
      <Content>
        <h2>404 | Страница не найдена</h2>
        <Button onClick={handleToHome} variant='contained'>
          на главную
        </Button>
      </Content>
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
