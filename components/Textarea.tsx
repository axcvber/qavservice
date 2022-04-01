import React from 'react'
import styled from 'styled-components'
import { Controller } from 'react-hook-form'
import { Error } from '../styles'

interface ITextarea {
  name: string
  placeholder: string
  height?: number
  control: any
}

const Textarea: React.FC<ITextarea> = ({ name, placeholder, height, control }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <StyledTextarea {...field} placeholder={placeholder} height={height}></StyledTextarea>
          {error && <Error>{error.message}</Error>}
        </>
      )}
    />
  )
}

export default Textarea

const StyledTextarea = styled.textarea<{ height?: number }>`
  border: none;
  resize: none;
  outline: none;
  border-radius: 5px;
  width: 100%;
  height: ${({ height }) => (height ? height + 'px' : '100%')};
  padding: 15px;
  background-color: rgba(155, 155, 155, 0.1);
  border-bottom: 2px solid ${({ theme }) => theme.palette.text.secondary};
  color: #fff;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 100px;
  }
  &::placeholder {
    font-size: 15px;

    color: ${({ theme }) => theme.palette.text.secondary};
  }
`
