import React, { useCallback, useEffect, useState } from 'react'
import {
  Container,
  FormGroup,
  TextField,
  Autocomplete,
  Button,
  Paper
} from '@mui/material'
import { Link } from 'react-router-dom'
import { cross, sectionCross, alertThunder } from '../../utils/svg'
import PhoneInput from 'react-phone-number-input'
import { useHistory, useLocation } from 'react-router-dom'

import './Create-Alert.css'

import thunderImg from '../../utils/images/alertThunder.png'

const CreateAlert = (props) => {
  const history = useHistory()
  const location = useLocation()
  const [create, setCreate] = useState(false)

  const keyEvent = useCallback((e) => {
    if (e.code === 'Escape') {
      history.push('/manage-alert')
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', keyEvent)

    return () => {
      document.removeEventListener('keydown', keyEvent)
    }
  }, [])

  const {
    state,
    handleStateChange,
    handleAlertChange,
    onSubmit,
    onUpdate,
    changePhone,
    alertTypes,
    alertVia,
    handleAlertVia,
    changeWhatsapp,
    deleteAlertFunc
  } = {
    ...props
  }

  let alertLabel = alertTypes.find((alert) =>
    alert.value === state.alertType ? alert.label : ''
  )

  let alertViaLabel = alertVia.find((alert) =>
    alert.value === state.via ? alert.label : ''
  )

  const { collections } = { ...state }

  const CustomPaper = (props) => {
    return (
      <Paper
        elevation={8}
        {...props}
        style={{ color: 'cyan', backgroundColor: '#292929' }}
      />
    )
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
                pathname: '/manage-alert'
              }}
            >
              {cross}
            </Link>
          </div>
          <h1 className='bot-header'>
            <span>{alertThunder}</span>
            {location?.search === '?update-alert'
              ? 'Update Alert'
              : 'Create Alert'}
          </h1>
          <Button
            className='my-btn delete-btn'
            disabled={state.isUpdate ? false : true}
            onClick={deleteAlertFunc}
            style={
              location?.search !== '?update-alert'
                ? { visibility: 'hidden' }
                : { visibility: 'visible' }
            }
          >
            Delete
          </Button>
        </div>

        <form
          className='create-alert-form'
          onSubmit={(event) => {
            if (state?.isUpdate) {
              onUpdate(event, setCreate)
            } else {
              onSubmit(event, setCreate)
            }
          }}
        >
          <FormGroup className='form-group'>
            <TextField
              id='outlined-basic'
              name='name'
              placeholder='Alert Name'
              variant='outlined'
              required={true}
              fullWidth
              className='text-field'
              value={state.name}
              onChange={(event) => handleStateChange(event)}
            />

            {alertVia && (
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                className='create-alert'
                getOptionLabel={(option) => option.label}
                name='via'
                value={alertViaLabel}
                options={alertVia}
                onChange={(event, value) => {
                  handleAlertVia(event, value)
                }}
                PaperComponent={CustomPaper}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder='Alert Via'
                    name='via'
                    className='create-alert text-field'
                    required={true}
                  />
                )}
                required={true}
              />
            )}

            {state.via === 'discord' ? (
              <TextField
                id='outlined-basic'
                placeholder='https://discord.com'
                variant='outlined'
                name='url'
                required={true}
                className='text-field create-alert'
                value={state.url}
                onChange={(event) => handleStateChange(event)}
                fullWidth
                style={{ marginTop: '20px' }}
              />
            ) : // ) : state.via === 'sms' || state.via === 'whatsApp' ? (
            //   <PhoneInput
            //     international
            //     countryCallingCodeEditable={false}
            //     defaultCountry='US'
            //     name={state.via === 'sms' ? 'phone' : 'whatsApp'}
            //     value={state.via === 'sms' ? state.phone : state.whatsapp}
            //     onChange={(value) => {
            //       if (state.via === 'sms') {
            //         changePhone(value)
            //       } else {
            //         changeWhatsapp(value)
            //       }
            //     }}
            //   />
            // ) : null}
            null}

            {alertTypes && (
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                className='create-alert'
                getOptionLabel={(option) => option.label}
                name='alertType'
                value={alertLabel}
                options={alertTypes}
                onChange={(event, value) => {
                  handleAlertChange(event, value)
                }}
                PaperComponent={CustomPaper}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder='Alert Type'
                    name='alertType'
                    className='create-alert text-field'
                    required={true}
                  />
                )}
                required={true}
              />
            )}

            {collections && (
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                className='create-alert'
                getOptionLabel={(option) => option.name}
                inputValue={state.query}
                name='collectionId'
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

            <Button
              variant='contained'
              className='my-btn submit-btn create-btn'
              type='submit'
            >
              {state?.isUpdate ? 'Update' : 'Create'}
            </Button>
          </FormGroup>
        </form>
      </Container>
      {create ? (
        <section
          className='flip-section horz-center vert-center'
          id='flip-section'
          style={{ height: '100vh', position: 'fixed' }}
        >
          <div
            className='section-close-btn'
            onClick={() => history.push('/manage-alert')}
            style={{ left: '91%', top: '10%' }}
          >
            {sectionCross}
          </div>
          <div className='flipContent success-div pyro'>
            <div className='before'></div>
            <div className='after'></div>
            <p className='launch-text success'>
              {location.search === '?update-alert'
                ? 'Alert Updated!'
                : 'Alert Created!'}
            </p>
          </div>
        </section>
      ) : null}
    </>
  )
}

export default CreateAlert
