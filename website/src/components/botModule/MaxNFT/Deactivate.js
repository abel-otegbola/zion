import { Box, Grid, TextField, Typography, Button, Chip } from '@mui/material'
import { Input } from 'antd'
import React, { useEffect } from 'react'
import { uniqueNamesGenerator, names } from 'unique-names-generator'
import BACK from '../../../utils/images/icons/close.png'
import Caution from '../../../utils/images/caution.png'
import CAUTIONSVG from '../../../utils/images/icons/caution.svg'
import Context from '../Context'
import CautionMobile from '../../../utils/images/cautionMobile.png'
import { useMediaQuery } from '@mui/material'
import styles from '../Styles'
import { botModuleBackNew } from '../../../utils/svg'

const config = {
  dictionaries: [names]
}

const Name = () => {
  const isMobile = useMediaQuery('(max-width:550px)')
  const { BotState, handleNext, setBotState, handlePrevious } =
    React.useContext(Context)
  console.log('BotState', BotState)

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
            <Typography variant='h6' className='card-header caution'>
              Deactivate bot after first purchase?
            </Typography>
            <Typography
              variant='caption'
              //sx={{ width: '80%' }}
              style={{
                width: '80%',
                textAlign: 'center'
              }}
              className='card-subheader-para'
            >
              Selecting yes will deactivate the bot after its first purchase.
              Selecting NO will continue to keep the bot active.
            </Typography>
            <br />

            <br />

            <Box className='sumry-btns-box'>
              <Button
                variant='contained'
                className={`next-btn yes-btn ${
                  BotState.deactivate === true ? 'isSelect-yes' : ''
                } sumry-btn`}
                onClick={() => {
                  setBotState({ ...BotState, deactivate: true })
                }}
              >
                Yes
              </Button>
              <Button
                variant='contained'
                className={`next-btn no-btn ${
                  BotState.deactivate === false ? 'isSelect-no' : ''
                } sumry-btn`}
                onClick={() => {
                  setBotState({
                    ...BotState,
                    deactivate: false
                  })
                }}
                sx={{
                  backgroundColor: BotState.deactivate === false ? 'blue' : null
                }}
              >
                No
              </Button>
            </Box>
            <br />
            {BotState.deactivate === false ? (
              <Box
                sx={{
                  ...styles.Caution,
                  backgroundImage: `url(${isMobile ? CautionMobile : Caution})`,
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3.2
                }}
                className='caution-image'
              >
                <Typography variant='h6' className='caution-head'>
                  <img src={CAUTIONSVG} /> Caution
                </Typography>
                <Typography variant='caption' className='caution-txt'>
                  Hey heads up, this feature is for expert degens only. When
                  selected the bot will continue buying NFT's that meet your bot
                  criteria. There is no limit to the amount of NFT's that the
                  bot will purchase that meet the criteria!
                </Typography>
              </Box>
            ) : null}

            {
              <Button
                variant='contained'
                onClick={handleNext}
                className='next-btn'
              >
                Next
              </Button>
            }
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Name
