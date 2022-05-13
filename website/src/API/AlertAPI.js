import helperAPI from './index'

const addAlert = async (body) => {
  const response = await helperAPI.postRequest('/api/alerts/addAlert', {
    ...body
  })
  return response
}

const getAllAlert = async (id) => {
  const response = await helperAPI.getRequest(`/api/alerts/getAlerts`)
  return response
}

const deleteAlert = async (body) => {
  const response = await helperAPI.getRequest(
    `/api/alerts/deleteAlert?id=${body}`
  )
  return response
}

const updateAlert = async (body) => {
  const response = await helperAPI.postRequest('/api/alerts/updateAlert', body)
  return response
}

export { addAlert, getAllAlert, deleteAlert, updateAlert }
