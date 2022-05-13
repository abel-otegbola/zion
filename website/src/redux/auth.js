import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

// TODO: (auth)
export const loginLogout = createSlice({
  name: 'loginLogout',
  initialState: {
    data: {},
    isLoggedIn: false
  },
  reducers: {
    login: (state, action) => {
      let token = Cookies.get('auth-jwt') || null
      console.debug(`login auth-jwt`, action.payload.data.data)

      return {
        ...state,
        data: { ...action.payload.data.data },
        isLoggedIn: true
      }
    },
    logOut: (state, action) => {
      return {
        ...state,
        data: {},
        isLoggedIn: false
      }
    },
    checkData: (state, action) => {
      let token = Cookies.get('auth-jwt') || null
      console.debug(`auth-jwt`, `token`, token)
      
      return {
        ...state,
        data: { ...data },
        isLoggedIn: data !== null,
      }
    }
  }
})

export const { login, logOut, checkData } = loginLogout.actions
// export default loginLogout.reducer
