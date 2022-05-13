import React, { useState, useEffect } from 'react'
import './Account.css'
import { Container, Tabs, Tab, Box, Divider } from '@mui/material'
import Wallet from './Wallet.component'
import { Route, Switch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import usePersistedState from '../../hooks/usePersistedState.jsx'

const About = ({ match }) => {
  const [value, setValue] = usePersistedState('tab', 0)
  const History = useHistory()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Container
        style={{ width: '70%' }}
        className='container-marg-top full-container-mobile'
      >
        <Box className='heading_box'>
          <h1 className='bot-header'> Account </h1>
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='disabled tabs example'
          centered
          TabIndicatorProps={{ style: { display: 'none' } }}
        >
          <Tab
            label='Wallet'
            className='account-tab'
            onClick={() =>
              History.push({
                pathname: '/account'
              })
            }
          />
          <Tab
            label='Listed'
            className='account-tab'
            onClick={() => History.push('/account/listed')}
            style={{ display: 'none' }}
          />
          <Tab
            label='Offers'
            className='account-tab'
            onClick={() => History.push('/account/offers')}
            style={{ display: 'none' }}
          />
        </Tabs>
        <Divider
          sx={{ width: '100%', height: 2, backgroundColor: 'cyan', mt: 1 }}
        />
        <Switch>
          <Route path={match.path} exact>
            <Wallet tabValue={value} />
          </Route>
        </Switch>
      </Container>
    </>
  )
}

export default About
