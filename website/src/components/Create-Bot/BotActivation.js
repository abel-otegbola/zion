import React, { useState, useEffect, useCallback } from 'react'
import { Container, Button, CircularProgress } from '@mui/material'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { cross, headerBot, sectionCross } from '../../utils/svg'
import { addBot, updateBot } from '../../API/BotAPI'

const BotActivation = (props) => {
  const { data, botId, botBalance } = props?.location?.state || {}

  const history = useHistory()
  const [create, setCreate] = useState(false)
  const [showSubmitLoader, setSubmitLoader] = useState(false)

  const [activate, setActivate] = useState(
    data?.after_purchase?.deactivate || true
  )

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

  const location = useLocation()

  const onSubmit = async (event) => {
    event.preventDefault()

    delete data.collections
    delete data.query
    delete data.maxRank
    delete data.traits

    let config = {
      collectionName:  data.collectionName,
      collection_id: data?.collection_id || '',
      price_range: {
        ...data.price_range
      },
      after_purchase: {
        deactivate: activate,
        deactivate_threshold: 1
      },
      //rank_range: {
      //  ...data.rank_range
      //},
      attributes: [...data.attributes]
    }
    delete data.attributes
    delete data.collection_id
    delete data.collectionName
    delete data.price_range
    delete data.rank_range

    try {
      await addBot({
        ...data,
        // user_wallet: { pubkey: jwt.pubkey },
        // bot_wallet: {
        //   pubkey: botId,
        //   balance: botBalance
        // },
        // user_id: jwt_data._id,
        config: {
          ...config
        }
      })
      toast.success(`Your bot has been created succesfully`)
      setSubmitLoader(false)

      setCreate(true)
    } catch {
      setSubmitLoader(false)
      toast.error('No bot wallet found for this wallet.')
    }
  }

  const onUpdate = async (event) => {
    event.preventDefault()
    delete data.collections
    delete data.query
    delete data.maxRank
    delete data.traits
    delete data?.wantToDeactivate

    let config = {
      collectionName: data.collectionName,
      collection_id: data?.collection_id || '',
      price_range: {
        ...data.price_range
      },
      after_purchase: {
        deactivate: activate,
        deactivate_threshold: 1
      },
      //rank_range: {
      //  ...data.rank_range
      //},
      attributes: [...data.attributes]
    }
    delete data.attributes
    delete data.collection_id
    delete data.collectionName
    delete data.price_range
    delete data.rank_range
    delete data.bot_wallet
    delete data.deactivate
    delete data.deactivate_threshold

    try {
      await updateBot({
        ...data,
        config: {
          ...config
        },
        bot_wallet: {
          pubkey: botId,
          balance: botBalance
        }
      })

      setCreate(true)
      setSubmitLoader(false)
    } catch {
      setSubmitLoader(false)
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
            disabled={data.isUpdate ? false : true}
            //onClick={deleteBotFunc}
            style={{ visibility: 'hidden' }}
          >
            Delete
          </Button>
        </div>
        <div className='activate-content-div'>
          <h2 className='activate-note'>
            Do you want to deactivate bot after it runs ?
          </h2>
          <div className='active-btns'>
            <Button
              className='activate-btn yes'
              onClick={() => setActivate(true)}
              style={
                activate === true
                  ? {
                      backgroundColor: '#1fed56',
                      color: '#000'
                    }
                  : null
              }
            >
              Yes
            </Button>
            <Button
              className='activate-btn no'
              onClick={() => setActivate(false)}
              style={
                activate === false
                  ? {
                      backgroundColor: 'red',
                      color: '#000'
                    }
                  : null
              }
            >
              No
            </Button>
          </div>
          {activate === false ? (
            <>
              <p className='warning-msg'>**Caution**</p>
              <p className='warning-msg'>
                This feature is only for expert degens only. When selected the
                bot will continue buying nft's that meet the criteria. There is
                no limit to the amount of nft's that will be purchased !
              </p>
            </>
          ) : null}
        </div>
        <div className='btn-center-div'>
          <Button
            variant='contained'
            className='my-btn submit-btn create-btn withDep-btn'
            type='submit'
            disabled={showSubmitLoader}
            onClick={(event) => {
              setSubmitLoader(true)
              if (data.isUpdate) {
                onUpdate(event)
              } else {
                onSubmit(event)
              }
            }}
          >
            {data.isUpdate ? 'Update' : 'Create'}{' '}
            {showSubmitLoader ? (
              <span style={{ display: 'flex', marginLeft: '15px' }}>
                <CircularProgress
                  style={{ color: '#000' }}
                  className='progress-spinner'
                />
              </span>
            ) : null}
          </Button>
        </div>
      </Container>
      {create ? (
        <section
          className='flip-section horz-center vert-center'
          id='flip-section'
          style={{ height: '100vh', position: 'fixed' }}
        >
          <div
            className='section-close-btn'
            onClick={() => history.push('/manage-bot')}
            style={{ left: '91%', top: '10%' }}
          >
            {sectionCross}
          </div>
          <div className='flipContent success-div pyro'>
            <div className='before'></div>
            <div className='after'></div>
            <p className='launch-text success'>
              {props.location.search === '?update-bot'
                ? 'Bot Updated!'
                : 'bot Created!'}
            </p>
          </div>
        </section>
      ) : null}
    </>
  )
}

export default BotActivation
