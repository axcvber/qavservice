import React from 'react'
import { Controller } from 'react-hook-form'
import styled from 'styled-components'

interface IRadioButton {
  name: string
  label: string
  control: any
}

const RadioButton: React.FC<IRadioButton> = ({ name, label, control }) => {
  return (
    <Controller
      defaultValue={''}
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Wrapper>
          <Label isError={!!error}>
            <Input {...field} type='radio' value={label} />
            <Mark isError={!!error} />
            <span>{label}</span>
          </Label>
        </Wrapper>
      )}
    />
  )
}

const Wrapper = styled.div`
  display: inline-block;
`

const Mark = styled.span<{ isError: boolean }>`
  display: inline-block;
  position: relative;
  border: 3px solid ${({ isError, theme }) => (isError ? theme.colors.error : theme.colors.turquoise)};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: #37e6fe;
    opacity: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    transition: all 110ms;
  }
`

const Input = styled.input`
  position: absolute;
  visibility: hidden;
  display: none;
  &:checked + ${Mark} {
    &::after {
      width: 10px;
      height: 10px;
      opacity: 1;
    }
  }
`

const Label = styled.label<{ isError: boolean }>`
  display: flex;
  cursor: pointer;
  padding: 5px 10px 5px 0;
  position: relative;
  align-items: center;
  user-select: none;
  span {
    font-size: 14px;
    ${({ theme }) => theme.fonts.OswaldRegular}
    color: ${({ theme, isError }) => (isError ? theme.colors.error : theme.colors.white)};
  }
`

export default RadioButton
