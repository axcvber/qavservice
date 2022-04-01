import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Flex, FormError } from '../../styles'
import Field from '../Field'
import { toast } from 'react-toastify'
import { useForgotPasswordMutation } from '../../generated'
import { errorMessage } from '../../utils/errorMessage'
import styled from 'styled-components'
import { GraphQLErrors } from '@apollo/client/errors'

import Modal from '.'
import { useModal } from '../../hooks/useModal'

interface IResetPasswordInputs {
  email: string
}

const ResetPasswordSchema = yup.object().shape({
  email: yup.string().email('Некорректный email').required('Введите Ваш Email'),
})

const ResetPasswordModal = () => {
  const { handleSubmit, control, getValues } = useForm<IResetPasswordInputs>({
    mode: 'onChange',
    resolver: yupResolver(ResetPasswordSchema),
  })
  const { isOpen, hideModal } = useModal()
  const [serverErrors, setServerErrors] = useState<GraphQLErrors>([])
  const [formStep, setFormStep] = useState<number>(0)

  const [fetchResetPassword, { loading }] = useForgotPasswordMutation({
    onCompleted() {
      setServerErrors([])
      setFormStep(1)
    },
    onError({ graphQLErrors }) {
      setServerErrors(graphQLErrors)
    },
    notifyOnNetworkStatusChange: true,
  })

  const onSubmit: SubmitHandler<IResetPasswordInputs> = ({ email }) => {
    fetchResetPassword({
      variables: {
        email,
      },
    })
  }

  const onResendLink = (email: string) => {
    fetchResetPassword({
      variables: {
        email,
      },
    })
    hideModal()
    toast.success('Отправленно', { position: 'bottom-left' })
  }

  return (
    <Modal open={isOpen} onClose={hideModal} title='Востановление пароля'>
      <>
        {formStep === 0 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {serverErrors.map((error, inx: number) => (
              <FormError key={inx}>{errorMessage(error.message)}</FormError>
            ))}
            <Field control={control} name='email' label='Ваш Email' icon='email' />
            <Flex justify='flex-end'>
              <Button width='100%' variant='contained' disabled={loading} type='submit'>
                Восстановить
              </Button>
            </Flex>
          </form>
        )}
        {formStep === 1 && (
          <ConfirmedBlock>
            {serverErrors.map((error, inx: number) => (
              <FormError key={inx}>{errorMessage(error.message)}</FormError>
            ))}
            <p>{`Письмо отправлено на почту ${getValues('email')}`} </p>
            <span onClick={() => onResendLink(getValues('email'))}>Отправить повторное письмо</span>
          </ConfirmedBlock>
        )}
      </>
    </Modal>
  )
}

const ConfirmedBlock = styled.div`
  color: #fff;
  text-align: center;
  p {
    margin-bottom: 10px;
  }
  span {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.secondary};
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.palette.text.primary};
    }
  }
`

export default ResetPasswordModal
