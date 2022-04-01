import React from 'react'
import styled, { css } from 'styled-components'
import { Error } from '../styles'
import { Controller, useController, useForm } from 'react-hook-form'
import { BiHide, BiShow } from 'react-icons/bi'
import { BiUser } from 'react-icons/bi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineMail } from 'react-icons/ai'
import { FaTelegramPlane } from 'react-icons/fa'

interface IField {
  name: string
  type?: string
  label: string
  icon: 'email' | 'password' | 'telegram' | 'user'
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
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'email':
        return <AiOutlineMail />

      case 'password':
        return <RiLockPasswordLine />

      case 'telegram':
        return <FaTelegramPlane />

      case 'user':
        return <BiUser />

      default:
        return null
    }
  }

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
      <FieldBox>
        <FieldWrap>
          <Input
            {...field}
            isActive={isActive}
            onBlur={(e) => {
              field.onBlur()
              checkValue(e.target.value)
            }}
            type={showPassword ? 'text' : type}
          />
          <Label>
            {renderIcon(icon)}
            {label}
          </Label>
          {type === 'password' && (
            <ShowPassword onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <BiShow /> : <BiHide />}
            </ShowPassword>
          )}
        </FieldWrap>
        {error && <Error>{error.message}</Error>}
      </FieldBox>
    </>
  )
}

export default Field

const ShowPassword = styled.div`
  user-select: none;
  cursor: pointer;
  width: 18px;
  height: 18px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5px;
  svg {
    fill: ${({ theme }) => theme.palette.text.secondary};
    font-size: 20px;
  }
`

const Label = styled.label`
  display: flex;
  align-items: flex-end;
  position: absolute;
  left: 5px;
  bottom: 0;
  padding: 10px 0;
  font-size: 15px;
  color: ${({ theme }) => theme.palette.text.secondary};
  pointer-events: none;
  transition: 0.2s ease;
  svg {
    transition: 0.2s ease;
    font-size: 20px;
    fill: ${({ theme }) => theme.palette.text.secondary};
    margin-right: 5px;
  }
`

const Input = styled.input<{ isActive: boolean }>`
  width: 100%;
  padding: 10px 35px 10px 5px;
  font-size: 16px;
  color: #fff;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.palette.text.secondary};
  outline: none;
  background: transparent;
  ${({ isActive }) =>
    isActive &&
    css`
      ~ ${Label} {
        padding: 0 0;
        bottom: 100%;
        left: 0;
        font-size: 13px;
        svg {
          font-size: 16px;
        }
      }
    `}

  &:focus {
    ~ ${Label} {
      padding: 0 0;
      bottom: 100%;
      left: 0;
      font-size: 13px;
      svg {
        font-size: 16px;
      }
    }
  }
`

const FieldWrap = styled.div`
  position: relative;
`

const FieldBox = styled.div`
  margin-bottom: 25px;
`
