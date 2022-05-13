/* eslint-disable */
import axios from 'axios'
import { BASE_URL } from '../constants'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    token: '',
    nonce: ''
  }
})

instance.interceptors.request.use((config) => {
  config.headers.token = Cookies.get('auth-jwt') || ''
  config.headers.nonce = Cookies.get('nonce') || ''
  // console.debug(`axios.config.headers`, config.headers)
  return config
})

const get = (API, body) => instance.get(API, body)
const post = (API, body) => instance.post(API, body)

export default {
  getRequest: get,
  postRequest: post,
}
