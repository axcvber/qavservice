import React, { ReactChild } from 'react'
import { Link } from 'react-scroll'

interface IRSLink {
  to: string
  children: ReactChild
  onClick?: () => void
}

const RSLink: React.FC<IRSLink> = ({ to, children, onClick }) => {
  return (
    <Link
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      to={to}
      ignoreCancelEvents
      smooth={true}
      offset={-85}
      duration={600}
      spy={true}
      activeClass='active'
    >
      {children}
    </Link>
  )
}

export default RSLink
