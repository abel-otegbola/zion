import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Grid, Container, Button } from '@mui/material'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Warning from '../../hoc/warning'
import CloseIcon from '@mui/icons-material/Close'
import {
  Select,
  Slider,
  Spin,
  Modal,
  Drawer,
  Menu,
  Checkbox,
  Radio,
  AutoComplete
} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import SearchCollectionContext from '../../Context/SearchCollectionContext'
import {
  dropdownArrow,
  edenLogo,
  edenWhiteLogo,
  filterSVG,
  mobSidebarSVG,
  plusIcon,
  searchIcon
} from '../../utils/svg'

import CollectionViewSkeleton from '../../hoc/CollectionViewSkeleton'
import CollectionMobSkeleton from '../../hoc/CollectionMobSkeleton'

import './CollectionView.css'
import './MobCollectionView.css'

const { Option } = Select
const antIcon = (
  <LoadingOutlined style={{ fontSize: 35, color: '#68cede' }} spin />
)

const { SubMenu } = Menu

const CollectionViewComponent = (props) => {
  const {
    data,
    collectionName,
    traitCount,
    moveToAlert,
    attributeData,
    showSkeleton,
    rankRange,
    priceRange,
    handleSlider,
    totalRank,
    handleAttributes,
    resetFilters,
    traits,
    getTraitCount,
    getCollectionsActiveListening,
    name,
    handleTraitRadio,
    sidebar,
    status,
    setStatus,
    price,
    selectPrice
  } = {
    ...props
  }

  const history = useHistory()
  let filterOptions = React.useContext(SearchCollectionContext)

  filterOptions = filterOptions.collections
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const [visible, setVisible] = useState(false)
  const [options, setOptions] = useState([])
  const [inputVal, setVal] = useState('')
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  const match = useRouteMatch()
  const { url } = match

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const makeFilterOptions = () => {
    const temp = []
    filterOptions?.forEach((option) => {
      temp.push({ label: option.name, value: option.name })
    })

    setOptions([...temp])
  }

  useEffect(() => {
    makeFilterOptions()
  }, [filterOptions])

  useLayoutEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(window.innerWidth)
    })
  }, [])

  const checkForTrue = (value, type) => {
    let isPresent = false

    traits.forEach((trait) => {
      if (trait.type === type) {
        trait.value.forEach((val) => {
          if (val === value) {
            isPresent = true
          }
        })
      }
    })

    return isPresent
  }

  const makeOptions = (values, type) => {
    let temp = []
    values.forEach((data, index) => {
      temp.push(
        <Menu.Item key={data.value} className='attribute-options'>
          <Radio
            value={data.value}
            className='attribute-select-radio'
            checked={((e) => checkForTrue(data.value, type))()}
            onClick={(event) => handleTraitRadio(data.value, type)}
          >
            <div className='attribute-option-group'>
              <p className='attribute-value'>{data.value}</p>
              <p className='attribute-count'>Count: {data.count}</p>
            </div>
          </Radio>
        </Menu.Item>
      )
    })
    return temp
  }

  return (
    <>
      {windowSize > 552 ? (
        <>
          <Container
            maxWidth={false}
            className='collection-container zion-container'
            style={{ marginTop: '89px' }}
          >
            <div className='collection-header'>
              <h1 className='collection-name-head'>{collectionName}</h1>
              {/* <Button className='collection-view-btn' onClick={showModal}>
                Automate
              </Button> */}
            </div>
            <div className='collection-view-body'>
              <Grid container>
                <Grid item xs={windowSize > 3000 ? 2 : 3}>
                  <div className='side-nav'>
                    <Menu
                      style={{ width: '95%' }}
                      mode='inline'
                      className='sidebar'
                    >
                      {sidebar.map((data, index) => {
                        if (data.type === 'checkbox') {
                          return (
                            <SubMenu
                              key={index}
                              icon={data.icon}
                              title={data.title}
                              className='sidebar-submenu'
                            >
                              {data.data.map((item, index) => (
                                <Menu.Item
                                  key={index}
                                  className='sidebar-submenu-item'
                                >
                                  <Checkbox
                                    value={item.value}
                                    className='sidebar-checkbox'
                                    checked={
                                      data.title === 'Status'
                                        ? status === item.value
                                          ? true
                                          : false
                                        : data.title === 'Price'
                                        ? price === item.value
                                          ? true
                                          : false
                                        : false
                                    }
                                    onClick={() =>
                                      setStatus(data.title, item.value)
                                    }
                                  >
                                    {item.key}
                                  </Checkbox>
                                </Menu.Item>
                              ))}
                            </SubMenu>
                          )
                        }
                        if (data.type === 'radio') {
                          return (
                            <SubMenu
                              key={index}
                              icon={data?.icon}
                              title={data.title}
                              className='sidebar-submenu'
                            >
                              {data.data.map((item, index) => (
                                <Menu.Item
                                  key={index}
                                  className='sidebar-submenu-item'
                                >
                                  <Radio
                                    value={item.value}
                                    className='sidebar-radio'
                                    checked={((e) =>
                                      checkForTrue(item.value, data.title))()}
                                    onClick={(event) =>
                                      handleTraitRadio(item.value, data.title)
                                    }
                                  >
                                    <div className='attribute-radio-div'>
                                      {item.key.length > 12 ? (
                                        <p title={item.key}>
                                          {item.key.substr(0, 12)}...
                                        </p>
                                      ) : (
                                        <p title={item.key}>{item.key}</p>
                                      )}
                                      <p>Count: {item.count}</p>
                                    </div>
                                  </Radio>
                                </Menu.Item>
                              ))}
                            </SubMenu>
                          )
                        }
                        return true
                      })}
                      <Button
                        className='collection-view-btn rst-btn'
                        onClick={resetFilters}
                      >
                        <span className='reset-cross'>
                          <CloseIcon height='27px' />
                        </span>
                        Reset Filters
                      </Button>
                    </Menu>
                  </div>
                </Grid>
                <Grid item xs={windowSize > 3000 ? 10 : 9}>
                  {showSkeleton ? (
                    <CollectionViewSkeleton />
                  ) : data.length !== 0 ? (
                    <InfiniteScroll
                      dataLength={data.length}
                      next={getCollectionsActiveListening}
                      hasMore={data.length === traitCount ? false : true}
                      loader={
                        <div className='spinner'>
                          <Spin indicator={antIcon} />
                        </div>
                      }
                    >
                      <Grid container spacing={4} className='item-grid'>
                        {data.map((item, index) => {
                          return (
                            <Grid
                              item
                              key={index}
                              xs={windowSize > 3000 ? 2 : 3}
                              className='product'
                            >
                              <Link
                                to={{
                                  pathname: `/token/${
                                    status === 'LIST' ? item.mint : item._id
                                  }`,
                                  state: {
                                    prevPath: url,
                                    name: name
                                  }
                                }}
                                className='product-anchor'
                              >
                                <div className='product-div'>
                                  <div className='product-img'>
                                    <img
                                      src={item?.image}
                                      alt={item?.name || ''}
                                    />
                                  </div>

                                  <div className='product-info'>
                                    <div className='rank-name-div'>
                                      <p className='product-name'>
                                        {item?.name ? `${item?.name}` : ''}
                                      </p>
                                      {item?.amount?.$numberDecimal ? (
                                        <p className='product-name'>
                                          {item.amount.$numberDecimal} SOL
                                        </p>
                                      ) : (
                                        ''
                                      )}
                                    </div>
                                    <div className='rank-div'>
                                      <div className='product-owner'>
                                        {edenLogo}
                                      </div>
                                      {item?.rank ? (
                                        <p className='product-name'>
                                          {item?.rank || ''}
                                        </p>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </Grid>
                          )
                        })}
                      </Grid>
                    </InfiniteScroll>
                  ) : (
                    <Warning />
                  )}
                </Grid>
              </Grid>
            </div>
          </Container>

          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            className='automate-modal'
            width='max-content'
          >
            <div className='automate-div'>
              <Button
                className='my-btn modal-btn'
                onClick={() => {
                  moveToAlert('/create-alert')
                }}
              >
                Create Alert
              </Button>
              <Button
                className='my-btn modal-btn'
                onClick={() => {
                  moveToAlert('/bot')
                }}
              >
                Create Bot
              </Button>
            </div>
          </Modal>

        </>
      ) : (
        <>
          <Drawer
            placement='right'
            className='mob-filter-drawer'
            onClose={onClose}
            visible={visible}
            width='100%'
          >
            <Menu
              style={{ width: '100%' }}
              defaultOpenKeys={['status']}
              mode='inline'
              expandIcon={plusIcon}
            >
              <SubMenu
                className='attribute-submenu'
                key='status'
                icon={mobSidebarSVG}
                title='Status'
              >
                <Menu.Item className='attribute-options' key='1'>
                  <Radio className='attribute-select-radio'>All</Radio>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                className='attribute-submenu'
                key='marketplace'
                icon={mobSidebarSVG}
                title='Magiceden'
              >
                <Menu.Item className='attribute-options' key='1'>
                  <Radio className='attribute-select-radio'>All</Radio>
                </Menu.Item>
                <Menu.Item className='attribute-options' key='2'>
                  <Radio className='attribute-select-radio'>Magiceden</Radio>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key='price-range'
                className='attribute-submenu'
                icon={mobSidebarSVG}
                title='Price Filter'
              >
                <Menu.Item key='price-slider'>
                  <Slider range defaultValue={[20, 50]} />
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key='attributes'
                className='attribute-menu-section'
                icon={mobSidebarSVG}
                title='Attributes'
              >
                <Menu
                  style={{ width: '100%' }}
                  mode='inline'
                  className='attribute-menu'
                  expandIcon={dropdownArrow}
                >
                  {attributeData &&
                    attributeData.length !== 0 &&
                    attributeData.map((item, index) => {
                      return (
                        <SubMenu
                          className='attribute-submenu'
                          key={item.trait_type}
                          title={item.trait_type}
                        >
                          {makeOptions(item.values, item.trait_type)}
                        </SubMenu>
                      )
                    })}
                </Menu>
              </SubMenu>
            </Menu>
          </Drawer>

          <Container>
            <div className='mob-collection-view'>
              <div className='mob-collection-fix-head'>
                <div className='mob-search'>
                  <AutoComplete
                    style={{ width: '100%' }}
                    placeholder='Search Collections'
                    className='mob-search-autocomplete'
                    options={options}
                    value={inputVal}
                    filterOption={(inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    dropdownClassName='mob-search-dropdown'
                    onChange={(event) => setVal(event)}
                    onSelect={(event) => {
                      setVal(event)

                      setTimeout(() => window.location.reload(), 500)
                      history.push({
                        pathname: `/collections/${event}`
                      })
                    }}
                  />
                  <div className='mob-search-svg'>{searchIcon}</div>
                </div>
                <div className='mob-collection-filter'>
                  <div id='select-price-container' style={{ width: '60%' }}>
                    <Select
                      defaultValue='ASC'
                      onChange={selectPrice}
                      className='mob-select-price filter sort'
                      dropdownClassName='mob-search-dropdown price-select'
                    >
                      <Option value='ASC' className='mob-price-option'>
                        Low To High
                      </Option>
                      <Option value='DES' className='mob-price-option'>
                        High to Low
                      </Option>
                    </Select>
                  </div>

                  <div className='filter side-bar-access' onClick={showDrawer}>
                    Filter <span>{filterSVG}</span>
                  </div>
                </div>
              </div>

              {showSkeleton ? (
                <CollectionMobSkeleton />
              ) : data && data.length !== 0 ? (
                <InfiniteScroll
                  dataLength={data.length}
                  next={getCollectionsActiveListening}
                  hasMore={true}
                  loader={
                    <div className='spinner'>
                      <Spin indicator={antIcon} />
                    </div>
                  }
                  style={{ marginTop: '26%', padding: '0' }}
                  height='62vh'
                >
                  <Grid container spacing={3} className='mob-product-div'>
                    {data.map((item, index) => (
                      <Grid item key={index} xs={6} className='product'>
                        <Link
                          to={{
                            pathname: `/token/${
                              status === 'LIST' ? item.mint : item._id
                            }`,
                            state: {
                              prevPath: url,
                              name: name
                            }
                          }}
                          className='mob-product-anchor'
                        >
                          <div className='mob-product-div'>
                            <img src={item?.image} alt={item?.name || ''} />

                            <div className='mob-product-info'>
                              <div className='mob-rank-name-div'>
                                <p className='mob-product-name'>
                                  {item?.name ? `${item?.name}` : ''}
                                </p>
                                {item?.amount ? (
                                  <p className='mob-token-count'>
                                    {item.amount.$numberDecimal} SOL
                                  </p>
                                ) : (
                                  <p className='mob-token-count'>160 SOL</p>
                                )}
                              </div>
                              <div className='collection-eden-logo'>
                                {edenWhiteLogo}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </InfiniteScroll>
              ) : (
                <Warning />
              )}

              <button
                className='collection-glow-btn'
                onClick={() => {
                  moveToAlert('/bot')
                }}
              >
                Setup Bot
              </button>
            </div>
          </Container>
        </>
      )}
    </>
  )
}

export default CollectionViewComponent
