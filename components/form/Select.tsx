import React from 'react'
import styled, { css } from 'styled-components'
import { Controller } from 'react-hook-form'
import { useOnClickOutside } from '../../hooks/useClickOutside'
import { Arrow } from '../../styles'
import { motion, AnimatePresence } from 'framer-motion'
interface SelectProps {
  options: string[]
  name: string
  placeholder: string
  control: any
  onSelectOption: (label: string) => void
  value: string
}

export const Select: React.FC<SelectProps> = ({ name, options, value, placeholder, control, onSelectOption }) => {
  const [isOpen, setOpen] = React.useState<boolean>(false)
  const selectRef = React.useRef(null)
  useOnClickOutside(selectRef, () => setOpen(false))

  const handleSelect = (label: string) => {
    onSelectOption(label)
    setOpen(false)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ fieldState: { error } }) => (
        <CustomSelect ref={selectRef}>
          <SelectTrigger
            isError={!!error}
            isSelected={!!value}
            onClick={() => {
              setOpen((prev) => !prev)
            }}
          >
            <span>{options.find((item) => item === value) || placeholder}</span>
            <Arrow isOpen={isOpen} isError={!!error} />
          </SelectTrigger>

          <AnimatePresence exitBeforeEnter>
            {isOpen && (
              <SelectDropdown
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -10 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ type: 'spring', duration: 0.4, velocity: 2 }}
              >
                {options.map((item, inx) => (
                  <SelectOption
                    isActive={value === item}
                    key={`select-option-${inx}`}
                    onClick={() => handleSelect(item)}
                  >
                    <span>{item}</span>
                  </SelectOption>
                ))}
              </SelectDropdown>
            )}
          </AnimatePresence>
        </CustomSelect>
      )}
    />
  )
}

const CustomSelect = styled.div`
  position: relative;
  user-select: none;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-bottom: 25px;
  }
`
const SelectTrigger = styled.div<{ isError: boolean; isSelected: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 45px;
  max-height: auto;
  outline: 0;
  background-color: ${({ theme }) => theme.colors.purple[1]};
  border: 2px solid transparent;
  border-radius: 5px;
  color: #fff;
  padding: 10px 15px;
  line-height: 1.5;
  span {
    padding-right: 15px;
    font-size: 15px;
  }

  ${({ isSelected, theme }) =>
    isSelected &&
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

const SelectDropdown = styled(motion.ul)`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.purple[0]};
  color: ${({ theme }) => theme.colors.white};
  z-index: 9;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow} rgba(0, 0, 0, 0.3);
`
const SelectOption = styled.li<{ isActive: boolean }>`
  padding: 12px 30px 12px 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  span {
    line-height: 1.5;
    font-size: 16px;
  }
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: rgba(0, 0, 0, 0.3);
      color: #fff;
    `}
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
  }
`
