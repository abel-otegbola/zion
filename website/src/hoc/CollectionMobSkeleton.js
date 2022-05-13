import React from 'react'
import { Grid, Skeleton } from '@mui/material'

const CollectionMobSkeleton = () => {
  let i = 1
  const skeletonArray = []

  for (i = 1; i <= 4; i++) {
    skeletonArray.push(
      <Grid item key={i} xs={6} className='product'>
        <div className='mob-product-div'>
          <Skeleton
            sx={{ bgcolor: '#212121' }}
            variant='rectangular'
            width={'inherit'}
            height={'167px'}
          />

          <div className='mob-product-info'>
            <div className='mob-rank-name-div'>
              <Skeleton
                width={'100px'}
                height={'14px'}
                sx={{ bgcolor: '#212121' }}
              />
              <Skeleton
                width={'80px'}
                sx={{ bgcolor: '#212121' }}
                height={'20px'}
              />
            </div>
            <div className='collection-eden-logo'>
              <Skeleton
                sx={{ bgcolor: '#212121' }}
                variant='rectangular'
                width={'inherit'}
                height={'16px'}
              />
            </div>
          </div>
        </div>
      </Grid>
    )
  }

  return (
    <Grid
      container
      spacing={3}
      className='mob-product-div'
      style={{ marginTop: '100px' }}
    >
      {skeletonArray}
    </Grid>
  )
}

export default CollectionMobSkeleton
