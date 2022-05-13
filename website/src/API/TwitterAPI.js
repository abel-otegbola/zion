import helperAPI from './index'

const loginTwitter = () => {
  ;(async () => {
    try {
      //OAuth Step 1
      const response = await helperAPI.postRequest(
        '/api/twitter/oauth/request_token'
      )

      const { oauth_token } = response.data
      //Oauth Step 2
      window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`
    } catch (error) {
      console.error(error)
    }
  })()
}

const logoutTwitter = () => {
  ;(async () => {
    try {
      const response = await helperAPI.postRequest('/api/twitter/logout')
      return response
    } catch (error) {
      console.error(error)
    }
  })()
}

export { loginTwitter, logoutTwitter }
