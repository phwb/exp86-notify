import {
  LOAD_PROVIDER, ADD_PROVIDER, REMOVE_PROVIDER, UPDATE_PROVIDER_DATA,
  ADD_PROVIDER_RULE, UPDATE_PROVIDER_RULE, REMOVE_PROVIDER_RULE,
  UPDATE_PROVIDER_TEMPLATE,
  START, SUCCESS, FAIL
} from '../constants'

const initialState = {
  // доступные для регистрации провайдеры
  available: [],
  // уже зарегистрированные провайдеры
  registered: [],
  // правила для зарегистрированных провайдеров
  data: [],
  loading: false
}

export const providers = (state = initialState, action) => {
  const { type, payload, error } = action

  switch (type) {
    case UPDATE_PROVIDER_TEMPLATE: {
      const { providerId, data } = payload
      const providerData = state.data[ providerId ]
      const template = {
        ...providerData.template,
        ...data
      }

      return {
        ...state,
        data: {
          ...state.data,
          [ providerId ]: {
            ...providerData,
            template
          }
        }
      }
    }

    case REMOVE_PROVIDER_RULE: {
      const { providerId, ruleIndex } = payload
      const providerData = state.data[ providerId ]
      const rules = [
        ...providerData.rules.slice(0, ruleIndex),
        ...providerData.rules.slice(ruleIndex + 1)
      ]

      return {
        ...state,
        data: {
          ...state.data,
          [ providerId ]: {
            ...providerData,
            rules
          }
        }
      }
    }

    case UPDATE_PROVIDER_RULE: {
      const { providerId, ruleIndex, data } = payload
      const providerData = state.data[ providerId ]
      const rules = providerData.rules.map((rule, index) => {
        if (index !== ruleIndex) {
          return rule
        }

        return {
          ...rule,
          ...data
        }
      })

      return {
        ...state,
        data: {
          ...state.data,
          [ providerId ]: {
            ...providerData,
            rules
          }
        }
      }
    }

    case ADD_PROVIDER_RULE: {
      // не много жесткая конструкция получилась, надо было использовать ImmutableJS
      const { providerId, rule } = payload
      const providerData = state.data[ providerId ]
      const rules = providerData.rules.concat([ rule ])

      return {
        ...state,
        data: {
          ...state.data,
          [ providerId ]: {
            ...providerData,
            rules
          }
        }
      }
    }

    case LOAD_PROVIDER + SUCCESS:
      const { available, registered, data } = payload
      return {
        available,
        registered,
        data,
        loading: false
      }

    case REMOVE_PROVIDER_RULE + START:
    case UPDATE_PROVIDER_DATA + START:
    case REMOVE_PROVIDER + START:
    case ADD_PROVIDER + START:
    case LOAD_PROVIDER + START:
      return {
        ...state,
        loading: true
      }

    case REMOVE_PROVIDER_RULE + FAIL:
    case UPDATE_PROVIDER_DATA + FAIL:
    case REMOVE_PROVIDER + FAIL:
    case ADD_PROVIDER + FAIL:
    case LOAD_PROVIDER + FAIL:
      console.log(error)
      return {
        ...state,
        loading: false
      }

    case REMOVE_PROVIDER_RULE + SUCCESS:
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