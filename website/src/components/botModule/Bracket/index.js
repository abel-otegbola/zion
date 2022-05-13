import React from 'react'

import { Grid, Box, Typography, Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'

import Context from '../Context'

import { botModuleBackNew } from '../../../utils/svg'

const Bracket = () => {
  const { handlePrevious, handleNext, setBotState, BotState } =
    React.useContext(Context)
  const [name, setName] = React.useState(BotState.Bracket || '')

  const bracketValues = [
    {
      label: 'Mythic',
      value: 'mythic',
      percentage: 'top 1%'
    },
    {
      label: 'Legendary',
      value: 'legendary',
      percentage: 'top 5%'
    },
    {
      label: 'Epic',
      value: 'epic',
      percentage: 'top 15%'
    },
    {
      label: 'Rare',
      value: 'rare',
      percentage: 'top 35%'
    },
    {
      label: 'Uncommon',
      value: 'uncommon',
      percentage: 'top 60%'
    },
    {
      label: 'Common',
      value: 'common',
      percentage: 'bottom 40%'
    }
  ]

  const handleChange = (brack) => {
    if (brack === name) {
      setName('')
    } else {
      setName(brack)
      setBotState((prev) => ({
        ...prev,
        Bracket: brack
        // call api to update Collections
      }))
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
              Select the Bracket
            </Typography>
            <Typography
              variant='caption'
              sx={{ textAlign: 'center', color: 'gray' }}
              className='card-subheader-para'
            >
              Don’t worry you can always come back to this step if you need to.
            </Typography>
            <br />

            <br />

            <div className='brackets'>
              {bracketValues &&
                bracketValues.map((bracket) => (
                  <div
                    className='bracket'
                    onClick={() => handleChange(bracket.value)}
                  >
                    <p>
                      {bracket.label}
                      <span className='precent'>({bracket.percentage}) </span>
                    </p>
                    <div className='bracket-check'>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={`brack-check-icon ${
                          name === bracket.value ? 'active' : ''
                        }`}
                      />
                    </div>
                  </div>
                ))}
            </div>

            <br />

            <Button
              variant='contained'
              onClick={handleNext}
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

export default Bracket
