/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import CreateAlertComponent from '../../components/Create-Alert/CreateAlert'
import { getAllColections } from '../../API/GetAllCollections'
import { addAlert, updateAlert, deleteAlert } from '../../API/AlertAPI'
import { toast } from 'react-toastify'

class CreateAlert extends PureComponent {
  constructor(props) {
    super(props)
    if (props?.location?.state?.updateData) {
      this.state = {
        ...props.location.state.updateData,
        value: {},
        isUpdate: true,
        query: props?.location?.state?.updateData?.collectionName
      }
    } else if (props?.location?.state?.collectionData) {
      const { collectionData } = props?.location?.state || {}

      this.state = {
        name: '',
        via: '',
        collectionId: collectionData.id,
        alertType: '',
        collections: [],
        collectionName: collectionData.name,
        query: collectionData.name,
        url: '',
        phone: '',
        value: {},
        whatsapp: ''
      }
    } else {
      this.state = {
        name: '',
        via: '',
        collectionId: '',
        alertType: '',
        collections: [],
        collectionName: '',
        query: '',
        url: '',
        phone: '',
        value: {},
        whatsapp: ''
      }
    }
  }

  alertTypes = [
    { label: 'NFT Purchase', value: 'PURCHASE' },
    { label: 'NFT Delisted', value: 'DELIST' },
    { label: 'NFT Listed', value: 'LIST' }
  ]

  alertVia = [
    { label: 'Discord', value: 'discord' }
    //{ label: 'SMS', value: 'sms' }
    // { label: 'WhatsApp', value: 'whatsApp' }
  ]

  componentDidMount = () => {
    this.getCollections()
  }

  checkWallet = () => {}

  handleStateChange = (event, value = '') => {
    if (value !== '' && value !== null && value !== undefined) {
      this.setState({
        collectionId: value._id,
        collectionName: value.name,
        query: value.name
      })
    } else if (event.target.name === 'via') {
      this.setState({
        [event.target.name]: event.target.value,
        url: '',
        phone: ''
      })
    } else {
      this.setState({ [event.target.name]: event.target.value }, () => {
        if (event.target.name === 'query') {
          this.getCollections()
        }
      })
    }
  }

  handleAlertChange = (event, value = '') => {
    if (value !== '' && value !== null && value !== undefined) {
      this.setState({
        alertType: value.value
      })
    }
  }

  handleAlertVia = (event, value = '') => {
    if (value !== '' && value !== null && value !== undefined) {
      this.setState({
        via: value.value
      })
    }
  }

  changePhone = (value) => {
    this.setState({ phone: value })
  }

  changeWhatsapp = (value) => {
    this.setState({ whatsapp: value })
  }

  changeURL = (value) => {
    this.setState({ url: value })
  }

  getCollections = async () => {
    try {
      const response = await getAllColections({
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
      if (collections[i]._id === this.state.collectionId) {
        this.setState({ collectionName: collections[i].name })
        break
      }
    }
  }

  onSubmit = async (event, setCreate) => {
    event.preventDefault()
    const alertInfo = { ...this.state }

    let info = {}

    if (alertInfo.via === 'discord') {
      info = {
        via: alertInfo.via,
        url: alertInfo.url
      }
    } else if (alertInfo.via === 'sms') {
      info = {
        via: alertInfo.via,
        phone: alertInfo.phone
      }
    } else {
      info = {
        via: alertInfo.via,
        whatsApp: alertInfo.whatsapp
      }
    }

    delete alertInfo.collections
    delete alertInfo.via
    delete alertInfo.url
    delete alertInfo.query
    delete alertInfo.whatsapp
    delete alertInfo.phone

    try {
      await addAlert({
        ...alertInfo,
        notificationInfo: {
          ...info
        },
        // userId: this.userData.walletId
      })

      setCreate(true)
    } catch {}
  }

  onUpdate = async (event, setCreate) => {
    event.preventDefault()
    const alertInfo = { ...this.state }
    let info = {}

    if (alertInfo.via === 'discord') {
      info = {
        via: alertInfo.via,
        url: alertInfo.url
      }
    } else if (alertInfo.via === 'sms') {
      info = {
        via: alertInfo.via,
        phone: alertInfo.phone
      }
    } else {
      info = {
        via: alertInfo.via,
        whatsApp: alertInfo.whatsapp
      }
    }

    delete alertInfo.collections
    delete alertInfo.via
    delete alertInfo.url
    delete alertInfo.isUpdate
    delete alertInfo.query
    delete alertInfo.whatsapp
    delete alertInfo.phone

    try {
      await updateAlert({
        ...alertInfo,
        notificationInfo: {
          ...info
        },
        // userId: this.userData.walletId
      })
      setCreate(true)
    } catch {}
  }

  deleteAlertFunc = async () => {
    try {
      await deleteAlert(this.state._id)
      this.props.history.push('/manage-alert')
    } catch {}
  }

  render() {
    return (
      <CreateAlertComponent
        state={{ ...this.state }}
        handleStateChange={this.handleStateChange}
        onSubmit={this.onSubmit}
        onUpdate={this.onUpdate}
        getCollections={this.getCollections}
        changeURL={this.changeURL}
        changePhone={this.changePhone}
        alertTypes={this.alertTypes}
        handleAlertChange={this.handleAlertChange}
        alertVia={this.alertVia}
        handleAlertVia={this.handleAlertVia}
        changeWhatsapp={this.changeWhatsapp}
        deleteAlertFunc={this.deleteAlertFunc}
      />
    )
  }
}

export default withRouter(CreateAlert)
