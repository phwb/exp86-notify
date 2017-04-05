import { SET_ENTITY_CODE } from '../constants'

export const selectedSection = code => ({
  type: SET_ENTITY_CODE,
  payload: code
})