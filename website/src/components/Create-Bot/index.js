import React, { useState, useEffect, useCallback } from 'react'
import {
  Container,
  FormGroup,
  TextField,
  Autocomplete,
  Button,
  Paper,
  Slider
} from '@mui/material'
import { Link, useLocation, useHistory } from 'react-router-dom'

import { cross } from '../../utils/svg'

import { headerBot } from '../../utils/svg'

import BotAttributes from './BotAttributes'

import './CreateBot.css'

const CreateBot = (props) => {
  const history = useHistory()

  const escEvent = useCallback((e) => {
    if (e.code === 'Escape') {
      history.push('/manage-bot')
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', escEvent)

    return () => {
      document.removeEventListener('keydown', escEvent)
    }
  }, [])

  const { state } = props
  const location = useLocation()

  const {
    handleStateChange,
    getBotWallet,
    handleSlider,
    handleAttributes,
    deleteBotFunc
  } = props
  const { collections } = state
  const [showPrice, setPrice] = useState(false)
  //const [showRange, setRange] = useState(false)

  const CustomPaper = (props) => {
    return (
      <Paper
        elevation={8}
        {...props}
        style={{ color: 'cyan', backgroundColor: '#292929' }}
      />
    )
  }

  const goToNext = (e) => {
    e.preventDefault()
    getBotWallet(state)
  }

  const showAttributeScreen = (show) => {
    let container = document.querySelector('#attributes-container')
    if (show) {
      container.style.height = 'auto'
    } else {
      container.style.height = '0'
      container.style.overflow = 'hidden'
    }
  }

  return (
    <>
      <Container
        className='container-marg-top animate__animated animate__fadeInUp'
        id='collection-view'
      >
        <div className='filter-bar space-between'>
          <div className='cross-button'>
            <Link
              to={{
                pathname: '/manage-bot'
              }}
            >
              {cross}
            </Link>
          </div>
          <h1 className='bot-header'>
            <span>{headerBot}</span>
            {location?.search === '?update-bot' ? 'Update Bot' : 'Create Bot'}
          </h1>
          <Button
            className='my-btn delete-btn'
            disabled={state.isUpdate ? false : true}
            onClick={deleteBotFunc}
            style={
              location?.search !== '?update-bot'
                ? { visibility: 'hidden' }
                : { visibility: 'visible' }
            }
          >
            Delete
          </Button>
        </div>
        <div className='delete-btn'>Delete</div>
        <form className='create-alert-form'>
          <FormGroup className='form-group'>
            <TextField
              id='outlined-basic'
              name='name'
              placeholder='Bot Name'
              variant='outlined'
              required={true}
              fullWidth
              className='text-field'
              value={state.name}
              onChange={(event) => handleStateChange(event)}
            />

            {collections && (
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                className='create-alert'
                getOptionLabel={(option) => option.name}
                inputValue={state.query}
                name='collection_id'
                options={collections}
                onChange={(event, value) => {
                  handleStateChange(event, value)
                }}
                PaperComponent={CustomPaper}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder='Collections'
                    name='query'
                    className='create-alert text-field'
                    required={true}
                    onChange={(event) => {
                      handleStateChange(event)
                    }}
                    onFocus={(event) => {
                      handleStateChange(event)
                    }}
                  />
                )}
                required={true}
              />
            )}

            <div
              className='bot-info slider'
              onClick={() => setPrice(!showPrice)}
            >
              PRICE: {state?.price_range?.min || 0} SOL -{' '}
              {state?.price_range?.max || 30} SOL
            </div>
            {showPrice ? (
              <Slider
                value={[
                  state?.price_range?.min || 0,
                  state?.price_range?.max || 30
                ]}
                min={0}
                className='zion-slider'
                name='price'
                max={30}
                marks
                valueLabelDisplay='auto'
                onChange={(event) => handleSlider(event)}
              />
            ) : null}

            <div
              className='bot-attributes'
              onClick={() => {
                if (
                  state.query !== '' &&
                  state.traits !== [] &&
                  state.traits.length !== 0
                ) {
                  showAttributeScreen(true)
                } else {
                }
              }}
            >
              ATTRIBUTES
            </div>

            <Button
              variant='contained'
              className='my-btn submit-btn create-btn'
              type='submit'
              onClick={(e) => goToNext(e)}
            >
              Next
            </Button>
          </FormGroup>
        </form>
      </Container>
      <BotAttributes
        attributes={state.attributes}
        handleAttributes={handleAttributes}
        traits={state.traits}
        showAttributeScreen={showAttributeScreen}
      />
    </>
  )
}

export default CreateBot
