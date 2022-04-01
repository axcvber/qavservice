import React from 'react'
import styled, { css } from 'styled-components'
import { useOnClickOutside } from '../hooks/useClickOutside'
import UserAvatar from '../public/reviews/user.svg'
import { Button, Flex } from '../styles'
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { useAuth } from '../hooks/useAuth'

const UserWidget = () => {
  const { userData, logout } = useAuth()
  const selectRef = React.useRef(null)
  useOnClickOutside(selectRef, () => setOpen(false))
  const [isOpen, setOpen] = React.useState(false)

  if (!userData) {
    return null
  }

  return (
    <Widget ref={selectRef} onClick={() => setOpen((prev: boolean) => !prev)}>
      <UserAvatar className='widget-avatar' />
      <WidgetDropdown isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <WidgetItem>
          <AiOutlineMail />
          <span>{userData.user.email}</span>
        </WidgetItem>
        <WidgetItem>
          <AiOutlineUser />
          <span>{userData.user.username}</span>
        </WidgetItem>
        <Flex justify='flex-end'>
          <Button width='100%' onClick={() => logout()} style={{ marginTop: '10px' }} variant='contained'>
            Выйти
          </Button>
        </Flex>
      </WidgetDropdown>
    </Widget>
  )
}

const Widget = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99;
  box-shadow: 0px 0px 11px 6px rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  background-color: #4c1894;
  padding: 7px;
  user-select: none;
  .widget-avatar {
    width: 100%;
    height: 100%;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`

const WidgetDropdown = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  bottom: 100%;
  opacity: 0;
  visibility: hidden;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.palette?.primary};
  ${({ isOpen }) =>
    isOpen &&
    css`
      visibility: visible;
      margin-bottom: 10px;
      opacity: 1;
    `}
  right: 0;
  background-color: #000;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadow} rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`
const WidgetItem = styled.li`
  display: flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.palette?.text.primary};
  padding: 10px 5px;
  transition: all ${({ theme }) => theme.transition};
  svg {
    font-size: 22px;
    margin-right: 8px;
  }
`

export default UserWidget
