import React, { useCallback, useEffect, useState, useLayoutEffect } from 'react'
import { Grid, Container, Skeleton, Button } from '@mui/material'
import { Link, useHistory } from 'react-router-dom'
import { Tabs } from 'antd'
import { toast } from 'react-toastify'
import {
  barChart,
  botGlowLogo,
  cross,
  edenWhiteLogo,
  priceCart,
  tokenBotIcon
} from '../../utils/svg/index'
import Warning from '../../hoc/warning'
import TokenViewSkeleton from '../../hoc/TokenViewSkeleton'

import './TokenMobileStyles.css'
import './TokenView.css'

const { TabPane } = Tabs

const TokenViewComponent = (props) => {
  const history = useHistory()
  const { data, path, showSkeleton, name, attributesData, moveToBot, tokenId } =
    props

  const [windowWidth, setWidth] = useState(window.innerWidth)

  const keyEvent = useCallback((e) => {
    if (e.code === 'Escape') {
      history.push({
        pathname: path,
        id: name
      })
    }
  }, [])

  useLayoutEffect(() => {
    setWidth(window.innerWidth)
  }, [window.innerWidth])

  useEffect(() => {
    document.addEventListener('keydown', keyEvent)

    return () => {
      document.removeEventListener('keydown', keyEvent)
    }
  }, [])

  return (
    <>
      {windowWidth > 480 ? (
        <Container
          className='animate__animated animate__fadeInUp token-view-container'
          id='token-view-container'
        >
          <div className='collection-view-head' style={{ display: 'flex' }}>
            <div className='left-arrow-button'>
              <Link
                to={{
                  pathname: path,
                  id: name
                }}
              >
                {cross}
              </Link>
            </div>
          </div>
          <Grid container spacing={8} style={{ marginTop: '30px' }}>
            <Grid item xs={5}>
              {showSkeleton ? (
                <Skeleton
                  width={'100%'}
                  className='token-img-skel'
                  style={{
                    margin: '0 auto',
                    backgroundColor: 'rgba(250, 250, 250, 0.11)'
                  }}
                />
              ) : (
                <img
                  src={data?.image || ''}
                  alt='profile-img'
                  className='profile-img'
                  width='100%'
                />
              )}
            </Grid>
            <Grid item xs={7}>
              {showSkeleton ? (
                <Skeleton
                  className='token-head-skel'
                  style={{
                    margin: '0 auto',
                    backgroundColor: 'rgba(250, 250, 250, 0.11)'
                  }}
                />
              ) : (
                <h1 className='token-name-head'>{data?.name || ''}</h1>
              )}

              <p className='marketplace'>
                <span>{edenWhiteLogo}</span> Magic Eden
              </p>

              <div className='token-rank-price'>
                <div className='grad-box'>
                  <p className='head'>
                    <span>{priceCart}</span>Price
                  </p>
                  <p className='val-txt'>{data?.amount || '--'}</p>
                </div>
                <div className='grad-box'>
                  <p className='head'>
                    <span>{barChart}</span>Rank
                  </p>
                  <p className='val-txt'>{data?.rank || '--'}</p>
                </div>
              </div>

              <Tabs defaultActiveKey='attributes' className='token-tabs'>
                {/* <TabPane
                  tab='Overview'
                  key='overview'
                  className='token-tab-item'
                >
                  <p className='token-desc'>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit
                    consequat interdum mauris, laoreet feugiat lectus accumsan
                    sed cubilia netus vel faucibus,
                  </p>
                  <p className='token-desc'>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit
                    consequat interdum mauris, laoreet feugiat lectus accumsan
                    sed cubilia netus vel faucibus,
                  </p>
                </TabPane> */}
                <TabPane
                  tab='Attributes'
                  key='attributes'
                  className='token-tab-item'
                >
                  <Grid container spacing={4}>
                    {showSkeleton ? (
                      <TokenViewSkeleton />
                    ) : attributesData && attributesData.length !== 0 ? (
                      attributesData.map((attribute) => {
                        return (
                          <Grid item xs={6}>
                            <div className='info-grids'>
                              <p className='type'>
                                {attribute?.trait_type || ''}
                              </p>
                              <p className='type-cat'>
                                {attribute?.value || ''}{' '}
                              </p>
                            </div>
                          </Grid>
                        )
                      })
                    ) : (
                      <Warning />
                    )}
                  </Grid>
                </TabPane>
              </Tabs>
              <div className='token-buy-div'>
                <div className='token-bot-div' onClick={moveToBot}>
                  {tokenBotIcon}
                </div>
                <Button
                  className='token-buy-btn'
                  onClick={() =>
                    window.open(
                      `https://magiceden.io/item-details/${tokenId}`,
                      '_blank'
                    )
                  }
                >
                  Buy Now
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Container className='animate__animated animate__fadeInUp'>
          <div className='mob-token-img-div'>
            {showSkeleton ? (
              <Skeleton
                width={'100%'}
                height={'100%'}
                style={{
                  margin: '0 auto',
                  backgroundColor: 'rgba(250, 250, 250, 0.11)'
                }}
              />
            ) : (
              <img
                className='mob-token-img'
                src={data?.image}
                alt={data?.name || ''}
              />
            )}
          </div>
          <div className='mob-token-info-div'>
            <h1 className='mob-token-name'>{data?.name || ''}</h1>
            <div className='mob-token-marketplace'>
              <span className='eden-icon'>{edenWhiteLogo}</span>
              MAGIC EDEN
            </div>
          </div>
          <div className='mob-token-rank-price'>
            <div className='rank'>
              <p className='head'>Rank</p>
              <p className='rank-number'>{data?.rank || ''}</p>
            </div>
            <div className='price'>
              <p className='head'>Price</p>
              <p className='price-number'>{data?.amount || ''}</p>
            </div>
          </div>

          <div className='mob-token-traits-div'>
            {attributesData.map((attribute) => {
              return (
                <div className='mob-traits'>
                  <p className='trait-key'>{attribute?.trait_type || ''}</p>
                  <p className='trait-value'>{attribute?.value || ''}</p>
                </div>
              )
            })}
          </div>
          <div className='mob-token-btn-div'>
            <div className='bot-glow-svg' onClick={moveToBot}>
              {botGlowLogo}
            </div>
            <a
              href={`https://magiceden.io/item-details/${data._id}`}
              target='_blank'
              rel='noreferrer'
              className='glow-btn'
            >
              Buy Now
            </a>
          </div>
        </Container>
      )}
    </>
  )
}

export default TokenViewComponent
