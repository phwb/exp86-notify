import { SET_ENTITY_CODE } from '../constants'

export const selectedSection = (state = '', action) => {
  const { type, payload } = action

  switch (type) {
    case SET_ENTITY_CODE:
      return payload

    default:
      return state
  }
}