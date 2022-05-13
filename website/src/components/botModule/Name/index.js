import { Box, Grid, TextField, Typography, Button, Chip } from '@mui/material'

import { Input } from 'antd'

import React from 'react'
import { uniqueNamesGenerator, names } from 'unique-names-generator'
import BACK from '../../../utils/images/icons/close.png'
import { useMediaQuery } from '@mui/material'
import Context from '../Context'
const config = {
  dictionaries: [names]
}

const Name = () => {
  const { BotState, handleNext, setBotState } = React.useContext(Context)
  const handleChange = (e) => {
    setBotState((prev) => ({ ...prev, Botname: e.target.value }))
    // call api to update name
  }
  const isMobile = useMediaQuery('(max-width:550px)')
  return (
    <Box className='card-box'>
      <Grid container>
        <Grid
          item
          xs={0.875}
          color={'white'}
          sx={{ display: 'grid', placeContent: 'center', mt: 1 }}
        >
          <img src={BACK} alt='back' className='back-img' />
        </Grid>
        <Grid item xs={12} className='card-content-grid'>
          <Typography variant='h6' className='card-header'>
            Name of the Bot
          </Typography>
          <Typography variant='caption' className='card-subheader-para'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <br />

          <br />
          <Typography
            variant='caption'
            sx={{ textAlign: 'left', color: 'gray' }}
            className='card-subheader-para subheader-para-label width-subhead'
          >
            Name
          </Typography>
          <Input
            value={BotState.Botname}
            variant='outlined'
            onChange={handleChange}
            className='bot-module-input'
          />
          <br />
          {BotState.Botname && (
            <>
              <Typography
                variant='caption'
                sx={{ textAlign: 'left', width: '67%', color: 'gray' }}
                className='suggestion-head subheader-para-label'
              >
                Suggestions
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  width: isMobile ? '90%' : '70%',
                  justifyContent: 'center',
                  mb: 10
                }}
                className='suggestions-box'
              >
                {Array(isMobile ? 5 : 8)
                  .fill(0)
                  .map((_, i) => {
                    const newName = uniqueNamesGenerator(config)
                    return (
                      <Chip
                        key={i}
                        label={`${BotState.Botname} ${newName}`}
                        className='suggestion-chips'
                        sx={{
                          margin: '10px',
                          color: 'white',
                          backgroundColor: '#26313D',
                          fontWeight: 'light',
                          fontFamily: 'Montserrat'
                        }}
                        onClick={() => {
                          setBotState((prev) => ({
                            ...prev,
                            Botname: `${BotState.Botname} ${newName}`
                          }))
                        }}
                      />
                    )
                  })}
              </Box>
            </>
          )}
          {BotState.Botname ? (
            <Button
              variant='contained'
              onClick={handleNext}
              className='next-btn'
            >
              Next
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Name
