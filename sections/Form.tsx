import React from 'react'
import styled, { keyframes } from 'styled-components'
import Field from '../components/Field'
import { Flex, HeadingTitle, Container } from '../styles'
import { Select } from '../components/Select'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Textarea from '../components/Textarea'
import { Parallax } from 'react-parallax'
import { FormApi } from '../utils/form-api'
import { useAppContext } from '../hooks/useAppContext'

export interface IFormInputs {
  telegram: string
  email: string
  name: string
  service: string
  message: string
}

const FormState = {
  telegram: '',
  email: '',
  name: '',
  service: '',
  message: '',
}

const FormSchema = yup.object().shape({
  telegram: yup
    .string()
    .required('Введите Ваш никнейм')
    .matches(/^[A-Za-z\d_]{5,32}$/, 'Некорректный никнейм'),
  email: yup.string().email('Некорректный email').required('Введите Ваш Email'),
  name: yup
    .string()
    .max(20, 'Максимум 20 символов')
    .required('Введите Ваше Имя')
    .matches(/^[a-zA-ZА-Яа-я\s]+$/, 'Введите корректное имя')
    .trim(),
  service: yup.string().required('Выбирите услугу'),
  message: yup.string().max(200, 'Максимум 200 символов').trim(),
})

const Form = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitSuccessful, isSubmitting },
    reset,
    setValue,
  } = useForm<IFormInputs>({
    mode: 'onChange',
    defaultValues: FormState,
    resolver: yupResolver(FormSchema),
  })

  const { services, selectedService, cmsData } = useAppContext()

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset(FormState)
    }
  }, [isSubmitSuccessful, reset])

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    await FormApi.sendForm(data, cmsData.telegramBotToken, selectedService.chatId)
  }

  return (
    <FormWrapper id='form'>
      <Parallax
        strength={200}
        bgClassName='image-parallax'
        className='custom-parallax'
        bgImage={'/form/form.jpeg'}
        bgImageAlt='space'
      >
        <Container style={{ zIndex: 9, position: 'relative' }}>
          <Flex justify='center'>
            <HeadingTitle line='left' mb={40}>
              Заявка
            </HeadingTitle>
          </Flex>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <FormContent>
              <LeftSide>
                <Field control={control} name='telegram' label='Ваш telegram' icon='telegram' />
                <Field control={control} name='email' label='Ваш E-mail' icon='email' />
                <Field control={control} name='name' label='Ваше Имя' icon='user' />
                <Select
                  setValue={setValue}
                  isSubmitSuccessful={isSubmitSuccessful}
                  control={control}
                  name='service'
                  options={services || []}
                  placeholder={'Выберите услугу'}
                />
              </LeftSide>
              <RightSide>
                <Textarea control={control} name='message' placeholder='Ваше сообщение' />
              </RightSide>
            </FormContent>
            <ButtonWrap>
              <SubmitButton disabled={isSubmitting} type='submit'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Отправить
              </SubmitButton>
            </ButtonWrap>
          </StyledForm>
        </Container>
      </Parallax>
    </FormWrapper>
  )
}

export default Form

const ButtonWrap = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
`

const btn4 = keyframes`
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
`

const btn3 = keyframes`
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
`

const btn2 = keyframes`
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
`

const btn1 = keyframes`
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
`

const SubmitButton = styled.button`
  border: none;
  background-color: inherit;
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: ${({ theme }) => theme.palette.primary};
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  letter-spacing: 4px;
  &:disabled {
    opacity: 0.5;
  }
  &:hover {
    background: ${({ theme }) => theme.palette.primary};
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px ${({ theme }) => theme.palette.primary}, 0 0 25px ${({ theme }) => theme.palette.primary};
  }
  &:active {
    opacity: 0.8;
  }
  span {
    position: absolute;
    display: block;
    &:nth-child(1) {
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #8854d0);
      animation: ${btn1} 1s linear infinite;
    }
    &:nth-child(2) {
      top: -100%;
      right: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, transparent, #8854d0);
      animation: ${btn2} 1s linear infinite;
      animation-delay: 0.25s;
    }
    &:nth-child(3) {
      bottom: 0;
      right: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(270deg, transparent, #8854d0);
      animation: ${btn3} 1s linear infinite;
      animation-delay: 0.5s;
    }
    &:nth-child(4) {
      bottom: -100%;
      left: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(360deg, transparent, #8854d0);
      animation: ${btn4} 1s linear infinite;
      animation-delay: 0.75s;
    }
  }
`

const RightSide = styled.div`
  width: 55%;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`

const LeftSide = styled.div`
  width: 45%;
  margin-right: 20px;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-right: 0;
    width: 100%;
  }
`

const FormContent = styled.div`
  display: flex;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-wrap: wrap;
  }
`

const StyledForm = styled.form`
  transition: all 0.2s ease-in-out;
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 630px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 30px;
  box-shadow: 0px 3px 21px 2px rgba(0, 0, 0, 0.36);
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 400px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`
const FormWrapper = styled.div`
  .custom-parallax {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 100px 0;
    background-color: ${({ theme }) => theme.palette.bg.primary};
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 5;
      background: linear-gradient(
          0deg,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0) 20%,
          rgba(0, 0, 0, 0) 80%,
          rgba(0, 0, 0, 1) 100%
        ),
        rgba(0, 0, 0, 0.2);
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      min-height: auto;
      padding: 50px 0;
    }
  }
  .image-parallax {
    filter: brightness(0.8) !important;
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    object-position: left top;
  }
`
