import { LOAD_SECTIONS, START, SUCCESS, FAIL } from '../constants'

const defaultState = {
  items: [],
  loading: true
}

export const sections = (state = defaultState, action) => {
  const { type, payload, error } = action

  switch (type) {
    case LOAD_SECTIONS + START:
      return {
        ...state,
        loading: true
      }

    case LOAD_SECTIONS + SUCCESS:
      return {
        items: payload,
        loading: false
      }

    case LOAD_SECTIONS + FAIL:
      console.log(error)
      return {
        ...state,
        error
      }

    default:
      return state
  }
}
