import React, { ReactElement } from 'react'
import styled, { css } from 'styled-components'
import { Error } from '../../styles'
import { useController } from 'react-hook-form'
interface IField {
  name: string
  type?: string
  label: string
  icon: ReactElement
  control: any
}

const Field: React.FC<IField> = ({ name, control, type = 'text', label, icon }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '',
  })

  const [isActive, setActive] = React.useState<boolean>(false)

  const checkValue = (value: string) => {
    if (value.trim() != '') {
      setActive(true)
    } else {
      setActive(false)
    }
  }

  React.useEffect(() => {
    checkValue(field.value)
  }, [field.value])

  return (
    <>
      <div>
        <FieldWrap>
          <Input
            {...field}
            isActive={isActive}
            isError={!!error}
            onBlur={(e) => {
              field.onBlur()
              checkValue(e.target.value)
            }}
            type={type}
          />
          <Label>
            {icon}
            {label}
          </Label>
        </FieldWrap>
        {error && <Error>{error.message}</Error>}
      </div>
    </>
  )
}

export default Field

const Label = styled.label`
  display: flex;
  align-items: center;
  position: absolute;
  left: 10px;
  bottom: 0;
  padding: 10px 0;
  font-size: 15px;
  color: #fff;
  pointer-events: none;
  transition: all 0.2s ease;
  svg {
    font-size: 20px;
    margin-right: 7px;
    transition: all 0.2s ease;
  }
`

const Input = styled.input<{ isActive: boolean; isError: boolean }>`
  width: 100%;
  padding: 10px 35px 10px 15px;
  font-size: 16px;
  color: #fff;
  outline: none;
  background: transparent;
  border: 2px solid transparent;
  background-color: ${({ theme }) => theme.colors.purple[1]};
  border-radius: 5px;

  ${({ isError }) =>
    isError &&
    css`
      border-color: ${({ theme }) => theme.colors.error};
      ~ ${Label} {
        color: ${({ theme }) => theme.colors.error};
      }
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${({ theme }) => theme.colors.purple[0]};

      ~ ${Label} {
        padding: 0 0;
        bottom: 110%;
        left: 0;
        font-size: 13px;
        color: #9873ff;
        svg {
          color: #9873ff;
          font-size: 16px;
        }
      }
    `}

  &:focus {
    border-color: ${({ theme }) => theme.colors.purple[0]};
    ~ ${Label} {
      padding: 0 0;
      bottom: 110%;
      left: 0;
      font-size: 13px;
      color: #9873ff;
      svg {
        color: #9873ff;
        font-size: 16px;
      }
    }
  }
`

const FieldWrap = styled.div`
  position: relative;
`
