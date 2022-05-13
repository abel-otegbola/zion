import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import CollectionViewComponent from '../../components/CollectionView/index'
import {
  collectionsData,
  getTraits,
  getCount
} from '../../API/CollectionsDataAPI'
import { getAllColections } from '../../API/GetAllCollections'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

import { statusIcon, priceIcon, marketIcon } from '../../utils/svg'

class CollectionView extends PureComponent {
  constructor(props) {
    super(props)

    const { match } = this.props
    const { params } = match
    const { id } = params

    this.state = {
      data: [],
      traitCount: 0,
      attributeData: [],
      traits: [],
      count: 20,
      page: 1,
      id: id,
      showSkeleton: true,
      rankRange: {
        min: 1,
        max: 1
      },
      totalRank: 1,
      price_range: {
        min: 0.1,
        max: 100
      },
      collectionId: '',
      status: 'LIST',
      price: 'ASC',
      sidebar: [
        {
          title: 'Price',
          type: 'checkbox',
          icon: priceIcon,
          data: [
            {
              key: 'High To Low',
              value: 'DES'
            },
            {
              key: 'Low To High',
              value: 'ASC'
            }
          ]
        },
        {
          title: 'Status',
          type: 'checkbox',
          icon: statusIcon,
          data: [
            {
              key: 'All Items',
              value: 'ALL'
            },
            {
              key: 'Listed',
              value: 'LIST'
            }
          ]
        },
        {
          title: 'Marketplaces',
          type: 'checkbox',
          icon: marketIcon,
          data: [
            {
              key: 'All',
              value: 'all'
            },
            {
              key: 'Magic Eden',
              value: 'magic eden'
            }
          ]
        }
      ]
    }
  }

  componentDidMount = async () => {
    const { match } = this.props
    const { params } = match
    const { id } = params

    if (sessionStorage.getItem('collection_filter')) {
      let temp = JSON.parse(sessionStorage.getItem('collection_filter'))
      this.setState({ traits: [...temp] })
    }

    try {
      const response = await getAllColections({
        query: id
      })
      const { data } = response
      let colData = {}

      data.forEach((item) => {
        if (item.name.toLowerCase() === id.toLowerCase()) {
          colData = { ...item }
        }
      })
      this.fetchTraits(id, colData._id)
    } catch {}
  }


  // TODO: i want to delete this so effing badly.
  getTraitCount = async (id = this.state.collectionId) => {
    let body = {
      collectionId: id,
      rankRange: { ...this.state.rankRange },
      traits: [...this.state.traits],
      eventType: this.state.status,
      price: this.state.price
    }

    if (
      body.rankRange.min === 1 &&
      body.rankRange.max === this.state.totalRank
    ) {
      delete body.rankRange
    }

    try {
      // TODO: isn't the count already in the document data..?
      // why do we need to fetch it here..?
      // further, why not just include it in the initial api response..!???
      const response = await getCount({
        ...body
      })

      this.setState({ traitCount: response.data })
    } catch {}
  }

  getCollectionsActiveListening = async (id = this.state.collectionId) => {
    let temp = [...this.state.data]
    let pages = this.state.page + 1

    let body = {
      pageNo: this.state.page,
      count: 20,
      rankRange: { ...this.state.rankRange },
      collectionId: id,
      traits: [...this.state.traits],
      eventType: this.state.status,
      price: this.state.price
    }

    if (
      body.rankRange.min === 1 &&
      body.rankRange.max === this.state.totalRank
    ) {
      delete body.rankRange
    }

    try {
      const response = await collectionsData({
        ...body
      })
      this.setState({
        data: [...temp, ...response.data],
        showSkeleton: false,
        page: pages
      })
    } catch {
      this.setState({ showSkeleton: false })
    }
  }

  getFilterCollectionsActiveListing = async (id = this.state.collectionId) => {
    this.setState({ showSkeleton: true })
    let body = {
      pageNo: 1,
      count: 20,
      collectionId: id,
      rankRange: { ...this.state.rankRange },
      traits: [...this.state.traits],
      eventType: this.state.status,
      price: this.state.price
    }

    if (
      body.rankRange.min === 1 &&
      body.rankRange.max === this.state.totalRank
    ) {
      delete body.rankRange
    }

    try {
      const response = await collectionsData({
        ...body
      })
      this.setState({
        data: [...response.data],
        showSkeleton: false,
        page: 2
      })
    } catch {
      this.setState({ showSkeleton: false })
    }
  }

  fetchTraits = async (id, colId) => {
    try {
      const response = await getTraits(id)

      const { data } = response
      let temp = {
        min: 1,
        max: data.totalItems
      }

      let sideBar = this.state.sidebar
      ;[...data.available_traits].forEach((traits) => {
        sideBar.push({
          title: traits.trait_type,
          type: 'radio',
          data: traits.values.map((trait) => {
            return { key: trait.value, value: trait.value, count: trait.count }
          })
        })
      })

      this.setState({
        attributeData: [...data.available_traits],
        rankRange: { ...temp },
        totalRank: data.totalItems,
        sidebar: sideBar,
        collectionId: colId
      })
      this.getTraitCount(colId)
      this.getCollectionsActiveListening(colId)
    } catch (err) {
      this.setState({ showSkeleton: false })
    }
  }

  moveToAlert = async (link) => {
    const isLogged = Cookies.get('auth_status') ? true : false

    if (isLogged) {
      try {
        const response = await getAllColections({
          query: this.state.id
        })
        const { data } = response

        let colData = {}

        data.forEach((item) => {
          if (item.name.toLowerCase() === this.state.id.toLowerCase()) {
            colData = { ...item }
          }
        })

        const collectionData = {
          name: colData.name,
          id: colData._id
        }

        this.props.history.push({
          pathname: `${link}`,
          state: {
            collectionData
          }
        })
      } catch (error) {}
    } else {
      toast.error('Please Login First.')
    }
  }

  handleSliderRange = (event, name) => {
    if (name === 'rank') {
      const temp = {
        min: event[0],
        max: event[1]
      }
      this.setState({ rankRange: { ...temp } })
    } else {
      const temp = {
        min: event[0],
        max: event[1]
      }
      this.setState({ price_range: { ...temp } })
    }
  }

  setStatus = (title, statusValue) => {
    if (title === 'Status') {
      this.setState(
        { status: statusValue, page: 1, data: [], showSkeleton: true },
        () => {
          this.getTraitCount(this.state.collectionId)
          this.getCollectionsActiveListening(this.state.collectionId)
        }
      )
    } else if (title === 'Price') {
      this.setState(
        { price: statusValue, page: 1, data: [], showSkeleton: true },
        () => {
          this.getTraitCount(this.state.collectionId)
          this.getCollectionsActiveListening(this.state.collectionId)
        }
      )
    }
  }

  selectPrice = (value) => {
    this.setState(
      { price: value, page: 1, data: [], showSkeleton: true },
      () => {
        this.getTraitCount(this.state.collectionId)
        this.getCollectionsActiveListening(this.state.collectionId)
      }
    )
  }

  resetFilters = (e) => {
    e.preventDefault()
    let tempRank = { ...this.state.rankRange }
    tempRank.min = 1
    tempRank.max = this.state.totalRank

    this.setState(
      {
        rankRange: { ...tempRank },
        traits: [],
        count: 20,
        traitCount: 0,
        showSkeleton: true,
        page: 1
      },
      () => {
        this.getTraitCount(this.state.collectionId)
        this.getCollectionsActiveListening(this.state.collectionId)
      }
    )
  }

  handleTraitRadio = (traitValue, type) => {
    let temp = [...this.state.traits]
    let present = false
    let traitPresent = true

    if (temp.length !== 0) {
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].type.toLowerCase() === type.toLowerCase()) {
          let index = 0
          const tempValue = [...temp[i].value]
          for (let j = 0; j < temp[i].value.length; j++) {
            index = j
            if (temp[i].value[j].toLowerCase() === traitValue.toLowerCase()) {
              present = true
              break
            }
          }
          if (present) {
            tempValue.splice(index, 1)
          } else {
            tempValue.push(traitValue)
          }
          temp[i].value = [...tempValue]
          if (temp[i].value.length === 0) {
            traitPresent = true
            temp.splice(i, 1)
            break
          }
          traitPresent = true
          break
        } else {
          traitPresent = false
        }
      }

      if (!traitPresent) {
        temp.push({
          type: type,
          value: [traitValue]
        })
      }
    } else {
      temp = [
        {
          type: type,
          value: [traitValue]
        }
      ]
    }

    this.setState({ traits: [...temp], data: [] }, () => {
      this.saveTraitsToLocal(temp)
      this.getTraitCount(this.state.collectionId)
      this.getFilterCollectionsActiveListing(this.state.collectionId)
    })
  }

  saveTraitsToLocal = (tempTraits) => {
    if (sessionStorage.getItem('collection_filter')) {
      sessionStorage.removeItem('collection_filter')
      sessionStorage.setItem(
        'collection_filter',
        JSON.stringify([...tempTraits])
      )
    } else {
      sessionStorage.setItem(
        'collection_filter',
        JSON.stringify([...tempTraits])
      )
    }
  }

  render() {
    return (
      <CollectionViewComponent
        sidebar={this.state.sidebar}
        data={this.state.data}
        traitCount={this.state.traitCount}
        collectionName={this.state.id}
        page={this.state.page}
        moveToAlert={this.moveToAlert}
        attributeData={this.state.attributeData}
        showSkeleton={this.state.showSkeleton}
        rankRange={this.state.rankRange}
        handleSlider={this.handleSliderRange}
        totalRank={this.state.totalRank}
        resetFilters={this.resetFilters}
        traits={this.state.traits}
        priceRange={this.state.price_range}
        getTraitCount={this.getTraitCount}
        getFilterCollectionsActiveListing={
          this.getFilterCollectionsActiveListing
        }
        getCollectionsActiveListening={this.getCollectionsActiveListening}
        name={this.state.id}
        handleTraitRadio={this.handleTraitRadio}
        status={this.state.status}
        setStatus={this.setStatus}
        price={this.state.price}
        selectPrice={this.selectPrice}
      />
    )
  }
}

export default withRouter(CollectionView)
