import {
  LOAD_PROVIDER, ADD_PROVIDER, REMOVE_PROVIDER, UPDATE_PROVIDER_DATA,
  START, SUCCESS, FAIL
} from '../constants'
import { getJSON } from '../utils'

export const load = (entityCode, eventId) => dispatch => {
  dispatch({
    type: LOAD_PROVIDER + START
  })

  // сначала получаем все провайдеры
  getJSON(`/entities/${entityCode}/events/${eventId}/providers`)
    // делим их на доступные к регистрации и зарегистрированные
    .then(items => items.map(item => ({
      ...item,
      id: parseInt(item.id, 10) || 0
    })))
    // получаем правила для зарегистированных провайдеров
    .then(items => new Promise((resolve, reject) => {
      const urls = items.reduce(
        (acc, item) => {
          if (item.id > 0) {
            return [
              ...acc,
              `/entities/${entityCode}/events/${eventId}/providers/${item.id}`
            ]
          }

          return acc
        },
        []
      )

      Promise.all(urls.map(getJSON))
        .then(results => {
          resolve({
            items,
            providersData: results.map(data => ({
              providerId: data.id,
              rules: data.rules,
              template: data.template
            }))
          })
        })
        .catch(error => reject(error))
    }))
    // диспатчим результат только после того как получили список провайдеров, поделили их и получили правила
    .then(({ items, providersData })=> dispatch({
      type: LOAD_PROVIDER + SUCCESS,
      payload: {
        items,
        providersData
      }
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