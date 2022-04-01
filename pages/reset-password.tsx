import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Field from '../components/Field'
import { AuthContext } from '../context/authContext'
import { useResetPasswordMutation } from '../generated'
import { Button, Flex, FormError } from '../styles'
import * as yup from 'yup'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { GraphQLErrors } from '@apollo/client/errors'
import Image from 'next/image'
import bgImage from '../public/services/space.jpg'
import { errorMessage } from '../utils/errorMessage'

interface IResetPassInputs {
  password: string
  passwordConfirmation: string
}

const ResetPassSchema = yup.object({
  password: yup
    .string()
    .required('Введите пароль')
    .min(8, 'Пароль слишком короткий')
    .max(25, 'Максимум 25 символов')
    .trim(),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
})

const ResetPasswordPage = () => {
  const context = useContext(AuthContext)
  const router = useRouter()
  const code = router.query.code as string
  const [serverErrors, setServerErrors] = useState<GraphQLErrors>([])
  const [fetchResetPassword, { loading }] = useResetPasswordMutation({
    onCompleted({ resetPassword }) {
      context.login(resetPassword)
      toast.success('Пароль был успешно изменен!', { position: 'bottom-left' })
      router.push('/')
    },
    onError({ graphQLErrors }) {
      setServerErrors(graphQLErrors)
    },
    notifyOnNetworkStatusChange: true,
  })
  useEffect(() => {
    if (!code) {
      router.push('/')
    }
  }, [code, router])

  const { handleSubmit, control } = useForm<IResetPassInputs>({
    mode: 'onChange',
    resolver: yupResolver(ResetPassSchema),
  })

  const onSubmit: SubmitHandler<IResetPassInputs> = ({ password, passwordConfirmation }) => {
    fetchResetPassword({
      variables: {
        password,
        passwordConfirmation,
        code,
      },
    })
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>Смена пароля</Title>
        {serverErrors.map((error, inx: number) => (
          <FormError key={inx}>{errorMessage(error.message)}</FormError>
        ))}
        <Field control={control} name='password' type='password' label='Новый пароль' icon='password' />
        <Field control={control} name='passwordConfirmation' type='password' label='Повторите пароль' icon='password' />

        <Flex justify='flex-end'>
          <Button width='100%' variant='contained' disabled={loading} type='submit'>
            Сменить пароль
          </Button>
        </Flex>
      </form>
      <Background>
        <Image priority alt='background' src={bgImage} layout='fill' objectFit='cover' quality={100} />
      </Background>
    </Wrapper>
  )
}

const Title = styled.h2`
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
`

const Background = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: -1;
  &::after {
    content: '';
    display: block;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  form {
    width: 280px;
    background-color: ${({ theme }) => theme.palette.bg.primary};
    padding: 30px 20px;
    margin-top: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 39px -8px rgba(107, 34, 208, 0.99);
  }
`

export default ResetPasswordPage
