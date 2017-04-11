import {
  LOAD_PROVIDER, ADD_PROVIDER, REMOVE_PROVIDER, UPDATE_PROVIDER_DATA,
  REMOVE_RULE,
  START, SUCCESS, FAIL
} from '../constants'

const initialState = {
  items: [],
  loading: false
}

export const providers = (state = initialState, action) => {
  const { type, payload, error } = action

  switch (type) {
    case LOAD_PROVIDER + SUCCESS:
      return {
        ...state,
        items: payload.items,
        loading: false
      }

    case REMOVE_RULE + START:
    case UPDATE_PROVIDER_DATA + START:
    case REMOVE_PROVIDER + START:
    case ADD_PROVIDER + START:
    case LOAD_PROVIDER + START:
      return {
        ...state,
        loading: true
      }

    case REMOVE_RULE + FAIL:
    case UPDATE_PROVIDER_DATA + FAIL:
    case REMOVE_PROVIDER + FAIL:
    case ADD_PROVIDER + FAIL:
    case LOAD_PROVIDER + FAIL:
      console.log(error)
      return {
        ...state,
        loading: false
      }

    case REMOVE_RULE + SUCCESS:
    case UPDATE_PROVIDER_DATA + SUCCESS:
    case REMOVE_PROVIDER + SUCCESS:
    case ADD_PROVIDER + SUCCESS:
      return {
        ...initialState
      }

    default:
      return state
  }
}