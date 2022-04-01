import React, { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Flex, FormError } from '../../styles'
import Field from '../Field'
import { toast } from 'react-toastify'
import { useUserLoginMutation } from '../../generated'
import { AuthContext } from '../../context/authContext'
import { errorMessage } from '../../utils/errorMessage'
import styled from 'styled-components'
import { BsInfoCircle } from 'react-icons/bs'
import { GraphQLErrors } from '@apollo/client/errors'
import Modal from '.'
import { useModal } from '../../hooks/useModal'
import { MODAL_TYPES } from '../../context/modalContext'

interface ILoginInputs {
  email: string
  password: string
}

const LoginSchema = yup.object().shape({
  email: yup.string().required('Введите username или email'),
  password: yup.string().required('Введите пароль').trim(),
})

const LoginModal = () => {
  const { isOpen, hideModal, showModal } = useModal()
  const context = useContext(AuthContext)
  const [serverErrors, setServerErrors] = useState<GraphQLErrors>([])
  const [fetchLogin, { loading }] = useUserLoginMutation({
    onCompleted({ login }) {
      setServerErrors([])
      context.login(login)
      toast.success('Вход выполнен успешно', { position: 'bottom-left' })
      hideModal()
    },
    onError({ graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors)
      setServerErrors(graphQLErrors)
    },
    notifyOnNetworkStatusChange: true,
  })

  const { handleSubmit, control } = useForm<ILoginInputs>({
    mode: 'onChange',
    resolver: yupResolver(LoginSchema),
  })

  const onResetPasswordModal = () => {
    showModal(MODAL_TYPES.RESET_PASS_MODAL)
  }

  const onSubmit: SubmitHandler<ILoginInputs> = ({ email, password }) => {
    fetchLogin({
      variables: {
        identifier: email,
        password: password,
      },
    })
  }

  return (
    <Modal open={isOpen} onClose={hideModal} title='Войти'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverErrors?.map((error, inx: number) => (
          <FormError key={inx}>{errorMessage(error.message)}</FormError>
        ))}
        <Field control={control} name='email' label='Логин' icon='user' />
        <Field control={control} name='password' label='Пароль' icon='password' type='password' />
        <Flex justify='flex-end'>
          <Button width='100%' variant='contained' disabled={loading} type='submit'>
            Войти
          </Button>
        </Flex>
        <ResetPasswordLabel onClick={onResetPasswordModal}>
          <BsInfoCircle fontSize={16} />
          <span>Забыли пароль?</span>
        </ResetPasswordLabel>
      </form>
    </Modal>
  )
}

const ResetPasswordLabel = styled.div`
  padding-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 15px;
  cursor: pointer;
  span {
    margin-left: 5px;
  }
  &:hover {
    text-decoration: underline;
  }
`

export default LoginModal
