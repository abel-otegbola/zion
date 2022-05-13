import { Box } from '@mui/material'
import React from 'react'
import BG from '../../utils/images/botModuleBackground.jpg'
import Collection from './Collection'
import StateContext from './Context'
import './Bot-Module.css'
import Attributes from './Atttributes'
import MaxNFT from './MaxNFT'
import PriceRange from './PriceRange'
import Summary from './Summary'
import Bracket from './Bracket'
import Thankyou from './Thankyou'
import { useLocation } from 'react-router-dom'

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100%',
  backgroundImage: `url(${BG})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}

const BotModule = () => {
  const Location = useLocation()

  let object = { deactivate: true }
  const { state } = Location

  const [BotState, setBotState] = React.useState(object || { deactivate: true })
  const [prevCol, setPrevCol] = React.useState(
    state?.updateData?.collectionName || ''
  )

  if (state?.updateData) {
    const { updateData } = state
    debugger
    object['CollectionName'] = updateData.collectionName
    object['attributes'] = updateData.attributes
    object['priceMin'] = updateData.price_range.min
    object['priceMax'] = updateData.price_range.max
    object['CollectionId'] = updateData.collection_id
    object['_id'] = updateData._id
    object['deactivate'] = updateData.after_purchase.deactivate
    object['Bracket'] = updateData.bracket
  }

  const [next, setNext] = React.useState(0)
  const handleNext = () => {
    setNext(Math.min(next + 1, 6))
  }

  const handlePrevious = () => {
    setNext(Math.max(next - 1, 0))
  }

  const JSXElementArray = [
    <Collection />,
    <PriceRange />,
    <MaxNFT />,
    <Attributes
      attributes={BotState?.attributes || []}
      prevCol={prevCol}
      setPrevCol={setPrevCol}
    />,
    //<Bracket />,
    <Summary />,
    <Thankyou />
  ]

  return (
    <StateContext.Provider
      value={{ handleNext, handlePrevious, setBotState, BotState, setNext }}
    >
      <Box disableGutters={true} className='container-marg-top' sx={style}>
        {JSXElementArray[next]}
      </Box>
    </StateContext.Provider>
  )
}
export default BotModule
