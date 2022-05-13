import React, { useEffect, useRef, useLayoutEffect } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  Menu,
  MenuItem,
  // useIsFocusVisible,
  Drawer,
  List,
  ListItem,
  // ListItemIcon,
  ListItemText,
  Divider,
  Button
} from '@mui/material'
import * as LoginAPI from '../../API/LoginAPI'
import IconButton from '@mui/material/IconButton'
// import MoreIcon from '@mui/icons-material/MoreVert'
import { Link, useLocation, useHistory } from 'react-router-dom'
import {
  account,
  zionBetaLogo,
  thunder,
  headerBot,
  sideBarSVG,
  // apeIcon,
  cross
} from '../../utils/svg/index'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import SearchCollectionContext from '../../Context/SearchCollectionContext'


const HeaderComponent = (props) => {
  const SearchContextData = React.useContext(SearchCollectionContext)
  const [collections, setCollection] = useState([])
  const searchRef = useRef()
  const history = useHistory()
  const [isFocused, setFocused] = useState(false)
  const [windowSize, setSize] = useState(window.innerWidth)
  const [drawerOpen, setDrawer] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if (!searchRef || !searchRef.current) throw new Error(`header search error`)
      searchRef.current.focus()
      const menu = document.getElementById('primary-search-account-menu')

      if (menu && menu?.childNodes?.length) {
        const dropDown = menu.childNodes[2]
        dropDown.style.border = '1px solid #fff'
        dropDown.style.borderRadius = '20px'
        dropDown.style.background = '#000'
        dropDown.style.marginTop = '10px'
        dropDown.style.top = '8.5% !important'
        dropDown.style.left = '89.5% !important'
      }
    }, 1000)
  }, [])

  useLayoutEffect(() => {
    window.addEventListener('resize', () => setSize(window.innerWidth))
  }, [window.innerWidth])

  useEffect(() => {
    if (windowSize > 552) {
      if (
        history.location.pathname === '/manage-alert' ||
        history.location.pathname === '/manage-bot'
      ) {
        searchRef.current.blur()
      } else if (history.location.pathname !== '/') {
        searchRef.current.focus()
      }
    }
  }, [history.location.pathname])

  const [showSearch, setSearch] = useState(false)
  const [hideList, setHideList] = useState(true)
  const [listItem, setItem] = useState('')
  const handleSearch = (e) => {
    setItem(e.target.value)
    setHideList(true)
    const arr = SearchContextData.collections?.filter((item) =>
      item?.name?.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setCollection(arr)
    e.preventDefault()
  }

  useEffect(() => {
    if (window.innerWidth > 552) {
      const inputElm = document.getElementById('search-field')
      inputElm.addEventListener('keydown', (e) => {
        e.stopPropagation()
      })
    }
  }, [window.innerWidth])
  
  const isAuthed = LoginAPI.isAuthed()
  const { disconnectAccount, checkAuth } = { ...props }
  const location = useLocation()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const goToBot = () => {
    if (isAuthed) {
      history.push('/manage-bot')
    } else {
      checkAuth('/manage-bot')
    }
  }

  const goToAlert = () => {
    if (isAuthed) {
      history.push('/manage-alert')
    } else {
      checkAuth('/manage-alert')
    }
  }

  const handleDrawer = () => {
    setDrawer(!drawerOpen)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      className='header-menu'
    >
      <MenuItem
        onClick={(event) => {
          handleMenuClose()
          handleMobileMenuClose(event)
          history.push('/account')
        }}
        className='header-menu-item'
      >
        Account
      </MenuItem>
      <MenuItem
        onClick={(event) => {
          handleMenuClose()
          handleMobileMenuClose(event)
          history.push('/')
        }}
        className='header-menu-item'
      >
        About Us
      </MenuItem>
      <MenuItem
        onClick={(event) => {
          if (isAuthed) {
            disconnectAccount()
          } else {
            checkAuth()
          }
          handleMenuClose()
          handleMobileMenuClose(event)
        }}
        className='header-menu-item'
      >
        {isAuthed ? 'Logout' : 'Login'}
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className='mobile-zion-menu'
      PaperProps={{
        className: 'mobile-menu-paper'
      }}
    >
      <MenuItem
        onClick={(event) => {
          if (isAuthed) {
            disconnectAccount()
          } else {
            checkAuth()
          }
          handleMobileMenuClose(event)
        }}
        className='mobile-menu-item'
      >
        {isAuthed ? 'Logout' : 'Login'}
      </MenuItem>
    </Menu>
  )

  const mobileDrawer = (
    <Drawer
      anchor='left'
      open={drawerOpen}
      onClose={handleDrawer}
      className='mobile-drawer'
      PaperProps={{
        className: 'drawer-paper'
      }}
    >
      <div className='drawer-close'>
        <span onClick={handleDrawer}>{cross}</span>
      </div>
      <Button
        className='explore-btn'
        onClick={() => {
          handleDrawer()
          history.push('/collections/degods')
        }}
        style={{
          width: '200px',
          margin: '0 auto'
        }}
      >
        Explore
      </Button>
      <List className='drawer-list'>
        <ListItem
          className={
            location.pathname.includes('bot') ? 'list-item active' : 'list-item'
          }
          onClick={() => {
            handleDrawer()
            if (isAuthed) {
              history.push('/create-bot')
            } else {
              checkAuth('/create-bot')
            }
          }}
        >
          <ListItemText className='list-item-text'>Bots</ListItemText>
        </ListItem>

        <Divider />

        {/* <ListItem
          className={
            location.pathname.includes('alert')
              ? 'list-item active'
              : 'list-item'
          }
          onClick={() => {
            handleDrawer()
            if (isAuthed) {
              history.push('/create-alert')
            } else {
              checkAuth('/create-alert')
            }
          }}
        >
          <ListItemText className='list-item-text'>Alerts</ListItemText>
        </ListItem> */}

        <Divider />

        <ListItem
          className={
            location.pathname === '/' ? 'list-item active' : 'list-item'
          }
          onClick={() => {
            handleDrawer()
            history.push('/')
          }}
        >
          <ListItemText className='list-item-text'>About Us</ListItemText>
        </ListItem>

        <Divider />

        <ListItem
          className='list-item'
          onClick={() => {
            handleDrawer()
            if (isAuthed) {
              history.push('/account')
            } else {
              checkAuth('/account')
            }
          }}
        >
          <ListItemText className='list-item-text'>Account</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  )

  return (
    <>
      {windowSize > 552 ? (
        <div className='header'>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position='fixed'>
              <Toolbar>
                <Link to={{ pathname: '/' }}>
                  <div className='header-logo'>
                    <span className='logo-part1'>{zionBetaLogo}</span>
                  </div>
                </Link>
                <Box
                  sx={{
                    width: '100%',
                    display: 'grid',
                    placeContent: 'center'
                  }}
                >
                  <div className='header-search'>
                    <div className='search-input'>
                      <input
                        type='text'
                        placeholder='search'
                        className='search-input'
                        value={listItem}
                        onChange={handleSearch}
                        ref={searchRef}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        style={{
                          width: '250px',
                          visibility: 'visible'
                        }}
                        id='search-field'
                      />
                      <ul
                        className='search-list'
                        style={
                          listItem === '' || !hideList
                            ? { display: 'none', height: '0' }
                            : { display: 'block', maxHeight: '250px' }
                        }
                      >
                        {collections.map((item) => (
                          <li
                            onClick={() => {
                              setHideList(false)
                              let str = item.name.toLowerCase()
                              history.push({
                                pathname: `/collections/${str}`
                              })
                              if (
                                location?.pathname?.includes('/collections')
                              ) {
                                window.location.reload()
                              }
                            }}
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                  className='header-icon-box'
                >
                  <IconButton
                    size='small'
                    aria-label='settings'
                    color='inherit'
                    style={{ padding: '3px' }}
                    className='header-icon'
                    onClick={() => goToBot()}
                  >
                    {headerBot}
                  </IconButton>
                  {/* <IconButton
                    onClick={() => goToAlert()}
                    size='small'
                    aria-label='settings'
                    color='inherit'
                    style={{ padding: '3px' }}
                    className='header-icon'
                  >
                    {thunder}
                  </IconButton> */}

                  <IconButton
                    size='small'
                    aria-label='account of current user'
                    color='inherit'
                    style={{ padding: '8px' }}
                    className='header-icon profile-icon'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={(event) => handleProfileMenuOpen(event)}
                  >
                    <span className='headerBotLogo'>{account}</span>
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>

            {renderMobileMenu}
            {renderMenu}
          </Box>
        </div>
      ) : (
        <div className='header'>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position='fixed'>
              <Toolbar style={{ justifyContent: 'space-between' }}>
                <IconButton
                  size='large'
                  aria-label='show more'
                  aria-haspopup='true'
                  onClick={handleDrawer}
                  color='inherit'
                  className='side-bar-svg'
                  style={{ padding: '2px' }}
                >
                  {sideBarSVG}
                </IconButton>
                {/* <IconButton
                  size='small'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  aria-label='account of current user'
                  color='inherit'
                  style={{ padding: '8px' }}
                  className='header-icon profile-icon'
                >
                  {account}
                </IconButton> */}
              </Toolbar>
            </AppBar>
            {mobileDrawer}
            {renderMobileMenu}
            {renderMenu}
          </Box>
        </div>
      )}
    </>
  )
}

export default HeaderComponent
