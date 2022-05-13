/* eslint-disable import/prefer-default-export */
import helperAPI from './index'

const searchCollections = async (body) => {
  const response = await helperAPI.getRequest(
    `/api/collections/getcollections?searchText=${body.query}`
  )
  return response
}

export { searchCollections }
