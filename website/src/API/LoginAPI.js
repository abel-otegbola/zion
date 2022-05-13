import helperAPI from './index'
import Cookies from 'js-cookie'

const whiteList = async (body) => {
  const response = await helperAPI.postRequest(
    '/api/whitelist/joinWhitelist',
    body
  )
  return response
}

const getNonce = async () => {
  const res = await helperAPI.getRequest('/api/auth/getNonce')
  // debugger
  if (res.data && res.data.nonce && res.data.nonce.length) {
    const at = new Date(new Date().getTime() + 360 * 60 * 1000) // 6 hrs
    Cookies.set('nonce', res.data.nonce, {
      expires: at
    })
  }
  return res.data
}

const verify = async (payload) => {
  const res = await helperAPI.postRequest('/api/auth/verify', payload)
  // console.debug(`LoginAPI.verify`, res)
  // debugger
  if (res.data && res.data.success) {
    const at = new Date(new Date().getTime() + 360 * 60 * 1000) // 6 hrs
    Cookies.set('auth-jwt', res.data.token, {
      expires: at
    })
    // console.debug(`LoginAPI.verify`, `cookie-set`, Cookies.get('auth-jwt'))
  }
  // debugger
  return res.data
}

const isAuthed = () => {
  const jwt = Cookies.get('auth-jwt')
  return (jwt && jwt.length) ? true : false
}

const getAccount = async (callback) => {
  // TODO (auth): kick off initial authentication flow,
  // by first initiating an auth-request message from the
  // api server, then signing the response to confirm,
  // which returns a session jwt token which we store locally..
  const isPhantomInstalled = window.solana && window.solana.isPhantom
  if (!isPhantomInstalled) {
    return window.open('https://phantom.app/', '_blank')
  }
  try {
    const account = await window.solana.connect()
    if (!account) throw new Error()
    const pubkey = account.publicKey.toBase58()
    // console.debug(`pubkey`, pubkey)
    callback && callback(pubkey)
  } catch (err) {
    console.warn(err)
    callback && callback()
  }
}

const authAccount = async (pubkey, callback) => {
  const nonce = (await getNonce()).nonce
  // console.debug(`getNonce()`, nonce)
  if (!nonce.length || !nonce.length) throw new Error()
  const messageStr = `Sign this message for authenticating with your wallet. Nonce: ${nonce}`
  const messageBytes = new TextEncoder().encode(messageStr)
  const verify_payload = { signature: null, pubkey }

  try {
    try {
      const signed = await window.solana.request({
        method: 'signMessage',
        params: { message: messageBytes }
      })
      verify_payload.signature = signed.signature
    }
    catch (ex) {
      try {
        const signed = await window.solana.signMessage(messageBytes)
        verify_payload.signature = base58.encode(signed.signature)
      }
      catch (ex) {
        throw new Error(ex)
      }
    }

    const _verify = await verify(verify_payload)
    // console.debug(`verify()`, _verify)
    if (callback) return await callback(_verify.success, _verify.token)
  }
  catch (err) {
    if (callback) return await callback(false, null)
  }
}

const disconnect = () => {
  Cookies.remove('auth-jwt')
  Cookies.remove('auth-status')
  window.location.reload(true)
}

export { whiteList, getNonce, verify, isAuthed, getAccount, authAccount, disconnect }
