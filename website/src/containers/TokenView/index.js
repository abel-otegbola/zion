import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import * as web3 from '@solana/web3.js'
// import { getParsedNftAccountsByOwner } from '@nfteyez/sol-rayz'

import {
  getCollectionToken,
  getCollectionTokenBt
} from '../../API/CollectionsDataAPI'
import {
  getAllColections,
} from '../../API/GetAllCollections'
import TokenViewComponent from '../../components/TokenView/index'
// import { user_login_status, verifyNFT } from '../../API/LoginAPI'

class TokenView extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tokenData: {},
      path: props?.location?.state?.prevPath || '/',
      showSkeleton: true,
      name: props?.location?.state?.name || 'degods',
      tokenAttributes: [],
      tokenId: ''
    }
  }

  componentDidMount = () => {
    const { match } = this.props
    const { params } = match
    const { id } = params
    this.setState({ tokenId: id })
    this.fetchTokenData(id)
    this.fetchTokenBt(id)
  }

  fetchTokenData = async (id) => {
    this.setState({ showSkeleton: true })
    try {
      const response = await getCollectionToken(id)

      const nftData = {
        ...response.data
      }
      const attributeData = [...nftData?.attributes]

      this.setState({
        tokenData: { ...nftData },
        tokenAttributes: [...attributeData],
        showSkeleton: false
      })
    } catch (err) {
      this.setState({
        showSkeleton: false
      })
    }
  }

  fetchTokenBt = async (id) => {
    try {
      const btRes = await getCollectionTokenBt(id)
    } catch (err) {
      this.setState({
        showSkeleton: false
      })
    }
  }

  moveToBot = async () => {
    const auth_status = Cookies.get('auth-jwt') ? true : false

    if (auth_status) {
      try {
        const response = await getAllColections({
          query: this.state.name
        })
        const { data } = response
        let colData = {}

        data.forEach((item) => {
          if (item.name.toLowerCase() === this.state.name.toLowerCase()) {
            colData = { ...item }
          }
        })
        const collectionData = {
          name: colData.name,
          id: colData._id
        }

        this.props.history.push({
          pathname: '/create-bot',
          state: {
            collectionData
          }
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      this.getAccount()
    }
  }

  getAccount = async (place) => {
    const isPhantomInstalled = window.solana && window.solana.isPhantom

    if (isPhantomInstalled) {
      try {
        var connection = new web3.Connection(
          web3.clusterApiUrl('mainnet-beta'),
          'confirmed'
        )

        const account = await window.solana.connect()
        const key = account.publicKey.toString()

        let details = await getParsedNftAccountsByOwner({
          publicAddress: account.publicKey,
          connection: connection,
          serialization: true
        })

        this.loginToAccount(details, key)
      } catch (err) {}
    } else {
      window.open('https://phantom.app/', '_blank')
    }
  }

  // TODO (auth)
  loginToAccount = async (details, key) => {
    const temp = []
    details.forEach((detail) => {
      temp.push(detail.mint)
    })

    try {
      const response = await verifyNFT({
        token_mint_address: [...temp]
      })
      if (response?.data?.status) {
        try {
          /*
          // TODO (auth)
          await user_login_status(
            {
              walletId: key,
            },
            this.props.history
          ) */
          this.moveToBot()
        } catch {}
      }
    } catch {}
  }

  render() {
    return (
      <TokenViewComponent
        data={this.state.tokenData}
        path={this.state.path}
        showSkeleton={this.state.showSkeleton}
        name={this.state.name}
        attributesData={this.state.tokenAttributes}
        moveToBot={this.moveToBot}
        tokenId={this.state.tokenId}
      />
    )
  }
}

export default withRouter(TokenView)
