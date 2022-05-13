import React, { PureComponent } from 'react'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import ManageAlertComponent from '../../components/Manage-Alert'
import { getAllAlert, deleteAlert, updateAlert } from '../../API/AlertAPI'

class ManageAlert extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      alerts: []
    }
  }

  componentDidMount = () => {
    this.fetchAlerts()
  }

  componentWillUnmount = () => {
    document.removeEventListener('keypress', () => console.log('removed'))
  }

  fetchAlerts = async () => {
    try {
      const response = await getAllAlert()
      // throw new Error(`fixme`)
      this.setState({ alerts: [...response.data] })
    } catch {}
  }

  updateAlertFunc = (body) => {
    const { history } = { ...this.props }
    const { notificationInfo } = { ...body }
    const data = { ...body }
    delete data.notificationInfo
    history.push({
      pathname: '/create-alert',
      state: {
        updateData: {
          ...data,
          ...notificationInfo
        }
      },
      search: 'update-alert'
    })
  }

  updateCollectionAlert = async (alert, value, index) => {
    const alertInfo = { ...alert }
    delete alertInfo.isDisabled
    
    const temp = [...this.state.alerts]
    temp[index].isDisabled = !value

    this.setState({ alerts: [...temp] })

    try {
      await updateAlert({
        ...alertInfo,
        isDisabled: !value
      })

      if (value) {
        toast.success('Alert Activated.')
      } else {
        toast.error('Alert Disabled.')
      }

      this.fetchAlerts()
    } catch {
      this.fetchAlerts()
    }
  }

  render() {
    return (
      <ManageAlertComponent
        alerts={this.state.alerts}
        updateAlertFunc={this.updateAlertFunc}
        updateCollectionAlert={this.updateCollectionAlert}
      />
    )
  }
}

export default withRouter(ManageAlert)
