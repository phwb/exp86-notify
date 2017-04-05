import {
  REMOVE_EVENT, ADD_EVENT, LOAD_EVENT, SELECT_EVENT,
  START, SUCCESS, FAIL
} from '../constants'

const defaultState = {
  id: null,
  items: [],
  templates: [],
  assertions: [],
  loading: false
}

export const events = (state = defaultState, action) => {
  const { type, payload, error } = action

  switch (type) {
    case LOAD_EVENT + SUCCESS:
      const { items, templates, assertions } = payload

      return {
        items,
        templates,
        assertions,
        loading: false
      }

    case REMOVE_EVENT + SUCCESS:
    case ADD_EVENT + SUCCESS:
      return {
        ...state,
        items: payload,
        loading: false
      }

    case SELECT_EVENT:
      return {
        ...state,
        id: payload
      }

    case REMOVE_EVENT + START:
    case ADD_EVENT + START:
    case LOAD_EVENT + START:
      return {
        ...state,
        loading: true
      }

    case REMOVE_EVENT + FAIL:
    case ADD_EVENT + FAIL:
    case LOAD_EVENT + FAIL:
      console.log(error)
      return {
        ...state,
        error,
        loading: false
      }

    default:
      return state
  }
}