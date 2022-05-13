import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Chip,
  Stack
} from '@mui/material'
import { Input } from 'antd'
import React, { useEffect } from 'react'
import { uniqueNamesGenerator, names } from 'unique-names-generator'
import BACK from '../../../utils/images/icons/close.png'
import Caution from '../../../utils/images/caution.png'
import CAUTIONSVG from '../../../utils/images/icons/caution.svg'
import Context from '../Context'
import styles from '../Styles'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { getBotId } from '../../../API/BotAPI'
import { addBot, updateBot } from '../../../API/BotAPI'
import { useLocation } from 'react-router-dom'
import SearchCollectionContext from '../../../Context/SearchCollectionContext'
import { botModuleBackNew } from '../../../utils/svg'

const Name = () => {
  const location = useLocation()
  const search = location.search
  const [botWalletId, setbotWalletId] = React.useState('')
  const [balance, setBalance] = React.useState(0)

  // user wallet id
  const jwt = Cookies.get('auth-jwt')

  // TODO: just use the solana sdk to get the balance..
  const fetchBotWwalletBalance = async () => {
    var url = 'https://api.mainnet-beta.solana.com/'
    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        const wallet = JSON.parse(`${xhr.responseText}`)
        if (wallet?.result?.value && wallet?.result?.value > 0) {
          setBalance(wallet?.result?.value / LAMPORTS_PER_SOL)
        } else {
          setBalance(0)
          toast.error('Your bot wallet balance is 0')
        }
        return false
      }
    }

    let query = {
      jsonrpc: '2.0',
      id: '1',
      method: 'getBalance',
      params: [`${botWalletId}`]
    }

    var data = JSON.stringify(query)
    xhr.send(data)
  }

  const getBotWallet = async (data) => {
    return true // TODO (auth)
    try {
      const response = await getBotId()
      const _botWalletId = response.data?.bot_wallet
      if (!botWalletId || !botWalletId.length) throw new Error()
      else setbotWalletId(id)
    } catch (err) {
      // toast.error('No bot wallet found for this wallet.')
    }
  }

  const handleCreate = async () => {
    const configOBJ = {
      config: {
        collectionName: BotState.CollectionName,
        collection_id: BotState.CollectionId,
        price_range: {
          max: BotState.priceMax,
          min: BotState.priceMin
        },
        attributes:
          BotState.attributes && BotState.attributes.length !== 0
            ? [...BotState.attributes]
            : [],
        after_purchase: {
          deactivate: BotState.deactivate,
          deactivate_threshold: 1
        }
      }
      //bracket: BotState.Bracket
    }

    try {
      await addBot({
        ...configOBJ
      })
      toast.success('Bot created successfully')
      setNext((next) => next + 1)
    } catch (e) {
      toast.error('Bot error')
    }
  }

  const handleUpdate = async () => {
    const configOBJ = {
      config: {
        collectionName: BotState.CollectionName,
        collection_id: BotState.CollectionId,
        price_range: {
          max: BotState.priceMax,
          min: BotState.priceMin
        },
        attributes:
          BotState.attributes && BotState.attributes.length !== 0
            ? [...BotState.attributes]
            : [],
        after_purchase: {
          deactivate: BotState.deactivate || true,
          deactivate_threshold: 1
        }
      },
      _id: BotState._id
      //bracket: BotState.Bracket
    }

    try {
      await updateBot({
        ...configOBJ
      })
      toast.success('Bot created successfully')
      setNext((next) => next + 1)
    } catch (e) {
      toast.error('Bot error')
    }
  }
  // fetch balace

  React.useEffect(() => {
    getBotWallet()
  }, [])

  React.useEffect(() => {
    if (botWalletId) fetchBalance()
  }, [botWalletId])

  const { BotState, handleNext, setBotState, handlePrevious, setNext } =
    React.useContext(Context)

  const [image, setImage] = React.useState('')
  const { collections } = React.useContext(SearchCollectionContext)
  useEffect(() => {
    if (collections) {
      if (BotState.CollectionName) {
        const imageKey = collections.filter((item) =>
          item.name.includes(BotState.CollectionName)
        )[0].image
        setImage(imageKey)
      }
    }
  }, [collections])

  return (
    BotState && (
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

        <Box className='card-box' style={{ flexDirection: 'column' }}>
          <Grid
            container
            sx={{ maxHeight: '65vh', overflow: 'auto' }}
            id='no-scroll'
          >
            <Grid item xs={12} className='card-content-grid'>
              <Typography variant='h6' className='card-header'>
                Bot Summary
              </Typography>
              {/* <Typography variant='caption' className='card-subheader-para'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography> */}
              <br />

              <br />

              <Grid container sx={{ width: '80%' }}>
                <Grid item xs={6} md={2} xl={1.5}>
                  <img
                    src={image || CAUTIONSVG}
                    alt='caution'
                    width={60}
                    height={60}
                    className='collection-img'
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={10}
                  xl={10.5}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                  className='bot-summary-grid'
                >
                  <Stack>
                    <Typography
                      variant='body2'
                      sx={{ fontWeight: 'bold', color: 'white' }}
                      className='sumry-head'
                    >
                      collection name
                    </Typography>
                    <Typography
                      variant='caption'
                      sx={{ fontWeight: 'light', color: 'white' }}
                      className='sumry-subhead'
                    >
                      {BotState.CollectionName || 'Degods'}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography
                      variant='body2'
                      sx={{ textAlign: 'right' }}
                      className='sumry-head'
                    >
                      Name
                    </Typography>
                    <Typography
                      variant='caption'
                      sx={{ textAlign: 'right' }}
                      className='sumry-subhead'
                    >
                      {BotState.CollectionName || 'Degods'}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Stack>
                    <Typography variant='body2' className='sumry-head'>
                      Price
                    </Typography>
                    <Typography variant='caption' className='sumry-subhead'>
                      {BotState.priceMin || 1} SOL - {BotState.priceMax || 5}{' '}
                      SOL
                    </Typography>
                  </Stack>

                  <Stack>
                    <Typography
                      variant='body2'
                      sx={{
                        textAlign: 'right'
                      }}
                      className='sumry-head'
                    >
                      Disable after first purchase :
                    </Typography>
                    <Typography
                      variant='caption'
                      sx={{
                        textAlign: 'right'
                      }}
                      className='sumry-subhead'
                    >
                      {BotState.deactivate ? 'Yes' : 'No'}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    mt: 3,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Stack>
                    <Typography variant='body2' className='sumry-head'>
                      Bracket
                    </Typography>
                    <Typography variant='caption' className='sumry-subhead'>
                      {BotState?.Bracket || ''}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 'bold', color: 'white', mt: 3 }}
                    className='sumry-head'
                  >
                    Attributes
                  </Typography>
                </Grid>
                <br />

                {
                  BotState?.attributes.map((tag, index) => (
                    <Grid item xs={12} lg={6} key={index}>
                      <Box sx={{ width: '100%', height: 'fit-content', mb: 3 }}>
                        <Typography
                          variant='body2'
                          sx={{ fontWeight: 'light', color: 'white' }}
                          className='sumry-subhead'
                        >
                          {tag.trait_type}
                        </Typography>
                        {tag?.value.map((item, index) => (
                          <Chip
                            key={index}
                            label={item}
                            className='att-chips'
                            sx={{
                              border: '1px solid rgb(255,255,255,0.4)',
                              m: 0.3,
                              fontSize: '12px',
                              maxWidth: '10em',
                              color: '#A1A4A9'
                            }}
                          />
                        ))}
                      </Box>
                    </Grid>
                  ))
                  //  BotState?.attributes[tag]||
                }
              </Grid>
            </Grid>
          </Grid>
          <Box className='sumry-btns-box'>
            <Button
              variant='outlined'
              onClick={() => setNext(0)}
              className='next-btn edit-btn sumry-btn'
            >
              Edit Bot
            </Button>
            <Button
              variant='contained'
              onClick={search ? handleUpdate : handleCreate}
              className='next-btn sumry-btn'
            >
              {search ? 'Update Bot' : 'Create Bot'}
            </Button>
          </Box>
        </Box>
      </>
    )
  )
}

export default Name
