import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import Spinner from '../public/spinner.svg'
import { H3 } from '../styles'

const Activate = () => {
  const router = useRouter()
  const confirmation = router.query.confirmation as string

  const onCheckConfirmLink = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.API}/api/auth/email-confirmation?confirmation=${confirmation}`)
      if (!response.ok) {
        throw new Error(response.status.toString())
      }
      toast.success('Ваша почта подтверждена, можете авторизоваться')
    } catch (error) {
      toast.error('Неверная ссылка')
    }
  }, [confirmation])

  React.useEffect(() => {
    if (confirmation) {
      onCheckConfirmLink()
      router.push('/')
    } else {
      router.push('/')
    }
  }, [confirmation, router, onCheckConfirmLink])

  return (
    <Wrapper>
      <Loader>
        <Spinner />
      </Loader>
      <H3 margin='20px 0'>Подтверждение почты...</H3>
    </Wrapper>
  )
}

const Loader = styled.div`
  width: 100px;
  height: 100px;
  svg {
    width: 100%;
    height: 100%;
    circle {
      fill: ${({ theme }) => theme.palette?.primary};
    }
  }
`

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.bg.primary};
`

export default Activate
