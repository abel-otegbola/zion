import helperAPI from './index'

const addBot = async (body) => {
  const response = await helperAPI.postRequest('/api/bots/createBot', {
    ...body
  })
  return response
}

const getBotId = async (body) => {
  const response = await helperAPI.getRequest('/api/bots/getBotWallet')
  return response
}

const getAllBots = async (id) => {
  const response = await helperAPI.getRequest(`/api/bots/getBots`)
  return response
}

// TODO: wtf is this for?
const getBotCollections = async (body) => {
  const response = await helperAPI.postRequest('/api/bots/getBotCollections', {
    searchText: body.query,
    pageNo: 1,
    count: 20
  })
  return response
}

const botWithdrawRequest = async (body) => {
  const response = await helperAPI.postRequest(
    '/api/bots/createWithdrawRequest',
    {
      ...body
    }
  )
  return response
}

const getBotTransactions = async (body) => {
  const response = await helperAPI.getRequest(`/api/bots/getBotEvent`)
  return response
}

const updatePrivacyTransaction = async (body) => {
  const response = await helperAPI.postRequest(
    '/api/bots/updateBotTransaction',
    body
  )
  return response
}

// const deleteAlert = async (body) => {
//   const response = await helperAPI.getRequest(
//     `/api/alerts/deleteAlert?id=${body}`
//   )
//   return response
// }

const updateBot = async (body) => {
  const response = await helperAPI.postRequest('/api/bots/updateBot', body)
  return response
}

const toggleBot = async (botId) => {
  const response = await helperAPI.getRequest(`/api/bots/toggleBot?id=${botId}`)
  return response
}

const deleteBot = async (botId) => {
  const response = await helperAPI.getRequest(`/api/bots/deleteBot?id=${botId}`)
  return response
}

export {
  addBot,
  getBotId,
  getAllBots,
  toggleBot,
  updateBot,
  botWithdrawRequest,
  getBotTransactions,
  deleteBot,
  getBotCollections,
  updatePrivacyTransaction
}
