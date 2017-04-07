import {
  LOAD_PROVIDER, ADD_PROVIDER, REMOVE_PROVIDER, UPDATE_PROVIDER_DATA,
  ADD_PROVIDER_RULE, UPDATE_PROVIDER_RULE, REMOVE_PROVIDER_RULE,
  UPDATE_PROVIDER_TEMPLATE,
  START, SUCCESS, FAIL
} from '../constants'
import { getJSON } from '../utils'

const splitItems = (acc, item) => {
  const { available, registered } = acc
  item.id = parseInt(item.id, 10) || 0

  if (item.id > 0) {
    return {
      available,
      registered: [
        ...registered,
        item
      ]
    }
  }

  return {
    available: [
      ...available,
      item
    ],
    registered
  }
}

export const load = (entityCode, eventId) => dispatch => {
  dispatch({
    type: LOAD_PROVIDER + START
  })

  // сначала получаем все провайдеры
  getJSON(`/entities/${entityCode}/events/${eventId}/providers`)
    // делим их на доступные к регистрации и зарегистрированные
    .then(items => items.reduce(splitItems, {
      available: [],
      registered: []
    }))
    // получаем правила для зарегистированных провайдеров
    .then(({ available, registered }) => new Promise((resolve, reject) => {
      const urls = registered.map(item => `/entities/${entityCode}/events/${eventId}/providers/${item.id}`)

      Promise.all(urls.map(getJSON))
        .then(results => resolve({
          available,
          registered,
          data: results.reduce((acc, item) => ({
            ...acc,
            [item.id]: item
          }), {})
        }))
        .catch(error => reject(error))
    }))
    // диспатчим результат только после того как получили список провайдеров, поделили их и получили правила
    .then(result => dispatch({
      type: LOAD_PROVIDER + SUCCESS,
      payload: result
    }))
    .catch(error => dispatch({
      type: LOAD_PROVIDER + FAIL,
      error
    }))
}

/**
 * Экшен перемещает провайдер из списка "доступных для регистрации" в список "зарегистрированнх" провайдеров
 * @param entityCode
 * @param eventId
 * @param providerCode
 */
export const register = (entityCode, eventId, providerCode) => dispatch => {
  dispatch({
    type: ADD_PROVIDER + START
  })

  const params = {
    method: 'POST',
    body: JSON.stringify({ providerCode })
  }

  getJSON(`/entities/${entityCode}/events/${eventId}/providers`, params)
    .then(() => dispatch({
      type: ADD_PROVIDER + SUCCESS
    }))
    .catch(error => dispatch({
      type: ADD_PROVIDER + FAIL,
      error
    }))
}

/**
 * Экшен перемещает провайдер из списка "зарегистрированнх" провайдеров в список "доступных для регистрации"
 * @param entityCode
 * @param eventId
 * @param providerId
 */
export const unregister = (entityCode, eventId, providerId) => dispatch => {
  dispatch({
    type: REMOVE_PROVIDER + START
  })

  const params = {
    method: 'DELETE'
  }

  getJSON(`/entities/${entityCode}/events/${eventId}/providers/${providerId}`, params)
    .then(() => dispatch({
      type: REMOVE_PROVIDER + SUCCESS
    }))
    .catch(error => dispatch({
      type: REMOVE_PROVIDER + FAIL,
      error
    }))
}

export const update = (entityCode, eventId, providerId, data) => dispatch => {
  dispatch({
    type: UPDATE_PROVIDER_DATA + START
  })

  const params = {
    method: 'POST',
    body: JSON.stringify({
      ...data
    })
  }

  getJSON(`/entities/${entityCode}/events/${eventId}/providers/${providerId}`, params)
    .then(() => dispatch({
      type: UPDATE_PROVIDER_DATA + SUCCESS
    }))
    .catch(error => dispatch({
      type: UPDATE_PROVIDER_DATA + FAIL
    }))
}

export const addRule = (providerId, defaultLogic) => ({
  type: ADD_PROVIDER_RULE,
  payload: {
    providerId,
    rule: {
      assertions: [],
      logic: defaultLogic,
      consumers: []
    }
  }
})

export const updateRule = (providerId, ruleIndex, data) => ({
  type: UPDATE_PROVIDER_RULE,
  payload: {
    providerId,
    ruleIndex,
    data
  }
})

export const removeRule = (entityCode, eventId, providerId, ruleIndex, ruleId) => dispatch => {
  if (!ruleId) {
    dispatch({
      type: REMOVE_PROVIDER_RULE,
      payload: {
        providerId,
        ruleIndex
      }
    })
    return
  }

  dispatch({
    type: REMOVE_PROVIDER_RULE + START,
  })

  getJSON(`/entities/${entityCode}/events/${eventId}/providers/${providerId}/rule/${ruleId}`, {
    method: 'DELETE'
  })
    .then(() => dispatch({
      type: REMOVE_PROVIDER_RULE + SUCCESS
    }))
    .catch(error => dispatch({
      type: REMOVE_PROVIDER_RULE + FAIL,
      error
    }))
}

export const updateTemplate = (providerId, data) => ({
  type: UPDATE_PROVIDER_TEMPLATE,
  payload: {
    providerId,
    data
  }
})
