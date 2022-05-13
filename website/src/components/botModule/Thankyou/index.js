import { Box, Grid, Typography, Button, Stack } from '@mui/material'

import { Input } from 'antd'

import React, { useEffect } from 'react'
import { uniqueNamesGenerator, names } from 'unique-names-generator'
import BACK from '../../../utils/images/icons/close.png'
import Context from '../Context'
import SearchCollectionContext from '../../../Context/SearchCollectionContext'
import { AutoComplete } from 'antd'
import styles from '../Styles'
import { CircularProgress } from '@mui/material'

import { useHistory, useLocation } from 'react-router-dom'
import { botModuleCross } from '../../../utils/svg'

const Thankyou = () => {
  const history = useHistory()
  const location = useLocation()

  return (
    <>
      <Grid
        item
        xs={0.875}
        color={'white'}
        sx={{ display: 'grid', placeContent: 'center', mt: 1 }}
        className='back-cross-grid'
      >
        <div
          onClick={() => {
            history.push('/manage-bot')
          }}
          className='back-btn-div'
        >
          {botModuleCross}
        </div>
      </Grid>
      <Box className='card-box pyro'>
        <div className='before'></div>
        <div className='after'></div>
        <Grid container>
          <Grid item xs={12} className='card-content-grid'>
            <Typography variant='h6' className='card-header'>
              {location?.search && location.search === '?update-bot'
                ? 'Bot Updated!'
                : 'Bot Created!'}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Thankyou
