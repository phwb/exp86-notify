import {
  UPDATE_RULE_TEMPLATE,
  ADD_RULE, REMOVE_RULE,
  UPDATE_RULE_LOGIC, UPDATE_RULE_ASSERTIONS,
  UPDATE_RULE_CONSUMER, ADD_RULE_CONSUMER, REMOVE_RULE_CONSUMER,
  START, SUCCESS, FAIL
} from '../constants'
import { getJSON } from '../utils'

export const updateTemplate = (providerId, data) => ({
  type: UPDATE_RULE_TEMPLATE,
  payload: {
    providerId,
    data
  }
})

export const addRule = (providerId, defaultLogic) => ({
  type: ADD_RULE,
  payload: {
    providerId,
    defaultLogic
  }
})

// TODO: пересмотреть, может REMOVE_RULE + START перенести в редьюсер providers
export const removeRule = (entityCode, eventId, providerId, ruleIndex, ruleId) => dispatch => {
  if (ruleId === 0) {
    dispatch({
      type: REMOVE_RULE,
      payload: { providerId, ruleIndex }
    })
    return
  }

  dispatch({
    type: REMOVE_RULE + START,
  })

  getJSON(`/entities/${entityCode}/events/${eventId}/providers/${providerId}/rule/${ruleId}`, {
    method: 'DELETE'
  })
    .then(() => dispatch({
      type: REMOVE_RULE + SUCCESS
    }))
    .catch(error => dispatch({
      type: REMOVE_RULE + FAIL,
      error
    }))
}

export const updateLogic = (providerId, ruleIndex, logic) => ({
  type: UPDATE_RULE_LOGIC,
  payload: { providerId, ruleIndex, logic }
})

export const updateAssertions = (providerId, ruleIndex, assertions) => ({
  type: UPDATE_RULE_ASSERTIONS,
  payload: { providerId, ruleIndex, assertions }
})

export const updateConsumer = (providerId, ruleIndex, index, value) => ({
  type: UPDATE_RULE_CONSUMER,
  payload: { providerId, ruleIndex, index, value }
})

export const addConsumer = (providerId, ruleIndex) => ({
  type: ADD_RULE_CONSUMER,
  payload: { providerId, ruleIndex }
})

export const removeConsumer = (providerId, ruleIndex, index) => ({
  type: REMOVE_RULE_CONSUMER,
  payload: { providerId, ruleIndex, index }
})
