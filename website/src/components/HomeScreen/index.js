import React, { useEffect, useState } from 'react'
import { Container, Button, Grid } from '@mui/material'
import ExploreImg from '../../utils/images/nftImage.webp'
import bgImage from '../../utils/images/exploreBG.webp'
import { useHistory } from 'react-router-dom'
import * as LoginAPI from '../../API/LoginAPI'
import './HomeScreen.css'

const HomeScreen = () => {
  const [isMobile, setMobileWidth] = useState(window.innerWidth)

  useEffect(() => {
    document.body.style.backgroundImage = `url('${bgImage}')`
    return () => {
      document.body.style.backgroundImage = ''
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      setMobileWidth(window.innerWidth)
    })
  }, [window.innerWidth])

  const history = useHistory()

  const initAuth = () => {
    if (LoginAPI.isAuthed()) {
      return history.push('/bot')
    }
    LoginAPI.getAccount(async (pubkey) => {
      await LoginAPI.authAccount(pubkey, async (success, token) => {
        // console.debug(`getAccount()`, pubkey)
        if (!success || !token) {
          // Login Fail
          // if verify api response is an error, either
          // signature failed to verify, or the user was
          // not found in the db, or does not have a trusted
          // nft token-account balance in their wallet..
          // update ui-state with an error..
          console.warn(`verify auth fail`)
          // setIsModalVisible(true)
          throw new Error()
        }
        else {
          // Login Success
          // if verify returns, user is logged in..
          // set jwt token locally (cookie)..
          
          // update history pushstate.
          // console.debug(`verify success:`, `user authenticated..`, verify.token)

          // redux integration
          // this.props.loginUser(response)
          // setIsModalVisible(false)
          history.push('/bot')
        }
      })
    })
  }

  return (
    <Container
      sx={{ width: '100%', position: 'relative' }}
      id='collection-view'
    >
      <Grid container spacing={2} className='home-screen-grid'>
        {isMobile < 552 ? (
          <Grid item xs={12}>
            <div className='explore-nft-img'>
              <div className='img-corner top'></div>
              <img src={ExploreImg} alt='nft-img' />
              <div className='img-corner bottom'></div>
            </div>
          </Grid>
        ) : null}
        <Grid item xs={12} md={8}>
          <h1 className='explore-header'>
            The #1 Destination for big brain{' '}
            <span className='blue'>NFT Traders</span>
          </h1>
          <h3 className='explore-sub-head'>
            Trade across all marketplaces.
            <br /> Alerts and bots to trade smarter.
          </h3>
          {isMobile < 552 ? null : (
            <Button className='explore-btn' onClick={initAuth}>
              Setup a bot
            </Button>
          )}

          <div className='explore-figures'>
            <div className='figures'>
              <p className='numbers'>2k+</p>
              <p className='category'>Collections</p>
            </div>
            <div className='figures'>
              <p className='numbers'>5m+</p>
              <p className='category'>NFT's</p>
            </div>
            <div className='figures'>
              <p className='numbers'>14m+</p>
              <p className='category'>Transactions</p>
            </div>
          </div>
        </Grid>

        {isMobile > 552 ? (
          <Grid item xs={4}>
            <div className='explore-nft-img'>
              <div className='img-corner top'></div>
              <img src={ExploreImg} alt='nft-img' />
              <div className='img-corner bottom'></div>
            </div>
          </Grid>
        ) : null}
        {isMobile < 552 ? (
          <Button
            className='explore-btn'
            style={{ margin: '0 auto' }}
            onClick={init_door_access}
          >
            Setup a bot
          </Button>
        ) : null}
      </Grid>
    </Container>
  )
}

export default HomeScreen
