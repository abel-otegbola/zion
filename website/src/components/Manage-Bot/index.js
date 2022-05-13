/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  IconButton,
  Grid
} from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { useHistory } from 'react-router-dom'
import { headerBot } from '../../utils/svg'

import './ManageBot.css'

const ExpandableTableRow = ({
  children,
  expandComponent,
  id,
  deleteBotFunc,
  ...otherProps
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <>
      <TableRow {...otherProps} className='magic-row'>
        {children}
        <TableCell align='center' className='attribute-btn-div'>
          <IconButton
            onClick={() => setIsExpanded(!isExpanded)}
            className='show-attribute-btn'
          >
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell width='5%' align='center' onClick={() => deleteBotFunc(id)}>
          <FontAwesomeIcon icon={faTrashCan} className='delete-icon' />
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow className='magic-row'>{expandComponent}</TableRow>
      )}
    </>
  )
}

const MakeAttributesComponent = ({ attributes, name }) => {
  const makeList = (values) => {
    const temp = []
    values.map((item, index) =>
      temp.push(
        <li className='list-item' key={index}>
          {item}
        </li>
      )
    )
    return temp
  }

  if (attributes.length !== 0) {
    return (
      <TableCell colSpan={12}>
        <div className='attribute-section'>
          <h1>Attributes of {name}</h1>
          <div className='attribute-list'>
            <Grid container spacing={4}>
              {attributes.map((item, index) => (
                <Grid item xs={4} key={index}>
                  <div className='list-block'>
                    <h4>{item.trait_type}</h4>
                    <ul className='listings'>{makeList(item.value)}</ul>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </TableCell>
    )
  } else {
    return null
  }
}

const ManageBotComponent = (props) => {
  const keyEvent = useCallback((e) => {
    if (e.key === 'c' && !e.defaultPrevented) {
      history.push({
        pathname: '/bot'
      })
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })

    document.addEventListener('keydown', keyEvent)

    return () => document.removeEventListener('keydown', keyEvent)
  }, [])

  const [transType, setTranstype] = useState('Triggers')
  const [windowWidth, setWidth] = useState(window.innerWidth)
  const history = useHistory()
  let {
    bots,
    toggleBot,
    updateBotFunc,
    transactions,
    fetchBots,
    fetchTransactions,
    deleteBotFunc,
    updatePrivacy
  } = {
    ...props
  }

  /**
   * update bot status to activate/deactivate
   */
  const handleToggleChange = (value, bot, index) => {
    toggleBot(bot, value, index)
  }

  const handlePrivacyToggle = (value, transaction, index) => {
    updatePrivacy(transaction, value, index)
  }

  const setTrans = () => {
    if (transType === 'Triggers') {
      setTranstype('Transactions')
      fetchTransactions()
    } else {
      setTranstype('Triggers')
      fetchBots()
    }
  }

  return (
    <Container
      style={{ width: '70%' }}
      className='container-marg-top full-container-mobile'
      id='collection-view'
    >
      <div className='filter-bar'>
        <h1 className='bot-header'>
          <span>{headerBot}</span>BOTS
        </h1>
      </div>
      <div className='bot-switch-div'>
        <div
          className='div-btn blue'
          onClick={() =>
            history.push({
              pathname: '/withdraw-request'
            })
          }
        >
          WALLET
        </div>
        {windowWidth <= 552 ? null : (
          <div className='head'>
            {transType !== 'Triggers' ? 'TRANSACTIONS' : 'TRIGGERS'}
          </div>
        )}

        <div className='div-btn blue' onClick={() => setTrans()}>
          {transType === 'Triggers' ? 'TRANSACTIONS' : 'TRIGGERS'}
        </div>
      </div>
      {windowWidth <= 552 ? (
        <div className='head'>
          {transType !== 'Triggers' ? 'TRANSACTIONS' : 'TRIGGERS'}
        </div>
      ) : null}

      {transType === 'Triggers' ? (
        <TableContainer component='div' className='magic-table'>
          <Table
            stickyHeader
            className='manage-table'
            aria-label='simple table'
          >
            <TableHead className='magic-table-head'>
              <TableRow className='Heading-row'>
                <TableCell
                  width='2%'
                  style={{ paddingLeft: '20px' }}
                  align='center'
                >
                  STATUS
                </TableCell>
                <TableCell width='7%' align='center'>
                  NAME
                </TableCell>
                <TableCell width='6%' align='center'>
                  COLLECTION
                </TableCell>
                <TableCell width='8%' align='center'>
                  Rank
                </TableCell>
                <TableCell width='11%' align='center'>
                  Price
                </TableCell>
                <TableCell width='7%' align='center'>
                  More Info
                </TableCell>
                <TableCell width='5%' align='center'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bots && bots?.length !== 0
                ? bots.map((bot, index) => (
                    <ExpandableTableRow
                      key={index}
                      deleteBotFunc={deleteBotFunc}
                      id={bot._id}
                      expandComponent={
                        <MakeAttributesComponent
                          attributes={bot?.config?.attributes || []}
                          name={bot?.name || 0}
                        />
                      }
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        style={{ paddingLeft: '20px' }}
                        className='first-col radio-col'
                        align='center'
                      >
                        <Radio
                          checked={bot.active}
                          onClick={(event) =>
                            handleToggleChange(bot.active, bot, index)
                          }
                          name='color-radio-button-demo'
                          className='table-radio'
                          sx={{
                            color: '#fff',
                            '&.Mui-checked': {
                              color: '#68eced'
                            }
                          }}
                        />
                      </TableCell>

                      <TableCell
                        onClick={() => updateBotFunc(bot)}
                        align='center'
                      >
                        <p className='table-data'>{bot?.name || 0}</p>
                      </TableCell>
                      <TableCell
                        onClick={() => updateBotFunc(bot)}
                        align='center'
                      >
                        <p className='table-data'>
                          {bot?.config?.collectionName || ''}
                        </p>
                      </TableCell>
                      <TableCell
                        onClick={() => updateBotFunc(bot)}
                        align='center'
                      >
                        <p className='table-data'>
                          {bot?.config?.rank_range?.min &&
                          bot?.config?.rank_range?.max
                            ? `# ${bot?.config?.rank_range?.min || 0}
                           - # ${bot?.config?.rank_range?.max || 0}`
                            : 'ALL'}
                        </p>
                      </TableCell>
                      <TableCell
                        onClick={() => updateBotFunc(bot)}
                        align='center'
                      >
                        <p className='table-data'>
                          {bot?.config?.price_range?.min?.$numberDecimal ||
                            bot?.config?.price_range?.min ||
                            0}{' '}
                          -{' '}
                          {bot?.config?.price_range?.max?.$numberDecimal ||
                            bot?.config?.price_range?.max ||
                            0}{' '}
                          SOL
                        </p>
                      </TableCell>
                    </ExpandableTableRow>
                  ))
                : null}
            </TableBody>
          </Table>
          <Button
            variant='contained'
            className='my-btn'
            onClick={() => history.push('/bot')}
          >
            CREATE BOT
          </Button>
        </TableContainer>
      ) : (
        <TableContainer component='div' className='magic-table'>
          <Table aria-label='simple table'>
            <TableHead className='magic-table-head'>
              <TableRow className='Heading-row'>
                {/* <TableCell
                  width='4%'
                  style={{ paddingLeft: '20px' }}
                  align='center'
                >
                  PRIVACY
                </TableCell> */}
                <TableCell width='7%' align='center'>
                  TRANSACTION
                </TableCell>
                <TableCell width='8%' align='center'>
                  TIME
                </TableCell>
                <TableCell width='13%' align='center'>
                  TOKEN
                </TableCell>
                <TableCell width='8%' align='center'>
                  SIGNATURE
                </TableCell>
                <TableCell width='6%' align='center'>
                  SOL
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions && transactions.length !== 0
                ? transactions.map((transaction, index) => (
                    <TableRow key={index} className='magic-row'>
                      {/* <TableCell
                        component='th'
                        scope='row'
                        style={{ paddingLeft: '20px' }}
                        className='first-col radio-col'
                        align='center'
                      >
                        <Radio
                          checked={transaction?.privacy || false}
                          onClick={(event) =>
                            handlePrivacyToggle(
                              transaction.privacy,
                              transaction,
                              index
                            )
                          }
                          name='color-radio-button-demo'
                          className='table-radio'
                          sx={{
                            color: '#fff',
                            '&.Mui-checked': {
                              color: '#68eced'
                            }
                          }}
                        />
                      </TableCell> */}
                      <TableCell align='center'>
                        <p className='table-data'>
                          {transaction?.result?.status === 'OK'
                            ? 'SUCCESS'
                            : 'ATTEMPTED'}
                        </p>
                      </TableCell>
                      <TableCell align='center'>
                        <p className='table-data'>
                          {transaction?.createdAt.substring(0, 10)}
                        </p>
                      </TableCell>
                      <TableCell align='center'>
                        <p className='table-data'>
                          {transaction?.token_name || ''}
                        </p>
                      </TableCell>

                      <TableCell align='center'>
                        <p className='table-data'>
                          <a
                            href={`https://solscan.io/tx/${transaction?.result?.signature}`}
                            target='_blank'
                            rel='noreferrer'
                          >
                            {transaction?.result?.signature &&
                            transaction?.result?.signature !== ''
                              ? `${transaction?.result?.signature?.substr(
                                  0,
                                  15
                                )}...`
                              : ''}
                          </a>
                        </p>
                      </TableCell>
                      <TableCell align='center'>
                        <p className='table-data'>
                          {transaction?.amount || ''}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
          <Button
            variant='contained'
            className='my-btn'
            onClick={() => history.push('/bot')}
          >
            Create Bot
          </Button>
        </TableContainer>
      )}
    </Container>
  )
}

export default ManageBotComponent
