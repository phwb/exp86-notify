import {
  EVENT,
  START, SUCCESS, FAIL,
  LOAD, ADD, SELECT, REMOVE
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
    case REMOVE + EVENT + START:
    case ADD + EVENT + START:
    case LOAD + EVENT + START:
      return {
        ...state,
        loading: true
      }

    case LOAD + EVENT + SUCCESS:
      const { items, templates, assertions } = payload

      return {
        items,
        templates,
        assertions,
        loading: false
      }

    case REMOVE + EVENT + SUCCESS:
    case ADD + EVENT + SUCCESS:
      return {
        ...state,
        items: payload,
        loading: false
      }

    case SELECT + EVENT:
      return {
        ...state,
        id: payload
      }

    case EVENT + FAIL:
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