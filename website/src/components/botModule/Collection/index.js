import { Box, Grid, Typography, Button, Stack } from '@mui/material'

import React, { useEffect } from 'react'
import Context from '../Context'
import SearchCollectionContext from '../../../Context/SearchCollectionContext'
import { AutoComplete } from 'antd'
import styles from '../Styles'
import { CircularProgress } from '@mui/material'

import { useHistory } from 'react-router-dom'
import { botModuleCross } from '../../../utils/svg'
import { toast } from 'react-toastify'

const Collection = () => {
  const history = useHistory()
  const { handlePrevious, handleNext, setBotState, BotState } =
    React.useContext(Context)
  const [name, setName] = React.useState(BotState.CollectionName || '')

  const { collections } = React.useContext(SearchCollectionContext)

  const [images, setImages] = React.useState(
    BotState.CollectionName
      ? [
          {
            image: collections.filter((item) =>
              item.name.includes(BotState.CollectionName)
            )[0]?.image
          }
        ]
      : []
  )

  const handleChange = (e) => {
    setName(e)

    const Filter = collections.filter((item) =>
      item.name.toLowerCase().includes(e.toLowerCase())
    )
    setImages(Filter)
    if (Filter.length === 1)
      setBotState((prev) => ({
        ...prev,
        CollectionName: Filter[0].name,
        CollectionId: Filter[0]._id,
        CollectionImage: Filter[0].image
      }))

    // call api to update Collections
  }

  const arr = collections.map((item) => ({
    label: item.name,
    value: item.name
  }))

  return (
    <>
      <Grid
        item
        xs={0.875}
        color={'white'}
        sx={{ display: 'grid', placeContent: 'center', mt: 1 }}
        className='back-cross-grid'
      >
        <div
          onClick={() => {
            history.push('/manage-bot')
          }}
          className='back-btn-div'
        >
          {botModuleCross}
        </div>
      </Grid>
      <Box className='card-box'>
        <Grid container>
          <Grid item xs={12} className='card-content-grid'>
            <Typography variant='h6' className='card-header'>
              Select the NFT Collection
            </Typography>
            <Typography
              variant='caption'
              sx={{ textAlign: 'center', color: 'gray' }}
              className='card-subheader-para'
            >
              Don’t worry you can always come back to this step if you need to.
            </Typography>
            <br />

            <br />
            <Typography
              variant='caption'
              sx={{ textAlign: 'left', width: '67%', color: 'gray' }}
              className='card-subheader-para subheader-para-label'
            >
              Name
            </Typography>

            <AutoComplete
              value={name}
              id='autocomplete-drop'
              defaultValue={BotState.CollectionName}
              dropdownAlign={{
                points: ['tl', 'bl'], // align dropdown bottom-left to top-left of input element
                offset: [-15, 15], // align offset
                overflow: {
                  adjustX: 0,
                  adjustY: 0 // do not auto flip in y-axis
                }
              }}
              options={arr.filter((item) =>
                item.value.toLowerCase().includes(name.toLowerCase())
              )}
              notFoundContent={
                <CircularProgress sx={{ display: 'flex', margin: 'auto' }} />
              }
              filterOption={true}
              onChange={handleChange}
              loading
              dropdownClassName='custom-dropdown bot-autocomplete-dropdown'
              className='bot-autocomplete-input collection-input'
            />

            <br />
            <div className='images-render'>
              {name !== '' && BotState.CollectionName && (
                <>
                  <Box className='collection-img-grid'>
                    {images
                      .slice(0, Math.min(images.length, 3))
                      .map((image, i) => (
                        <Stack
                          className={`collection-img-card ${
                            images.length === 1 ? 'full' : ''
                          }`}
                        >
                          <img
                            src={
                              image.image ||
                              'https://images.unsplash.com/photo-1599148400620-8e1ff0bf28d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2268&q=80'
                            }
                            alt='img'
                          />
                        </Stack>
                      ))}
                  </Box>
                </>
              )}
            </div>

            {BotState.CollectionName || name ? (
              <Button
                variant='contained'
                onClick={() => {
                  if (name === '') {
                    toast.error('Please select a collection name.')
                  } else {
                    handleNext()
                  }
                }}
                className='next-btn'
              >
                Next
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Collection
