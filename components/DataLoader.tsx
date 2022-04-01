import React from 'react'
import styled from 'styled-components'
import Spinner from '../public/spinner.svg'

const DataLoader = () => {
  return (
    <Loader>
      <Spinner />
    </Loader>
  )
}

const Loader = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  svg {
    width: 100%;
    height: 100%;
    path {
      fill: ${({ theme }) => theme.palette?.primary};
    }
  }
`

export default DataLoader
