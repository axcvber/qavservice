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
      offset={-63}
      duration={600}
    >
      {children}
    </Link>
  )
}

export default RSLink
