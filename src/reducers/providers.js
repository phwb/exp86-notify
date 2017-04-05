import {
  LOAD_PROVIDER, ADD_PROVIDER, REMOVE_PROVIDER,
  START, SUCCESS, FAIL
} from '../constants'

const initialState = {
  // доступные для регистрации провайдеры
  available: [],
  // уже зарегистрированные провайдеры
  registered: [],
  // правила для зарегистрированных провайдеров
  rules: [],
  loading: false
}

export const providers = (state = initialState, action) => {
  const { type, payload, error } = action

  switch (type) {
    case REMOVE_PROVIDER + START:
    case ADD_PROVIDER + START:
    case LOAD_PROVIDER + START:
      return {
        ...state,
        loading: true
      }

    case REMOVE_PROVIDER + FAIL:
    case ADD_PROVIDER + FAIL:
    case LOAD_PROVIDER + FAIL:
      console.log(error)
      return {
        ...state,
        loading: false
      }

    case LOAD_PROVIDER + SUCCESS:
      const { available, registered, rules } = payload
      return {
        available,
        registered,
        rules,
        loading: false
      }

    case REMOVE_PROVIDER + SUCCESS:
    case ADD_PROVIDER + SUCCESS:
      return {
        ...initialState
      }

    default:
      return state
  }
}