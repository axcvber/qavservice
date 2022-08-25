import React from 'react'
import styled, { css } from 'styled-components'
import { Controller } from 'react-hook-form'
import { Error } from '../../styles'

interface ITextarea {
  name: string
  placeholder: string
  control: any
}

const Textarea: React.FC<ITextarea> = ({ name, placeholder, control }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <StyledTextarea hasValue={!!field.value} isError={!!error} {...field} placeholder={placeholder} />
          {error && <Error>{error.message}</Error>}
        </div>
      )}
    />
  )
}

export default Textarea

const StyledTextarea = styled.textarea<{ hasValue: boolean; isError: boolean }>`
  border: none;
  resize: none;
  outline: none;
  border-radius: 5px;
  width: 100%;
  height: 150px;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.purple[1]};
  border: 2px solid transparent;
  color: #fff;
  &::placeholder {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.white};
  }
  ${({ hasValue, theme }) =>
    hasValue &&
    css`
      border-color: ${theme.colors.purple[0]};
    `}

  ${({ isError, theme }) =>
    isError &&
    css`
      border-color: ${theme.colors.error};
      color: ${theme.colors.error};
    `}
`
