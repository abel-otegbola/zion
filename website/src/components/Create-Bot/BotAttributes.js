import React from 'react'
import { Container, Button, Grid } from '@mui/material'

import { cross } from '../../utils/svg'

import { Select } from 'antd'

import './BotAttributes.css'

const { Option } = Select

const BotAttributes = (props) => {
  const { traits, handleAttributes, attributes, showAttributeScreen } = props

  const makeList = (type, values) => {
    let temp = []
    values.forEach((data, index) => {
      temp.push(
        <Option key={index} value={data.value} className='filter-option'>
          <div className='filter-option-div'>
            <p className='filter-text bot-filter'>{data.value}</p>
          </div>
        </Option>
      )
    })
    return temp
  }

  const getValues = (type) => {
    let values = []
    if (attributes.length !== 0) {
      for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].trait_type === type) {
          values = [...attributes[i].value]
          break
        }
      }
    }
    return values
  }

  return (
    <div
      className='attributes-container container-marg-top animate__animated animate__fadeInUp'
      id='attributes-container'
    >
      <Container id='collection-view'>
        <div
          className='cross-button no-marg-mobile'
          onClick={() => {
            showAttributeScreen(false)
          }}
        >
          {cross}
        </div>
        <div className='filter-bar'>
          <h1 className='primary-header alert-head'>BOT ATTRIBUTES</h1>
        </div>

        <Grid container spacing={4}>
          {traits &&
            traits.map((trait, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Select
                  mode='multiple'
                  allowClear
                  style={{ width: '100%' }}
                  placeholder={trait.trait_type}
                  key={trait.trait_type}
                  value={getValues(trait.trait_type)}
                  className='bot-filter'
                  onChange={(e, value) =>
                    handleAttributes(e, value, trait.trait_type)
                  }
                >
                  {makeList(trait.trait_type, trait.values)}
                </Select>
              </Grid>
            ))}
        </Grid>
        <div className='done-btn'>
          <Button
            variant='contained'
            className='my-btn submit-btn create-btn'
            type='submit'
            onClick={(e) => {
              e.preventDefault()
              showAttributeScreen(false)
            }}
            style={{ marginBottom: '200px' }}
          >
            Done
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default BotAttributes
