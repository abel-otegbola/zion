import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Chip,
  Stack
} from '@mui/material'

import { Select, Tag } from 'antd'
import { getTraits } from '../../../API/CollectionsDataAPI'
import React from 'react'
import BACK from '../../../utils/images/icons/close.png'
import Context from '../Context'
import SearchCollectionContext from '../../../Context/SearchCollectionContext'
import { CircularProgress } from '@mui/material'
import { botModuleBackNew } from '../../../utils/svg'
function TagRender(props) {
  const { label, value, closable, onClose } = props
  const onPreventMouseDown = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
        borderRadius: 10,
        backgroundColor: '#32404B',
        color: 'cyan',
        marginLeft: 3
      }}
    >
      {label}
    </Tag>
  )
}

const Name = ({ attributes, prevCol, setPrevCol }) => {
  const { Option } = Select
  const [Obj, setObj] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  const { BotState, handlePrevious, handleNext, setBotState } =
    React.useContext(Context)

  const { collections } = React.useContext(SearchCollectionContext)

  const arr = collections.map((item) => ({
    label: item.name,
    value: item.name
  }))

  React.useEffect(() => {
    setLoading(true)
    if (prevCol !== BotState.CollectionName) {
      setBotState((prev) => ({
        ...prev,
        attributes: []
      }))
      setPrevCol(BotState.CollectionName)
    }
    const fetchData = async () => {
      const res = await getTraits(BotState.CollectionName || 'DeGods')

      const obj = {}
      res.data.available_traits.map((item) => {
        const { trait_type, values } = item
        obj[trait_type] = values
      })

      setObj(obj)
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleAttributes = (event, value, type) => {
    let temp =
      BotState?.attributes && BotState?.attributes.length !== 0
        ? [...BotState.attributes]
        : []
    let flag = true
    if (event.length === 0) {
      let index
      for (let i = 0; i < BotState.attributes.length; i++) {
        if (type === BotState.attributes[i].trait_type) {
          index = i
          break
        }
      }
      temp.splice(index, 1)
    } else {
      if (temp.length !== 0) {
        temp.forEach((item) => {
          if (item.trait_type === type) {
            item.value = [...event]
            flag = false
          }
        })
        if (flag) {
          temp.push({
            trait_type: type,
            value: [...event]
          })
        }
      } else {
        temp.push({
          trait_type: type,
          value: [...event]
        })
      }
    }

    setBotState((prev) => ({
      ...prev,
      attributes: [...temp]
    }))
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

      <Box className='card-box'>
        <Grid container>
          <Grid item xs={12} className='card-content-grid'>
            <Typography variant='h6' className='card-header'>
              Choose Attributes
            </Typography>
            <Typography variant='caption' className='card-subheader-para'>
              Please select attributes related to your desired NFTs.
            </Typography>
            <br />

            <br />

            {!loading ? (
              <Grid
                container
                spacing={3}
                className='attribute-box'
                sx={{ pb: 15 }}
              >
                {Object.keys(Obj).map((trait, i) => (
                  <Grid item md={6} className='attribute-stack'>
                    <Typography
                      variant='caption'
                      className='card-subheader-para attribute-head subheader-para-label'
                    >
                      {trait}
                    </Typography>
                    <Select
                      key={i}
                      mode='multiple'
                      allowClear
                      placeholder='All'
                      style={{ color: 'white' }}
                      onChange={(e, value) => {
                        handleAttributes(e, value, trait)
                      }}
                      dropdownAlign={{
                        points: ['tl', 'bl'], // align dropdown bottom-left to top-left of input element
                        offset: [-10, 12], // align offset
                        overflow: {
                          adjustX: 0,
                          adjustY: 0 // do not auto flip in y-axis
                        }
                      }}
                      dropdownClassName='custom-dropdown bot-autocomplete-dropdown after-elm'
                      className='bot-autocomplete-input'
                      showArrow={false}
                      tagRender={TagRender}
                      value={getValues(trait)}
                    >
                      {Obj[trait].map((item, index) => (
                        <Option
                          key={index}
                          value={item.value}
                          className='bot-autocomplete-option'
                        >
                          {item.value}
                        </Option>
                      ))}
                    </Select>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <CircularProgress />
            )}
            <br />

            {/* dropdownClassName='custom-dropdown'
              className='bot-autocomplete-input' */}

            <Button
              variant='contained'
              onClick={handleNext}
              className='next-btn'
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Name
