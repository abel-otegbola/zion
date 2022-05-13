import helperAPI from './index'

const getAllColections = async (body) => {
  const response = await helperAPI.getRequest(
    `/api/collections/getCollections?searchText=${body.query}`
  )
  return response
}

export { getAllColections }
