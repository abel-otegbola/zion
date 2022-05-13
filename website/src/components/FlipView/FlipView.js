import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal } from 'antd'
import { Typography, Button } from '@mui/material'
import * as LoginAPI from '../../API/LoginAPI'

import flipGif from '../../utils/images/Zion_KeyWeb.gif'
import page_0 from '../../utils/images/HomePage_v5.webp'
import page_cover from '../../utils/images/Cover_HQ.webp'
import page_1 from '../../utils/images/1.webp'
import page_2 from '../../utils/images/2.webp'
import page_3 from '../../utils/images/3.webp'
import page_4 from '../../utils/images/4.webp'
import page_5 from '../../utils/images/5.webp'
import page_6 from '../../utils/images/6.webp'
import page_7 from '../../utils/images/7.webp'
import page_8 from '../../utils/images/8.webp'
import page_9 from '../../utils/images/9.webp'
import page_10 from '../../utils/images/10.webp'
import page_11 from '../../utils/images/11.webp'
import page_12 from '../../utils/images/12.webp'
import page_13 from '../../utils/images/13.webp'

import blank_page from '../../utils/images/blank_desk.webp'
import blank_page_mob from '../../utils/images/mobile/blank_mob.webp'

import tabletPage_0 from '../../utils/images/THomePage_HQ_V3.webp'
import tabletPage_1 from '../../utils/images/T2.webp'
import tabletPage_3 from '../../utils/images/T4.webp'
import tabletPage_4 from '../../utils/images/T5.webp'
import tabletPage_5 from '../../utils/images/T6.webp'
import tabletPage_6 from '../../utils/images/T7.webp'
import tabletPage_7 from '../../utils/images/T8.webp'
import tabletHome from '../../utils/images/THomePage_HQ_V3.webp'
import MobileCover from '../../utils/images/mobile/MCover.webp'
import MobileHome from '../../utils/images/mobile/MHomePage_HQ_V3.webp'
import Mobile1 from '../../utils/images/mobile/1.webp'
import Mobile2 from '../../utils/images/mobile/2.webp'
import Mobile3 from '../../utils/images/mobile/3.webp'
import Mobile4 from '../../utils/images/mobile/4.webp'
import Mobile5 from '../../utils/images/mobile/5.webp'
import Mobile6 from '../../utils/images/mobile/6.webp'
import Mobile7 from '../../utils/images/mobile/7.webp'
import Mobile8 from '../../utils/images/mobile/8.webp'
import Mobile9 from '../../utils/images/mobile/Mpage_5.webp'
import Mobile10 from '../../utils/images/mobile/10.webp'
import Mobile11 from '../../utils/images/mobile/11.webp'
import Mobile12 from '../../utils/images/mobile/12.webp'
import Mobile13 from '../../utils/images/mobile/13.webp'

import './FlipView.css'
import { getTransitionDirection } from 'antd/lib/_util/motion'

// const defaultImg = [
//   page_0,
//   page_cover,
//   page_1,
//   page_3,
//   page_4,
//   page_5,
//   page_6,
//   page_7,
//   page_8,
//   page_9,
//   page_10
// ]
// const MobileImg = [
//   MobileHome,
//   MobileCover,
//   ,
//   ,
//   ,
//   ,
//   ,

// ]
// const TabImg = [
//   tabletHome,
//   tabletPage_0,
//   tabletPage_1,
//   tabletPage_3,
//   tabletPage_4,
//   tabletPage_4,
//   tabletPage_5,
//   tabletPage_6,
//   tabletPage_0
// ]

const FlipView = () => {
  const [showZion, setZion] = useState(false)
  const [showLastBtns, setLastBtns] = useState(false)
  const currentLocation = useRef(0)
  const history = useHistory()
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const paper0 = useRef(document.querySelector('#p0'))
  const paper1 = useRef(document.querySelector('#p1'))
  const paper2 = useRef(document.querySelector('#p2'))
  const paper3 = useRef(document.querySelector('#p3'))
  const paper4 = useRef(document.querySelector('#p4'))
  const paper5 = useRef(document.querySelector('#p5'))
  const paper6 = useRef(document.querySelector('#p6'))
  const paper7 = useRef(document.querySelector('#p7'))
  const paper8 = useRef(document.querySelector('#p8'))
  const paper9 = useRef(document.querySelector('#p9'))
  const paper10 = useRef(document.querySelector('#p10'))
  const paper11 = useRef(document.querySelector('#p11'))
  const paper12 = useRef(document.querySelector('#p12'))
  const paper13 = useRef(document.querySelector('#p13'))
  const paper14 = useRef(document.querySelector('#p14'))
  const prevBtn = useRef(document.querySelector('#prev-btn'))
  const nextBtn = useRef(document.querySelector('#next-btn'))

  let numOfPapers = 12
  let maxLocation = numOfPapers

  //Event Listener
  // const SizeEr = () => {
  //   if (window.innerWidth <= 550) {
  //     const imgsrc = document.querySelectorAll('.cover-img')
  //     let pos = 0
  //     for (let i = 0; i < imgsrc.length; i++) {
  //       imgsrc[i].src = MobileImg[pos++]
  //     }
  //   }
  //   // if (window.innerWidth >= 550 && window.innerWidth <= 800) {
  //   //   const imgsrc = document.querySelectorAll('.cover-img')
  //   //   let pos = 1
  //   //   for (let i = 0; i < imgsrc.length; i++) {
  //   //     imgsrc[i].src = TabImg[pos++]
  //   //   }
  //   // }
  //   if (window.innerWidth > 800) {
  //     const imgsrc = document.querySelectorAll('.cover-img')
  //     let pos = 0
  //     for (let i = 0; i < imgsrc.length; i++) {
  //       imgsrc[i].src = defaultImg[pos++]
  //     }
  //   }
  // }
  React.useLayoutEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(window.innerWidth)
    })
  }, [])

  useEffect(() => {
    prevBtn.current.addEventListener('click', goPrevPage)
    nextBtn.current.addEventListener('click', goNextPage)
  }, [])

  const goNextPage = () => {
    if (currentLocation.current <= maxLocation) {
      switch (currentLocation.current) {
        case 0:
          setLastBtns(false)
          paper1.current.classList.remove('flippedBack')
          paper0.current.style.height = '0'
          showAfter('p' + 1)

          break
        case 1:
          paper1.current.classList.remove('flippedBack')
          paper1.current.classList.add('flipped')

          showAfter('p' + 1)

          break
        case 2:
          paper2.current.classList.remove('flippedBack')
          paper2.current.classList.add('flipped')

          showAfter('p' + 2)

          break
        case 3:
          paper3.current.classList.remove('flippedBack')
          paper3.current.classList.add('flipped')

          showAfter('p' + 3)
          break

        case 4:
          paper4.current.classList.remove('flippedBack')
          paper4.current.classList.add('flipped')
          showAfter('p' + 4)
          break
        case 5:
          paper5.current.classList.remove('flippedBack')
          paper5.current.classList.add('flipped')
          showAfter('p' + 5)
          break
        case 6:
          paper6.current.classList.remove('flippedBack')
          paper6.current.classList.add('flipped')
          showAfter('p' + 6)

          break

        case 7:
          paper7.current.classList.remove('flippedBack')
          paper7.current.classList.add('flipped')
          showAfter('p' + 7)

          break
        case 8:
          paper8.current.classList.remove('flippedBack')
          paper8.current.classList.add('flipped')
          showAfter('p' + 8)

          break
        case 9:
          paper9.current.classList.remove('flippedBack')
          paper9.current.classList.add('flipped')
          showAfter('p' + 9)

          break
        case 10:
          paper10.current.classList.remove('flippedBack')
          paper10.current.classList.add('flipped')
          showAfter('p' + 10)

          break
        case 11:
          paper11.current.classList.remove('flippedBack')
          paper11.current.classList.add('flipped')
          showAfter('p' + 11)

          break

        case 12:
          paper0.current.style.height = '100vh'

          setTimeout(() => {
            setLastBtns(true)
            currentLocation.current = 0
            let activeElms = document.getElementsByClassName('flipped')
            while (activeElms.length) {
              activeElms[0].classList.remove('flipped')
            }
          }, 500)
          break
        default:
          throw new Error('unkown state')
      }
      setZion(true)
      currentLocation.current = currentLocation.current + 1
    }
  }

  const goPrevPage = () => {
    if (currentLocation.current > 1) {
      switch (currentLocation.current) {
        case 2:
          paper1.current.classList.remove('flipped')
          paper1.current.classList.add('flippedBack')

          let activeElms = document.getElementsByClassName('active')
          for (let i = 0; i < activeElms.length; i += 1) {
            activeElms[i].classList.remove('active')
          }

          break
        case 3:
          paper2.current.classList.remove('flipped')
          paper2.current.classList.add('flippedBack')

          showAfter('p' + 1)
          break
        case 4:
          paper3.current.classList.remove('flipped')
          paper3.current.classList.add('flippedBack')

          showAfter('p' + 2)
          break
        case 5:
          paper4.current.classList.remove('flipped')
          paper4.current.classList.add('flippedBack')

          showAfter('p' + 3)
          break
        case 6:
          paper5.current.classList.remove('flipped')
          paper5.current.classList.add('flippedBack')

          showAfter('p' + 4)
          break
        case 7:
          paper6.current.classList.remove('flipped')
          paper6.current.classList.add('flippedBack')

          showAfter('p' + 5)
          break
        case 8:
          paper7.current.classList.remove('flipped')
          paper7.current.classList.add('flippedBack')

          showAfter('p' + 6)

          break
        case 9:
          paper8.current.classList.remove('flipped')
          paper8.current.classList.add('flippedBack')

          showAfter('p' + 7)

          break
        case 10:
          paper9.current.classList.remove('flipped')
          paper9.current.classList.add('flippedBack')

          showAfter('p' + 8)

          break
        case 11:
          paper10.current.classList.remove('flipped')
          paper10.current.classList.add('flippedBack')

          showAfter('p' + 9)
          break
        case 12:
          paper11.current.classList.remove('flipped')
          paper11.current.classList.add('flippedBack')
          showAfter('p' + 10)
          break
        case 13:
          paper12.current.classList.remove('flipped')
          paper12.current.classList.add('flippedBack')

          showAfter('p' + 11)
          break
        case 14:
          paper13.current.classList.remove('flipped')
          paper13.current.classList.add('flippedBack')

          showAfter('p' + 12)

          setLastBtns(false)
          break
        default:
          throw new Error('unkown state')
      }

      currentLocation.current = currentLocation.current - 1
    }
  }

  const initAuth = () => {
    LoginAPI.getAccount(async (pubkey) => {
      await LoginAPI.authAccount(pubkey, async (success, token) => {
        if (!success || !token) {
          // Login Fail
          // if verify api response is an error, either
          // signature failed to verify, or the user was
          // not found in the db, or does not have a trusted
          // nft token-account balance in their wallet..
          // update ui-state with an error..
          console.warn(`verify auth fail`)
          setIsModalVisible(true)
        } else {
          // Login Success
          // if verify returns, user is logged in..
          // set jwt token locally (cookie)..

          // update history pushstate.
          // console.debug(`verify success:`, `user authenticated..`, verify.token)

          // redux integration
          // this.props.loginUser(response)
          setIsModalVisible(false)
          history.push('/explore')
        }
      })
    })
  }

  const moveNav = (id) => {
    moveToPage(parseInt(id[1]))
    showAfter(id)
  }

  const showAfter = (id) => {
    const navElm = document.getElementById(id)
    let activeElms = document.getElementsByClassName('active')
    for (let i = 0; i < activeElms.length; i += 1) {
      activeElms[i].classList.remove('active')
    }
    navElm.classList.add('active')
  }

  const moveToPage = (id) => {
    if (id >= currentLocation.current) {
      while (id >= currentLocation.current) {
        goNextPage()
      }
    } else {
      while (id < currentLocation.current) {
        goPrevPage()
      }
    }
  }

  return (
    <div>
      <div id='book' className='book'>
        <button
          id='prev-btn'
          ref={prevBtn}
          className='full-btn'
          style={
            showZion && !showLastBtns ? { zIndex: '15' } : { zIndex: '-1' }
          }
        ></button>
        <div id='p0' ref={paper0} className='paper'>
          <img
            className='cover-img'
            async
            src={
              windowSize < 552
                ? MobileHome
                : windowSize >= 768 && windowSize < 1000
                ? tabletHome
                : page_0
            }
            alt='zion storybook'
          />
        </div>
        <div id='p1' ref={paper1} className='paper'>
          <img
            className='cover-img'
            async
            src={
              windowSize < 552
                ? MobileCover
                : windowSize >= 768 && windowSize < 1000
                ? tabletPage_0
                : page_cover
            }
            alt='page 1'
          />
        </div>
        <div id='p2' ref={paper2} className='paper'>
          <div className='front'>
            <div id='f2' className='front-content'>
              <div className='flipImgDiv no-pad vert-center horz-center'>
                <img
                  className='cover-img'
                  src={windowSize < 552 ? Mobile1 : page_1}
                  alt='2'
                />
              </div>
            </div>
          </div>
        </div>
        <div id='p3' ref={paper3} className='paper'>
          <div className='front'>
            <div id='f3' className='front-content'>
              <div className='flipImgDiv no-pad vert-center horz-center'>
                <img
                  className='cover-img'
                  src={windowSize < 552 ? Mobile2 : page_2}
                  alt='page 3'
                />
              </div>
            </div>
          </div>
        </div>
        <div id='p4' ref={paper4} className='paper'>
          <div className='front'>
            <div id='f4' className='front-content'>
              <img
                className='cover-img'
                src={windowSize < 552 ? Mobile3 : page_3}
                alt='page 4'
              />
            </div>
          </div>
        </div>

        <div id='p5' ref={paper5} className='paper'>
          <div className='front'>
            <div id='f5' className='front-content'>
              <>
                <img
                  className='cover-img'
                  src={windowSize < 552 ? Mobile4 : page_4}
                  alt='page 5'
                />
              </>
            </div>
          </div>
        </div>
        <div id='p6' ref={paper6} className='paper'>
          <div className='front'>
            <div id='f6' className='front-content'>
              <img
                className='cover-img'
                src={windowSize < 552 ? Mobile5 : page_5}
                alt='page 6'
              />
            </div>
          </div>
        </div>
        <div id='p7' ref={paper7} className='paper'>
          <div className='front'>
            <div id='f7' className='front-content'>
              <img
                className='cover-img'
                src={windowSize < 552 ? Mobile6 : page_6}
                alt='page 7'
              />
            </div>
          </div>
        </div>
        <div id='p8' ref={paper8} className='paper'>
          <div className='front'>
            <div id='f8' className='front-content'>
              <>
                <img
                  className='cover-img'
                  src={windowSize < 552 ? Mobile7 : page_7}
                  alt='page 8'
                />
                {/* <div className='flipContent'>
                  <div className='flip-gif'>
                    <img src={flipGif} alt='flip-gif' />
                  </div>
                </div> */}
              </>
            </div>
          </div>
        </div>
        <div id='p9' ref={paper9} className='paper'>
          <div className='front'>
            <div id='f9' className='front-content'>
              <>
                <img
                  className='cover-img'
                  src={windowSize < 552 ? Mobile8 : page_8}
                  alt='page 9'
                />
              </>
            </div>
          </div>
        </div>
        <div id='p10' ref={paper10} className='paper'>
          <div className='front'>
            <div id='f10' className='front-content'>
              <>
                <img
                  className='cover-img'
                  src={windowSize < 552 ? Mobile9 : page_9}
                  alt='page 10'
                />
                <div className='flipContent'>
                  <div className='flip-gif'>
                    <img src={flipGif} alt='flip-gif' />
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
        <div id='p11' ref={paper11} className='paper'>
          <div className='front'>
            <div id='f11' className='front-content'>
              <>
                <img
                  className='cover-img'
                  src={windowSize < 552 ? Mobile10 : page_10}
                  alt='page 11'
                />
              </>
            </div>
          </div>
        </div>
        <div id='p12' ref={paper12} className='paper'>
          <div className='front'>
            <div id='f12' className='front-content'>
              <>
                <img
                  className='cover-img'
                  src={windowSize < 552 ? Mobile11 : page_11}
                  alt='page 12'
                />
              </>
            </div>
          </div>
        </div>
        {/*<div id='p13' ref={paper13} className='paper'>
          <div className='front'>
            <div id='f13' className='front-content'>
              <>
                <img
                  className='cover-img'
                  src={windowSize < 552 ? Mobile12 : page_12}
                  alt='page 13'
                />
              </>
            </div>
          </div>
        </div>
         <div id='p14' ref={paper14} className='paper' >
          <div className='front'>
            <div id='f14' className='front-content'>
              <>
                <img
                  className='cover-img'
                  src={windowSize < 552 ? blank_page_mob : blank_page}
                  alt='cover-img'
                />
              </>
              <div className='next-step-content'>
                <h1 className='step-head'>Next Steps</h1>
                <p className='step-txt'>1. Set the mint date in yur calender</p>
                <p className='step-txt'>
                  2. Follow us on{' '}
                  <span
                    onClick={() =>
                      window.open('http://twitter.com/zion_labs', '_blank')
                    }
                  >
                    twitter
                  </span>{' '}
                  and turn on notifications
                </p>
                <p className='step-txt'>
                  3. Join our{' '}
                  <span
                    onClick={() =>
                      window.open('https://discord.gg/zionlabs', '_blank')
                    }
                  >
                    discord
                  </span>{' '}
                  to meet the community and for whitelist giveaways
                </p>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div id='p10' ref={paper10} className='paper'>
          <div className='front'>
            <div id='f10' className='front-content'>
              <>
                <img
                  className='cover-img'
                  src={windowSize < 552 ? Mobile9 : page_9}
                  alt='cover-img'
                />
              </>
            </div>
          </div>
        </div>
        <div id='p11' ref={paper11} className='paper'>
          <div className='front'>
            <div id='f11' className='front-content'>
              <>
                <img
                  className='cover-img'
                  src={windowSize < 552 ? Mobile10 : page_10}
                  alt='cover-img'
                />
              </>
            </div>
          </div>
        </div> */}

        {/* <div id='p11' ref={paper11} className='paper'>
          <img className='cover-img' async src={page_0} alt='cover-img' />
        </div> */}

        <button
          id='next-btn'
          ref={nextBtn}
          className='full-btn'
          style={showZion && !showLastBtns ? { zIndex: '15' } : { zIndex: '0' }}
        ></button>

        {showLastBtns || !showZion ? (
          <>
            <div
              className='twitter-btn'
              onClick={() =>
                window.open('http://twitter.com/zion_labs', '_blank')
              }
              style={{ cursor: 'pointer' }}
            ></div>
            <button
              id='zion-btn'
              className='zion-btn'
              onClick={() => {
                console.log({ showZion, showLastBtns })
                if (showZion && showLastBtns) {
                  moveNav('p0')
                } else {
                  goNextPage()
                }
              }}
            ></button>
            <div
              className='go-phantom-btn'
              onClick={() => {
                initAuth()
              }}
            ></div>
            <div
              className='discord-btn-absolute'
              onClick={() =>
                window.open('https://discord.gg/zionlabs', '_blank')
              }
            ></div>
          </>
        ) : null}
      </div>

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className='flip-modal'
        width='max-content'
      >
        <div className='modal-body'>
          <Typography
            variant='h6'
            className='card-header'
            style={{ textAlign: 'center' }}
          >
            Hey there!
          </Typography>
          <Typography
            variant='p'
            sx={{ textAlign: 'center', color: 'gray' }}
            className='card-subheader-para'
          >
            Looks like you don't have a key. Don't worry! New members are
            welcome.
          </Typography>
        </div>
        <Button
          variant='contained'
          onClick={() => {
            handleCancel()
            window.open('https://discord.gg/zionlabs', '_blank')
          }}
          className='next-btn'
        >
          Join Our Community
        </Button>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => {
  // return { loggedStatus: state.loginLogout.isLoggedIn }
}

const mapDispatchToProps = (dispatch) => {
  // return { loginUser: (response) => dispatch(login(response)) }
}

// export default connect(mapStateToProps, mapDispatchToProps)(FlipView)
export default FlipView
