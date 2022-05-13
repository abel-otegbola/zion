import React from 'react'
import { Container } from '@mui/material'
import { missionSword } from '../../utils/svg'

import './Mission.css'
import { useHistory } from 'react-router-dom'

const Mission = () => {
  return (
    <Container className='container-marg-top'>
      <div className='filter-bar'>
        <h1 className='primary-header alert-head'>
          <span className='thunder'>{missionSword}</span> Missions
        </h1>
      </div>
      <div className='mission-gates'>
        <div style={{ width: '23%' }}>
          <div className='semi-circle'></div>
          <div className='mission-gate'>
            <h2 className='gate-head'>Setup Wallet</h2>
          </div>
        </div>

        <div style={{ width: '23%' }}>
          <div className='semi-circle'></div>
          <div className='mission-gate'>
            <h2 className='gate-head'>Buy NFT</h2>
          </div>
        </div>

        <div style={{ width: '23%' }}>
          <div className='semi-circle'></div>
          <div className='mission-gate'>
            <h2 className='gate-head'>Stake NFT</h2>
          </div>
        </div>
      </div>
    </Container>
  )
}

const DiscordMission = () => {
  const history = useHistory()

  return (
    <Container className='container-marg-top'>
      <div className='filter-bar'>
        <h1 className='primary-header alert-head'>
          <span className='thunder'>{missionSword}</span> Missions
        </h1>
      </div>
      <div className='discord-mission-gates'>
        <div style={{ width: '23%' }}>
          <div className='discord-semi-circle'></div>
          <div className='discord-mission-gate'>
            <h2 className='discord-gate-head'> (NFT Badge) Setup Wallet</h2>
          </div>
        </div>

        <div style={{ width: '23%' }}>
          <div className='discord-semi-circle'></div>
          <div className='discord-mission-gate'>
            <h2 className='discord-gate-head'>Join First Discord</h2>
          </div>
        </div>

        <div style={{ width: '23%' }}>
          <div className='discord-semi-circle-wallet'></div>
          <div className='discord-mission-gate-wallet'>
            <h2 className='discord-gate-head-wallet'>Load wallet</h2>
          </div>
        </div>
        <div
          className='join-discord-btn'
          onClick={() => history.push('/discord-video')}
          style={{ cursor: 'pointer' }}
        ></div>
      </div>
    </Container>
  )
}

const DiscordVideo = () => {
  return (
    <Container className='container-marg-top'>
      <div className='filter-bar'>
        <h1 className='primary-header alert-head'>Join First Discord</h1>
      </div>

      <div className='discord-vid'>
        <h1>Video On Joining First Discord</h1>
      </div>

      <div className='discord-vid-btn'>
        <button
          onClick={() => window.open('https://discord.gg/zionlabs', '_blank')}
        >
          Join Discord
        </button>
      </div>
    </Container>
  )
}

const DiscordMissComp = () => {
  return (
    <Container className='container-marg-top'>
      <div className='discord-complete'>
        <h1>Congrats! Your Join Discord Mission Is Complete!</h1>

        <h2>(NFT Badge)</h2>
      </div>
    </Container>
  )
}

export { Mission, DiscordMission, DiscordVideo, DiscordMissComp }
