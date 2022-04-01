import React from 'react'
import styled, { css } from 'styled-components'
import { Controller, UseFormSetValue } from 'react-hook-form'
import { useOnClickOutside } from '../hooks/useClickOutside'
import { Arrow, Error } from '../styles'
import { IFormInputs } from '../sections/Form'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppContext } from '../hooks/useAppContext'
import { ServicesOptions } from '../context/appContext'

const CustomSelect = styled.div`
  position: relative;
  user-select: none;
  width: 100%;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-bottom: 25px;
  }
`
const SelectTrigger = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 45px;
  max-height: auto;
  outline: 0;
  background-color: rgba(155, 155, 155, 0.1);
  border-radius: 5px;
  color: ${({ theme }) => theme.palette?.text.secondary};
  border-bottom: 2px solid ${({ theme }) => theme.palette?.text.secondary};
  padding: 10px 15px;
  line-height: 1.5;
  span {
    padding-right: 15px;
    font-size: 15px;
  }
`

const SelectDropdown = styled(motion.ul)`
  position: absolute;
  bottom: 100%;
  /* margin-bottom: 10px; */
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.palette.bg.secondary};
  color: ${({ theme }) => theme.palette.text.primary};
  z-index: 9;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow} rgba(0, 0, 0, 0.3);
  /* &.options-enter {
    opacity: 0;
    margin-bottom: 0;
  }
  &.options-enter-active {
    margin-bottom: 10px;
    opacity: 1;
    transition: all 0.3s ease-in-out;
  }
  &.options-exit-active {
    margin-bottom: 0;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  } */
`
const SelectOption = styled.li<{ isActive: boolean }>`
  padding: 12px 30px 12px 12px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  span {
    line-height: 1.5;
    font-size: 15px;
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
      background-color: ${({ theme }) => theme.palette.primary};
      color: #fff;
    `}
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
  }
`

interface SelectProps {
  options: ServicesOptions[]
  name: string
  placeholder: string
  control: any
  setValue: UseFormSetValue<IFormInputs>
  isSubmitSuccessful: boolean
}

export const Select: React.FC<SelectProps> = ({
  name,
  options,
  placeholder,
  control,
  isSubmitSuccessful,
  setValue,
}) => {
  const [isOpen, setOpen] = React.useState<boolean>(false)
  const { selectedService, setSelectedService } = useAppContext()
  const selectRef = React.useRef(null)
  useOnClickOutside(selectRef, () => setOpen(false))

  React.useEffect(() => {
    if (selectedService?.title) {
      setValue('service', selectedService.title, { shouldValidate: true, shouldDirty: true })
    }
  }, [selectedService, setValue])

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      setSelectedService(null)
    }
  }, [isSubmitSuccessful, setSelectedService])

  const onSelectOption = ({ title, chatId }: ServicesOptions) => {
    setSelectedService({ title, chatId })
    setOpen(false)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ fieldState: { error } }) => (
        <CustomSelect ref={selectRef}>
          <SelectTrigger
            onClick={() => {
              setOpen((prev) => !prev)
            }}
          >
            <span>{options.find((item) => item.title === selectedService?.title)?.title || placeholder}</span>
            <Arrow isOpen={isOpen} />
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
                    isActive={selectedService?.title === item.title}
                    key={`select-option-${inx}`}
                    onClick={() => onSelectOption(item)}
                  >
                    <span>{item.title}</span>
                  </SelectOption>
                ))}
              </SelectDropdown>
            )}
          </AnimatePresence>

          {error && <Error>{error.message}</Error>}
        </CustomSelect>
      )}
    />
  )
}
