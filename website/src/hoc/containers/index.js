import React from 'react'
import { Container } from '@mui/material'
import Header from '../../containers/header/index'

const OurContainers = (props) => (
  <>
    <Header />
    <Container className='container-marg-top'>{props.children}</Container>
  </>
)

export default OurContainers
