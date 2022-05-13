/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getBotId, deleteBot, getBotCollections } from '../../API/BotAPI'
import { getTraits } from '../../API/CollectionsDataAPI'

import CreateBotComponent from '../../components/Create-Bot/index'

class CreateBot extends PureComponent {
  constructor(props) {
    super(props)
    if (props?.location?.state?.updateData) {
      this.state = {
        ...props.location.state.updateData,
        isUpdate: true,
        query: props?.location?.state?.updateData?.collectionName || ''
      }
    } else if (props?.location?.state?.collectionData) {
      const { collectionData } = props?.location?.state || {}

      this.state = {
        name: '',
        collection_id: collectionData.id,
        collections: [],
        collectionName: collectionData.name,
        query: collectionData.name,
        price_range: {
          min: 0,
          max: 30
        },
        rank_range: {
          min: 0,
          max: 0
        },
        attributes: [],
        maxRank: 1000
      }
    } else {
      this.state = {
        name: '',
        collection_id: '61e262a8ccb99b105ca2c5cb',
        collections: [],
        collectionName: 'DeGods',
        query: 'DeGods',
        price_range: {
          min: 0,
          max: 30
        },
        rank_range: {
          min: 0,
          max: 0
        },
        attributes: [],
        maxRank: 1000
      }
    }
  }

  componentDidMount = () => {
    this.getCollections()
    if (this.state.query !== '') {
      this.findTraits()
    }
  }

  handleStateChange = (event, value = '') => {
    if (value !== '' && value !== null && value !== undefined) {
      this.setState(
        {
          collection_id: value._id,
          collectionName: value.name,
          query: value.name
        },
        () => {
          this.findTraits()
        }
      )
    } else {
      this.setState({ [event.target.name]: event.target.value }, () => {
        if (event.target.name === 'query') {
          this.getCollections()
        }
      })
    }
  }

  handleSlider = (event) => {
    if (event.target.name === 'rank') {
      const temp = {
        min: event.target.value[0],
        max: event.target.value[1]
      }
      this.setState({ rank_range: { ...temp } })
    } else {
      const temp = {
        min: event.target.value[0],
        max: event.target.value[1]
      }
      this.setState({ price_range: { ...temp } })
    }
  }

  getCollections = async () => {
    try {
      const response = await getBotCollections({
        query: this.state.query
      })
      this.setState({ collections: [...response.data] }, () => {
        if (this.state?.isUpdate && this.state.collections.length !== 0) {
          this.getCollectionName()
        }
      })
    } catch {}
  }

  getCollectionName = () => {
    const { collections } = { ...this.state }

    for (let i = 0; i < collections.length; i += 1) {
      if (collections[i]._id === this.state.collection_id) {
        this.setState({ collectionName: collections[i].name })
        break
      }
    }
  }

  getBotWallet = async (data) => {
    try {
      const response = await getBotId()
      const id = response?.data?.bot_wallet || ''
      // throw new Error(`fixme`);

      this.props.history.push({
        pathname: 'create-bot-confirm',
        state: {
          data: { ...data },
          botId: id
        },
        search: this?.props?.location?.search || ''
      })
    } catch (err) {
      toast.error('No bot wallet found for this wallet.')
    }
  }

  handleAttributes = (event, value, type) => {
    let temp = [...this.state.attributes]
    let flag = true
    if (event.length === 0) {
      let index
      for (let i = 0; i < this.state.attributes.length; i++) {
        if (type === this.state.attributes[i].trait_type) {
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

    this.setState({ attributes: [...temp] })
  }

  findTraits = async () => {
    if (this.state.query !== '') {
      try {
        const response = await getTraits(this.state.collectionName)
        const { data } = response
        const traitData = { ...data }
        let rank = {
          min: 0,
          max: 0
        }
        let rankMax = 1000
        if (traitData?.totalItems !== 0) {
          rank = {
            min: 1,
            max: traitData.totalItems
          }
          rankMax = traitData.totalItems
        }
        this.setState({
          traits: [...traitData.available_traits],
          rank_range: { ...rank },
          maxRank: rankMax
        })
      } catch (err) {
        this.setState({ traits: [] })
      }
    }
  }

  deleteBotFunc = async () => {
    try {
      await deleteBot(this.state._id)
      this.props.history.push('/manage-bot')
    } catch {}
  }

  render() {
    return (
      <CreateBotComponent
        state={{ ...this.state }}
        handleStateChange={this.handleStateChange}
        getCollections={this.getCollections}
        getBotWallet={this.getBotWallet}
        handleSlider={this.handleSlider}
        handleAttributes={this.handleAttributes}
        deleteBotFunc={this.deleteBotFunc}
      />
    )
  }
}

export default withRouter(CreateBot)
