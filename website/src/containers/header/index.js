/* eslint-disable no-unused-expressions */
import * as React from 'react'
import Cookies from 'js-cookie'
import { debounce } from 'lodash'
import { withRouter } from 'react-router-dom'
import HeaderComponent from '../../components/Header'
import { searchCollecton } from '../../API/CollectionsDataAPI'
import * as LoginAPI from '../../API/LoginAPI'

class Header extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      collections: []
    }
  }

  checkAuth = () => {
    const jwt = Cookies.get('auth-jwt')
    if (!jwt || !jwt.length) return LoginAPI.disconnect()
  }

  getCollectionsForSearch = debounce(async () => {
    try {
      const response = await searchCollecton()
      this.setState({ collections: [...response.data] })
    } catch (err) {
      console.warn(`getCollectionsForSearch()`, err)
    }
  }, 200)

  render(props) {
    return (
      <HeaderComponent
        disconnectAccount={LoginAPI.disconnect}
        checkAuth={this.checkAuth}
        getCollectionsForSearch={this.getCollectionsForSearch}
        collections={this.state.collections}
      />
    )
  }
}

export default withRouter(Header)
