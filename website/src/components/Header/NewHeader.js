import React from 'react'
import { Container } from '@mui/material'
import { Link } from 'react-router-dom'
import { zionApeProfileIcon, zionBetaLogo } from '../../utils/svg/index'

import './Header.css'

const NewHeader = () => {
  return (
    <Container
      sx={{ width: '100%', position: 'relative' }}
      id='collection-view'
    >
      <div className='zion-appbar'>
        <div className='header-logo'>{zionBetaLogo}</div>
        <div className='header-right-section'>
          <div className='tabs-section'>
            <Link to='/collections/degods' className='tabs-link'>
              EXPLORE
            </Link>
          </div>
          <div className='zion-profile-section'>{zionApeProfileIcon}</div>
        </div>
      </div>
    </Container>
  )
}

export default NewHeader
