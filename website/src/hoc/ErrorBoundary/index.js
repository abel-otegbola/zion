/* eslint-disable no-lone-blocks */
import { Button } from '@mui/material'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { backArrow, errSvg } from '../../utils/svg'
import './style.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    {
      this.state = {
        hasError: false
      }
    }
  }

  static getDerivedStateFromError = (error) => {
    return {
      hasError: true
    }
  }

  componentDidCatch = (error, info) => {
    console.log('error', error)
    console.log('err info', info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-boundary'>
          <div className='middle-section'>
            <div className='error-content'>
              <div className='content'>
                <h1 className='err-head'>Oops</h1>
                <h2 className='err-sub-head'>Page not found</h2>
                <p className='err-para'>
                  This Page doesn`t exist or was removed!
                  <br />
                  We suggest you go back to home.
                </p>
                <Button
                  onClick={() => {
                    this.props.history.push('/')
                  }}
                  className='went-back-btn'
                >
                  <span className='back-arrow'>{backArrow}</span>Back to Home
                </Button>
              </div>
              <div className='went-wrong-icon'>{errSvg}</div>
            </div>
          </div>
        </div>
      )
    } else {
      return this.props.children
    }
  }
}

export default withRouter(ErrorBoundary)
