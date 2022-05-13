import React, { PureComponent } from 'react'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'
import ManageBotComponent from '../../components/Manage-Bot'
import {
  getAllBots,
  updateBot,
  toggleBot,
  deleteBot,
  updatePrivacyTransaction
} from '../../API/BotAPI'
import { toast } from 'react-toastify'
import { getBotId, getBotTransactions } from '../../API/BotAPI'

class ManageBot extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      bots: [],
      botId: '',
      transactions: []
    }
  }

  componentDidMount = () => {
    this.fetchBots()
    this.getBotWallet()
  }

  fetchBots = async () => {
    try {
      const response = await getAllBots()
      // throw new Error(`fixme`)
      this.setState({ bots: [...response.data] })
    } catch {}
  }

  fetchTransactions = async () => {
    try {
      const response = await getBotTransactions(this.state.botId)
      this.setState({ transactions: [...response.data] })
    } catch {}
  }

  getBotWallet = async (data) => {
    try {
      const response = await getBotId()
      const id = response?.data?.bot_wallet || ''
      this.setState({ botId: id }, () => {
        this.fetchTransactions()
      })
    } catch {}
  }

  updateBotFunc = (body) => {
    const { history } = { ...this.props }
    let { config } = { ...body }
    const data = { ...body }
    let { price_range } = config

    let price = {}

    if (price_range?.min?.$numberDecimal) {
      price.min = price_range?.min?.$numberDecimal || 0
      price.max = price_range?.max?.$numberDecimal || 0
    } else {
      price.min = price_range?.min || 0
      price.max = price_range?.max || 0
    }

    config.price_range = {
      ...price
    }

    delete data.config
    history.push({
      pathname: '/bot',
      state: {
        updateData: {
          ...data,
          ...config
        }
      },
      search: 'update-bot'
    })
  }

  toggleBot = async (bot, value, index) => {
    const botInfo = { ...bot }
    delete botInfo.active

    const temp = [...this.state.bots]
    temp[index].active = !value
    this.setState({ bots: [...temp] })

    try {
      console.debug(`toggle`, bot, bot._id)
      await toggleBot(bot._id)

      if (value) {
        toast.error('Bot Deactivated')
      } else {
        toast.success('Bot Activated')
      }

      this.fetchBots()
    } catch {
      this.fetchBots()
    }
  }

  updatePrivacy = async (transaction, value, index) => {
    const transactionInfo = { ...transaction }
    delete transactionInfo.privacy

    const temp = [...this.state.transactions]

    temp[index].active = !value
    this.setState({ transactions: [...temp] })

    try {
      await updatePrivacyTransaction({
        _id: transactionInfo._id,
        privacy: !value
      })
      if (value) {
        toast.error('Transaction is public.')
      } else {
        toast.success('Transaction is private.')
      }
      this.fetchTransactions()
    } catch {
      this.fetchTransactions()
    }
  }

  deleteBotFunc = async (id) => {
    try {
      await deleteBot(id)
      this.fetchBots()
      this.getBotWallet()
      toast.success('Bot deleted successfully.')
    } catch {
      toast.error('Unable to delete bot.')
    }
  }

  render() {
    return (
      <ManageBotComponent
        bots={this.state.bots}
        updateBotFunc={this.updateBotFunc}
        toggleBot={this.toggleBot}
        transactions={this.state.transactions}
        fetchBots={this.fetchBots}
        fetchTransactions={this.fetchTransactions}
        deleteBotFunc={this.deleteBotFunc}
        updatePrivacy={this.updatePrivacy}
      />
    )
  }
}

export default withRouter(ManageBot)
