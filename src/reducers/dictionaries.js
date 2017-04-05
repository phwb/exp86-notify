import { LOAD_DICTIONARIES, START, SUCCESS, FAIL } from '../constants'

const defaultState = {
  consumers: [],
  logic: [],
  assertions: [],
  templates: [],
  loading: true
}

export const dictionaries = (state = defaultState, action) => {
  const { type, payload, error } = action

  switch (type) {
    // case ADD_TEMPLATES:
    //   return {
    //     ...state,
    //     templates: payload
    //   }
    //
    // case ADD_ASSERTIONS:
    //   return {
    //     ...state,
    //     assertions: payload
    //   }

    case LOAD_DICTIONARIES + START:
      return {
        ...state,
        loading: true
      }

    case LOAD_DICTIONARIES + SUCCESS:
      const { consumers, logic } = payload
      return {
        consumers,
        logic,
        loading: false
      }

    case LOAD_DICTIONARIES + FAIL:
      console.error(error)
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}