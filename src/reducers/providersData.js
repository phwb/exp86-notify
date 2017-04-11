import {
  LOAD_PROVIDER,
  UPDATE_RULE_TEMPLATE,
  ADD_RULE, REMOVE_RULE,
  UPDATE_RULE_LOGIC, UPDATE_RULE_ASSERTIONS,
  UPDATE_RULE_CONSUMER, ADD_RULE_CONSUMER, REMOVE_RULE_CONSUMER,
  SUCCESS
} from '../constants'

const rule = (
  state = {
    id: 0,
    logic: '',
    assertions: [],
    consumers: []
  },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case REMOVE_RULE_CONSUMER:
      return {
        ...state,
        consumers: [
          ...state.consumers.slice(0, payload),
          ...state.consumers.slice(payload + 1)
        ]
      }

    case ADD_RULE_CONSUMER:
      return {
        ...state,
        consumers: state.consumers.concat('')
      }

    case UPDATE_RULE_CONSUMER:
      return {
        ...state,
        consumers: state.consumers.map((consumer, i) => i === payload.index
          ? payload.value
          : consumer
        )
      }

    case UPDATE_RULE_ASSERTIONS:
      return {
        ...state,
        assertions: payload
      }

    case UPDATE_RULE_LOGIC:
      return {
        ...state,
        logic: payload
      }

    case ADD_RULE:
      return {
        ...state,
        logic: payload
      }

    default:
      return state
  }
}

const rules = (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case REMOVE_RULE_CONSUMER:
      return state.map((item, index) => {
        if (index !== payload.ruleIndex) {
          return item
        }

        return rule(item, {
          ...action,
          payload: payload.index
        })
      })

    case ADD_RULE_CONSUMER:
      return state.map((item, index) => index !== payload
        ? item
        : rule(item, action)
      )

    case UPDATE_RULE_CONSUMER:
      return state.map((item, index) => {
        if (index !== payload.ruleIndex) {
          return item
        }

        return rule(item, {
          ...action,
          payload: {
            index: payload.index,
            value: payload.value
          }
        })
      })

    case UPDATE_RULE_ASSERTIONS:
      return state.map((item, index) => {
        if (index !== payload.ruleIndex) {
          return item
        }

        return rule(item, {
          ...action,
          payload: payload.assertions
        })
      })

    case UPDATE_RULE_LOGIC:
      return state.map((item, index) => {
        if (index !== payload.ruleIndex) {
          return item
        }

        return rule(item, {
          ...action,
          payload: payload.logic
        })
      })

    case REMOVE_RULE:
      return [
        ...state.slice(0, payload),
        ...state.slice(payload + 1)
      ]

    case ADD_RULE:
      return [
        ...state,
        rule(undefined, action)
      ]

    default:
      return state
  }
}

const template = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_RULE_TEMPLATE:
      return {
        ...state,
        ...payload
      }

    default:
      return state
  }
}

export const providersData = (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case REMOVE_RULE_CONSUMER:
      return state.map(data => {
        if (data.providerId !== payload.providerId) {
          return data
        }

        return {
          ...data,
          rules: rules(data.rules, {
            ...action,
            payload: {
              ruleIndex: payload.ruleIndex,
              index: payload.index
            }
          })
        }
      })

    case ADD_RULE_CONSUMER:
      return state.map(data => {
        if (data.providerId !== payload.providerId) {
          return data
        }

        return {
          ...data,
          rules: rules(data.rules, {
            ...action,
            payload: payload.ruleIndex
          })
        }
      })

    case UPDATE_RULE_CONSUMER: {
      const { providerId, ruleIndex, index, value } = payload

      return state.map(data => {
        if (data.providerId !== providerId) {
          return data
        }

        return {
          ...data,
          rules: rules(data.rules, {
            ...action,
            payload: { ruleIndex, index, value }
          })
        }
      })
    }

    case UPDATE_RULE_ASSERTIONS: {
      const { providerId, ruleIndex, assertions } = payload

      return state.map(data => {
        if (data.providerId !== providerId) {
          return data
        }

        return {
          ...data,
          rules: rules(data.rules, {
            ...action,
            payload: { ruleIndex, assertions }
          })
        }
      })
    }

    case UPDATE_RULE_LOGIC: {
      const { providerId, ruleIndex, logic } = payload

      return state.map(data => {
        if (data.providerId !== providerId) {
          return data
        }

        return {
          ...data,
          rules: rules(data.rules, {
            ...action,
            payload: { ruleIndex, logic }
          })
        }
      })
    }

    case REMOVE_RULE:
      return state.map(data => {
        if (data.providerId !== payload.providerId) {
          return data
        }

        return {
          ...data,
          rules: rules(data.rules, {
            ...action,
            payload: payload.ruleIndex
          })
        }
      })

    case ADD_RULE:
      return state.map(data => {
        if (data.providerId !== payload.providerId) {
          return data
        }

        return {
          ...data,
          rules: rules(data.rules, {
            ...action,
            payload: payload.defaultLogic
          })
        }
      })

    case UPDATE_RULE_TEMPLATE:
      return state.map(data => {
        if (data.providerId !== payload.providerId) {
          return data
        }

        return {
          ...data,
          template: template(data.template, {
            ...action,
            payload: payload.data
          })
        }
      })

    // по сути точка входа
    case LOAD_PROVIDER + SUCCESS: {
      return payload.providersData
    }

    default:
      return state
  }
}
