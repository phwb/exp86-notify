import {
  LOAD_PROVIDER, ADD_PROVIDER, REMOVE_PROVIDER,
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
          rules: results
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

export const save = (entityCode, eventId, providerCode) => dispatch => {
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

export const remove = (entityCode, eventId, providerId) => dispatch => {
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