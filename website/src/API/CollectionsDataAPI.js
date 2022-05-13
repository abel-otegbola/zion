import helperAPI from './index'

const collectionsData = async (body) => {
  const response = await helperAPI.postRequest('/api/token/tokenListings', {
    ...body
  })
  return response
}

const getTraits = async (body) => {
  const response = await helperAPI.postRequest(
    '/api/collections/getCollectionTraits',
    {
      collectionName: body
    }
  )
  return response
}

// TODO: delete this
const getCount = async (body) => {
  const response = await helperAPI.postRequest(
    '/api/token/getTokenListingCount',
    { ...body }
  )
  return response
}

const searchCollecton = async () => {
  const response = await helperAPI.getRequest(
    `/api/collections/searchCollections`
  )
  return response
}

const getCollectionById = async (body) => {
  const response = await helperAPI.getRequest(
    `/api/collections/getCollectionById?collectionId=${body}`
  )
  return response
}

const getCollectionToken = async (body) => {
  const response = await helperAPI.getRequest(
    `/api/token/tokenListingObject?tokenId=${body}`
  )
  return response
}

const getCollectionTokenBt = async (body) => {
  const response = await helperAPI.getRequest(
    `/api/token/tokenListingObjectBt?tokenId=${body}`
  )
  return response
}

export {
  collectionsData,
  getTraits,
  getCount,
  searchCollecton,
  getCollectionById,
  getCollectionToken,
  getCollectionTokenBt
}
