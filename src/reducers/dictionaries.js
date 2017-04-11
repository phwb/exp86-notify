import {
  LOAD_DICTIONARIES, LOAD_EVENT,
  START, SUCCESS, FAIL
} from '../constants'

const defaultState = {
  // общие словари, загружаются один раз при старте приложения
  consumers: [],
  logic: [],
  // словари для провайдеров, зависимые от выбранного события, при смене события они обновляются
  assertions: [],
  templates: [],
  loading: true
}

export const dictionaries = (state = defaultState, action) => {
  const { type, payload, error } = action

  switch (type) {
    case LOAD_DICTIONARIES + START:
      return {
        ...state,
        loading: true
      }

    case LOAD_DICTIONARIES + SUCCESS: {
      const { consumers, logic } = payload

      return {
        ...state,
        consumers,
        logic,
        loading: false
      }
    }

    case LOAD_EVENT + SUCCESS: {
      const { templates, assertions } = payload

      return {
        ...state,
        templates,
        assertions,
        loading: false
      }
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