import React from 'react'
import * as web3 from '@solana/web3.js'
import { getParsedNftAccountsByOwner } from '@nfteyez/sol-rayz'
import { Container, Box } from '@mui/material'
import { disabledLink } from '../../constants'
import NFTComponent from './NFTComponent'

const Wallet = ({ tabValue }) => {
  const [NFTCollection, setNFTCollection] = React.useState(new Map())
  const checkForNfts = React.useCallback(async () => {
    const NFTMap = new Map()
    // solana ->>> IMGE1 , IMAGE 2
    try {
      var connection = new web3.Connection(
        web3.clusterApiUrl('mainnet-beta'),
        'confirmed',
      )

      const resp = await window?.solana?.connect()
      const key = resp.publicKey.toString()

      let details = await getParsedNftAccountsByOwner({
        publicAddress: key,
        connection: connection,
        serialization: true
      })

      const fetches = details.map(async (_, i) => {
          let temp = true

          for (let j = 0; j < disabledLink.length; j++) {
            if (details[i]?.data?.uri.includes(disabledLink[i])) {
              temp = false
              break
            }
          }

          if (temp) {
            try {
              return fetch(details[i].data.uri)
            } catch (err) {
              console.log('error', err)
            }
          }
      })
      let ptr = 0
      const ans = await Promise.all(fetches)
      const response = await Promise.all(ans.map((r) => r.json()))

      for (let i = 0; i < details.length; i++) {
        let temp = true

        for (let j = 0; j < disabledLink.length; j++) {
          if (details[i]?.data?.uri.includes(disabledLink[i])) {
            temp = false
            break
          }
        }
        if (temp) {
          try {
            const CollectionName = details[i].data.name.split('#')[0].trim()

            if (NFTMap.has(CollectionName)) {
              const temp = NFTMap.get(CollectionName)
              temp.push(response[ptr++].image)
              NFTMap.set(CollectionName, temp)
            } else {
              const temp = []
              temp.push(response[ptr++].image)
              NFTMap.set(CollectionName, temp)
            }
          } catch (err) {
            console.log('error', err)
          }
        }
      }

      setNFTCollection(NFTMap)
    } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
      console.error(err)
    }
  }, [])
  React.useEffect(() => {
    if (window.solana) {
      // const start = window.performance.now()
      checkForNfts()
      // const end = window.performance.now()
    }
  }, [window.solana])
  return (
    <Container sx={{ width: '100%', minHeight: '100vh' }}>
      {[...NFTCollection.keys()].sort().map((KeyItem, hash) => {
        return (
          <Box
            sx={{
              width: '100%',
              minHeight: '20em',
              position: 'relative',
              mt: 3
            }}
            key={hash}
          >
            <h3
              className='bot-header'
              style={{
                color: 'white',
                marginLeft: 0,
                fontSize: '29px',
                width: '100%'
              }}
            >
              {KeyItem}{' '}
            </h3>
            <Box
              sx={{
                width: '100%',
                minHeight: '15em',
                display: 'flex',
                flexWrap: 'wrap',

                gap: '20px'
              }}
            >
              {NFTCollection.get(KeyItem).map((item, key) => (
                <NFTComponent key={key} title={KeyItem} item={item} />
              ))}
            </Box>
          </Box>
        )
      })}
    </Container>
  )
}

export default Wallet
