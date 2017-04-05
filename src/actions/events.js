import {
  EVENT,
  START, SUCCESS, FAIL,
  LOAD, ADD, SELECT, REMOVE
} from '../constants'
import { getJSON } from '../utils'

const normalizeItem = item => ({
  ...item,
  id: parseInt(item.id, 10) || 0
})

export const load = entityCode => dispatch => {
  dispatch({
    type: LOAD + EVENT + START
  })

  Promise.all([
    getJSON(`/entities/${entityCode}/events`),
    getJSON(`/dictionaries/variables/template/${entityCode}`),
    getJSON(`/dictionaries/assertions/${entityCode}`)
  ])
    .then(results => {
      let [ items, templates, assertions ] = results
      items = items.map(normalizeItem)

      dispatch({
        type: LOAD + EVENT + SUCCESS,
        payload: {
          items,
          templates,
          assertions
        }
      })
    })
    .catch(error => dispatch({
      type: EVENT + FAIL,
      error
    }))
}

/**
 * @param entityCode
 * @param eventCode
 */
export const add = (entityCode, eventCode) => dispatch => {
  dispatch({
    type: ADD + EVENT + START
  })

  getJSON(`/entities/${entityCode}/events`, {
    method: 'POST',
    body: JSON.stringify({ eventCode })
  })
    .then(() => getJSON(`/entities/${entityCode}/events`))
    .then(items => items.map(normalizeItem))
    .then(items => dispatch({
      type: ADD + EVENT + SUCCESS,
      payload: items
    }))
    .catch(error => dispatch({
      type: EVENT + FAIL,
      error
    }))
}

/**
 * @param id
 */
export const select = id => ({
  type: SELECT + EVENT,
  payload: id
})

/**
 * @param entityCode
 * @param id
 */
export const remove = (entityCode, id) => dispatch => {
  dispatch({
    type: REMOVE + EVENT + START
  })

  getJSON(`/entities/${entityCode}/events/${id}`, {
    method: 'DELETE'
  })
    .then(() => getJSON(`/entities/${entityCode}/events`))
    .then(items => items.map(normalizeItem))
    .then(items => dispatch({
      type: REMOVE + EVENT + SUCCESS,
      payload: items
    }))
    .catch(error => dispatch({
      type: EVENT + FAIL,
      error
    }))
}