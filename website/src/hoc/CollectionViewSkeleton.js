import React, { useState, useEffect } from 'react'
import { Skeleton, Grid } from '@mui/material'

const CollectionViewSkeleton = () => {
  let i = 1
  const skeletonArray = []

  const [windowSize, setWindowSize] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(window.innerWidth)
    })
  }, [window.innerWidth])

  for (i = 1; i <= 16; i++) {
    skeletonArray.push(
      <Grid item key={i} xs={windowSize > 3000 ? 2 : 3} className='product'>
        <div className='product-div'>
          <Skeleton
            sx={{ bgcolor: '#212121' }}
            variant='rectangular'
            className='img-sekeleton'
            width={'inherit'}
          />
          <div className='product-info'>
            <div className='rank-name-div'>
              <Skeleton
                className='para-skeleton'
                width={'100%'}
                sx={{ bgcolor: '#212121' }}
              />
            </div>
            <div className='rank-div'>
              <Skeleton
                className='para-skeleton'
                width={'100%'}
                sx={{ bgcolor: '#212121' }}
              />
            </div>
          </div>
        </div>
      </Grid>
    )
  }

  return (
    <Grid container spacing={4} className='item-grid'>
      {skeletonArray}
    </Grid>
  )
}

export default CollectionViewSkeleton
