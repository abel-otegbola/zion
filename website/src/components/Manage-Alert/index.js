/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect, useState } from 'react'
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
  Paper
} from '@mui/material'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { alertThunder } from '../../utils/svg'

import './ManageAlert.css'

const ManageAlertComponent = (props) => {
  const history = useHistory()

  const keyEvent = useCallback((e, str = '') => {
    if (e.key === 'c') {
      handleClick()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', keyEvent)

    return () => document.removeEventListener('keydown', keyEvent)
  }, [])

  let { alerts, updateAlertFunc, updateCollectionAlert } = {
    ...props
  }

  const handleClick = () => {
    if (alerts.length > 2) {
      toast.error('Too many alerts.')
    } else {
      history.push('/create-alert')
    }
  }

  const handleToggleChange = (value, alert, index) => {
    updateCollectionAlert(alert, value, index)
  }

  return (
    <>
      <Container
        style={{ width: '70%', height: '100vh' }}
        className='container-marg-top full-container-mobile'
        id='collection-view'
      >
        <div className='filter-bar'>
          <h1 className='bot-header'>
            <span>{alertThunder}</span>Alerts
          </h1>
        </div>

        <TableContainer className='magic-table'>
          <Table stickyHeader={true} aria-label='simple table'>
            <TableHead className='magic-table-head'>
              <TableRow className='Heading-row'>
                <TableCell
                  width='8%'
                  style={{ paddingLeft: '20px' }}
                  align='center'
                >
                  STATUS
                </TableCell>
                <TableCell width='18%' align='center'>
                  ALERT NAME
                </TableCell>
                <TableCell width='12%' align='center'>
                  COLLECTION NAME
                </TableCell>
                <TableCell width='8%' align='center'>
                  ALERT TYPE
                </TableCell>
                <TableCell width='7%' align='center'>
                  DESTINATION
                </TableCell>
                <TableCell width='10%' align='center'>
                  DESTINATION DETAILS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alerts.length !== 0
                ? alerts.map((alert, index) => (
                    <TableRow key={index} className='magic-row'>
                      <TableCell
                        component='th'
                        scope='row'
                        style={{ paddingLeft: '20px' }}
                        className='first-col radio-col'
                        align='center'
                      >
                        <Radio
                          checked={alert.isDisabled ? false : true}
                          onClick={(event) =>
                            handleToggleChange(alert.isDisabled, alert, index)
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
                        onClick={() => {
                          updateAlertFunc(alert)
                        }}
                        align='center'
                      >
                        <p className='table-data'>{alert?.name || ''}</p>
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          updateAlertFunc(alert)
                        }}
                        align='center'
                      >
                        <p className='table-data'>
                          {alert?.collectionName || ''}
                        </p>
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          updateAlertFunc(alert)
                        }}
                        align='center'
                      >
                        <p className='table-data'>{alert?.alertType || ''}</p>
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          updateAlertFunc(alert)
                        }}
                        align='center'
                      >
                        <p
                          className='table-data'
                          style={
                            alert?.notificationInfo?.via === 'sms'
                              ? { textTransform: 'uppercase' }
                              : null
                          }
                        >
                          {alert?.notificationInfo?.via || ''}
                        </p>
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          updateAlertFunc(alert)
                        }}
                        align='center'
                      >
                        <p className='table-data'>
                          {alert?.notificationInfo.via === 'sms'
                            ? `${alert.notificationInfo.phone}`
                            : alert?.notificationInfo.via === 'whatsApp'
                            ? `${alert.notificationInfo.whatsapp}`
                            : `${alert.notificationInfo.url.substr(0, 15)}...`}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant='contained'
          className='my-btn'
          onClick={() => {
            handleClick()
          }}
        >
          Create Alert
        </Button>
      </Container>
    </>
  )
}

export default ManageAlertComponent
