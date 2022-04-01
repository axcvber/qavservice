import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Field from '../Field'
import { Button, Flex, FormError } from '../../styles'
import { useUserRegisterMutation } from '../../generated'
import { GraphQLErrors } from '@apollo/client/errors'
import Modal from '.'
import styled from 'styled-components'
import { useModal } from '../../hooks/useModal'
import { errorMessage } from '../../utils/errorMessage'

interface IRegisterInputs {
  username: string
  email: string
  password: string
}

const RegisterSchema = yup.object().shape({
  username: yup
    .string()
    .required('Введите Ваш Логин')
    .min(4, 'Логин слишком короткий')
    .max(20, 'Максимум 20 символов')
    .trim(),
  email: yup.string().email('Некорректный email').required('Введите Ваш Email'),
  password: yup
    .string()
    .required('Введите Ваш пароль')
    .min(8, 'Пароль слишком короткий')
    .max(25, 'Максимум 25 символов')
    .trim(),
})

const RegisterModal = () => {
  const { handleSubmit, control, getValues } = useForm<IRegisterInputs>({
    mode: 'onChange',
    resolver: yupResolver(RegisterSchema),
  })
  const { isOpen, hideModal } = useModal()
  const [serverErrors, setServerErrors] = useState<GraphQLErrors>([])
  const [fetchRegister, { loading }] = useUserRegisterMutation({
    onCompleted() {
      setServerErrors([])
      hideModal()
      toast.warn(
        <div>
          <p style={{ fontWeight: 600 }}>Подтвердите вашу почту!</p>
          <SendAgainLabel onClick={onResendConfirmLink}>Отправить повторное письмо</SendAgainLabel>
        </div>,
        {
          position: 'top-center',
          autoClose: false,
        }
      )
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors)
      setServerErrors(graphQLErrors)
    },
    notifyOnNetworkStatusChange: true,
  })

  const onResendConfirmLink = async () => {
    try {
      const response = await fetch(`${process.env.API}/api/auth/send-email-confirmation`, {
        method: 'POST',
        body: JSON.stringify({
          email: getValues('email'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error(response.status.toString())
      }
      toast.dismiss()
      toast.success('Письмо успешно отправлено!')
    } catch (error) {
      toast.error('Произошла ошибка :(')
      console.log(error.message)
    }
  }

  const onSubmit: SubmitHandler<IRegisterInputs> = ({ username, email, password }) => {
    fetchRegister({
      variables: {
        username,
        email,
        password,
      },
    })
  }

  return (
    <Modal open={isOpen} onClose={hideModal} title='Регистрация'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverErrors.map((error, inx: number) => (
          <FormError key={inx}>{errorMessage(error.message)}</FormError>
        ))}
        <Field control={control} name='username' label='Введите логин' icon='user' />
        <Field control={control} name='email' label='Введите Email' icon='email' />
        <Field control={control} name='password' label='Придумайте пароль' icon='password' type='password' />
        <Flex justify='center'>
          <Button variant='contained' disabled={loading} type='submit'>
            Зарегистрироваться
          </Button>
        </Flex>
      </form>
    </Modal>
  )
}

const SendAgainLabel = styled.span`
  font-size: 14px;
  text-decoration: underline;
  &:hover {
    color: gray;
  }
`

export default RegisterModal
