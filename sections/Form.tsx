import React from 'react'
import styled from 'styled-components'
import Field from '../components/form/Field'
import { Select } from '../components/form/Select'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Textarea from '../components/form/Textarea'
import { useAppContext } from '../hooks/useAppContext'
import { Container } from '../styles/layout/Container'
import Heading from '../styles/layout/Heading'
import Flex from '../styles/layout/Flex'
import Button from '../styles/layout/Button'
import RadioButton from '../components/form/RadioButton'
import { BiUser } from 'react-icons/bi'
import { FaTelegramPlane } from 'react-icons/fa'
import { ServiceEntity } from '../generated'
import BackgroundTitle from '../components/BackgroundTitle'
import Box from '../styles/layout/Box'
import { toast } from 'react-toastify'
import BackgroundImage from '../components/BackgroundImage'
export interface IFormInputs {
  telegram: string
  name: string
  category: string
  service: string
  message: string
}

const FormState = {
  telegram: '',
  name: '',
  category: '',
  service: '',
  message: '',
}

const FormSchema = yup.object().shape({
  telegram: yup
    .string()
    .required('Введите Ваш никнейм')
    .matches(/^[A-Za-z\d_]{5,32}$/, 'Некорректный никнейм'),
  name: yup
    .string()
    .max(20, 'Максимум 20 символов')
    .required('Введите Ваше Имя')
    .matches(/^[a-zA-ZА-Яа-я\s]+$/, 'Введите корректное имя')
    .trim(),
  category: yup.string().required(),
  service: yup.string().required(),
  message: yup.string().max(200, 'Максимум 200 символов').trim(),
})

interface IForm {
  services: Array<ServiceEntity>
}

const Form: React.FC<IForm> = ({ services }) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitSuccessful, isSubmitting },
    reset,
    setValue,
  } = useForm<IFormInputs>({
    defaultValues: FormState,
    resolver: yupResolver(FormSchema),
    shouldFocusError: false,
  })
  const { selectedService, setSelectedService } = useAppContext()
  const selectOptions = services.map((item) => item.attributes.title)

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset(FormState)
      setSelectedService(null)
    }
  }, [isSubmitSuccessful, reset])

  React.useEffect(() => {
    if (selectedService) {
      setValue('category', selectedService, { shouldValidate: true, shouldDirty: true })
    }
  }, [selectedService, setValue])

  const onSelectOption = (label: string) => {
    setSelectedService(label)
  }

  const onSubmit: SubmitHandler<IFormInputs> = async (formData) => {
    try {
      const response = await fetch(`${process.env.API}/api/clients`, {
        method: 'POST',
        body: JSON.stringify({
          data: formData,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error(response.status.toString())
      }
      toast.success('Заявка успешно отправлена!')
      console.log('success')
    } catch (error) {
      toast.error('Произошла ошибка, попробуйте позже')
      console.error(error)
    }
  }

  return (
    <Box as='section' id='form' my={{ default: 5, lg: 7 }} position='relative'>
      <Container>
        <Flex justifyContent='center'>
          <Heading line='bottom' mb={40}>
            Заявка
          </Heading>
        </Flex>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Field control={control} name='telegram' label='Ваш telegram' icon={<FaTelegramPlane />} />
          <Field control={control} name='name' label='Ваше Имя' icon={<BiUser />} />
          <Select
            name='category'
            control={control}
            value={selectedService}
            onSelectOption={onSelectOption}
            options={selectOptions || []}
            placeholder={'Выберите услугу'}
          />
          {selectedService && (
            <Flex flexWrap='wrap' gap={2} justifyContent='space-between'>
              {services
                .find((item) => item.attributes.title === selectedService)
                .attributes.subservices.map((item, inx) => (
                  <RadioButton key={inx} name={'service'} control={control} label={item.name} />
                ))}
            </Flex>
          )}
          <Textarea control={control} name='message' placeholder='Ваше сообщение' />
          <Flex justifyContent='flex-end'>
            <Button disabled={isSubmitting} type='submit'>
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </Button>
          </Flex>
        </StyledForm>
      </Container>
      <BackgroundTitle variant='left-vertical' title={'Заявка'} />
      <BackgroundImage variant='end' />
    </Box>
  )
}

export default Form

const StyledForm = styled.form`
  transition: all 0.2s ease-in-out;
  position: relative;
  border-radius: 20px;
  max-width: 400px;
  margin: 0 auto;
  background-color: #6215c6;
  padding: 40px 35px;
  box-shadow: 0px 3px 21px 2px rgba(0, 0, 0, 0.36);
  display: flex;
  flex-direction: column;
  gap: 30px;
  ${({ theme }) => theme.fonts.OswaldRegular};
  button {
    font-family: 'Batman Forever Alternate Cyr', sans-serif;
  }
`
