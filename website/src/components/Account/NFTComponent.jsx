import React from 'react'
import { Container, Tabs, Tab, Box } from '@mui/material'
import ReactPlayer from 'react-player'
const NFTComponent = ({ item, title }) => {
  // item='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXwcIysRSSTKghqN_89hchCfWbtwCkriL_VA&usqp=CAU'
  return !ReactPlayer.canPlay(item)?(
    <img
      src={item}
      width='230px'
      height='270px'
      alt=''
      style={{ borderRadius: '10px',objectFit:'contain' }}
    />
  ):<ReactPlayer url={item} width='230px' height='270px' muted={true} />
}

export default NFTComponent
