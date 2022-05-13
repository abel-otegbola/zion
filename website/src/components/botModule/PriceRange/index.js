import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Chip,
  Stack,
  Divider
} from '@mui/material'

import { Input } from 'antd'

import React from 'react'
import { uniqueNamesGenerator, names } from 'unique-names-generator'
import BACK from '../../../utils/images/icons/close.png'
import { botModuleBackNew } from '../../../utils/svg'
import Context from '../Context'
import { toast } from 'react-toastify'
import styles from '../Styles'
const config = {
  dictionaries: [names]
}

const PriceRange = () => {
  const { BotState, handleNext, setBotState, handlePrevious } =
    React.useContext(Context)
  const handleChange = (e) => {
    if (e.target.name === 'priceMin')
      setBotState((prev) => ({
        ...prev,
        [e.target.name]: parseFloat(e.target.value)
      }))
    else
      setBotState((prev) => ({
        ...prev,
        [e.target.name]: parseFloat(e.target.value)
      }))
    // call api to update name
  }

  const checkPrice = () => {
    if (
      (parseFloat(BotState.priceMax) && parseFloat(BotState.priceMin)) ||
      parseFloat(BotState.priceMin) === 0
    ) {
      if (parseFloat(BotState.priceMax) < parseFloat(BotState.priceMin)) {
        toast.error('Max. price cannot be less than min. price.')
      } else {
        handleNext()
      }
    } else {
      toast.error('Price is neccesary.')
    }
  }

  return (
    <>
      <Grid
        item
        xs={0.875}
        color={'white'}
        sx={{ display: 'grid', placeContent: 'center', mt: 1 }}
        className='back-cross-grid'
      >
        <div onClick={handlePrevious} className='back-btn-div'>
          {botModuleBackNew}
        </div>
      </Grid>

      <Box className='card-box'>
        <Grid container>
          <Grid item xs={12} className='card-content-grid'>
            <Typography variant='h6' className='card-header'>
              Select a Price Range
            </Typography>
            <Typography variant='caption' className='card-subheader-para'>
              The bot will only buy NFT's that are listed within this price
              range.
            </Typography>
            <br />

            <br />
            <Stack
              direction={'row'}
              sx={{ color: 'white' }}
              width={'80%'}
              className='price-stack'
            >
              <Stack
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '45%'
                }}
              >
                <Typography
                  variant='caption'
                  sx={{ textAlign: 'left', width: '67%', color: 'gray' }}
                  className='card-subheader-para price-range-label'
                  style={{ textAlign: 'center' }}
                >
                  Minimum
                </Typography>
                <Input
                  value={BotState.priceMin}
                  variant='outlined'
                  step='any'
                  type='number'
                  onChange={handleChange}
                  suffix={' SOL'}
                  className='price-input'
                  name='priceMin'
                />
              </Stack>
              <Box
                sx={{
                  flexGrow: 1,
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Divider
                  sx={{
                    width: 20,
                    backgroundColor: 'white',
                    height: '1px',
                    mt: 2
                  }}
                />
              </Box>
              <Stack
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '45%'
                }}
              >
                <Typography
                  variant='caption'
                  sx={{ textAlign: 'left', width: '67%', color: 'gray' }}
                  className='card-subheader-para price-range-label'
                  style={{ textAlign: 'center' }}
                >
                  Maximum
                </Typography>

                <Input
                  value={BotState.priceMax}
                  variant='outlined'
                  onChange={handleChange}
                  type='number'
                  step='any'
                  suffix={' SOL'}
                  className='price-input'
                  name='priceMax'
                />
              </Stack>
            </Stack>
            <br />

            <Button
              variant='contained'
              onClick={checkPrice}
              className='next-btn'
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default PriceRange
