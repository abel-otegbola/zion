import React from 'react'
import { Grid, Skeleton } from '@mui/material'

const TokenViewSkeleton = () => {
  const createSkeleton = () => {
    let temp = []
    for (let i = 0; i < 8; i += 1) {
      temp.push(
        <Grid item xs={6}>
          <Skeleton
            width={'100%'}
            height={'150px'}
            style={{
              backgroundColor: 'rgba(250, 250, 250, 0.11)'
            }}
          />
        </Grid>
      )
    }
    return temp
  }

  return createSkeleton()
}

export default TokenViewSkeleton
