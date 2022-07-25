import { REMOVEUSER, SETUSER } from './types'
import jwt_decode from 'jwt-decode'
import { setAuthToken } from '../components/utils'

let token = localStorage.jwtToken
if (token) {
  localStorage.setItem('jwtToken', token)
  setAuthToken(token)
}
const initialState = {
  user: token ? jwt_decode(token) : null
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
    case SETUSER:
      return {
        ...state,
        user: payload
      }
    case REMOVEUSER:
      return {
        ...state,
        user: null
      }
    default:
      return { ...state }
  }
}

export default reducer
