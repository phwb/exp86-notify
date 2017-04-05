import {
  REMOVE_EVENT, ADD_EVENT, LOAD_EVENT, SELECT_EVENT,
  START, SUCCESS, FAIL
} from '../constants'
import { getJSON } from '../utils'

const normalizeItem = item => ({
  ...item,
  id: parseInt(item.id, 10) || 0
})

export const load = entityCode => dispatch => {
  dispatch({
    type: LOAD_EVENT + START
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
        type: LOAD_EVENT + SUCCESS,
        payload: {
          items,
          templates,
          assertions
        }
      })
    })
    .catch(error => dispatch({
      type: LOAD_EVENT + FAIL,
      error
    }))
}

export const add = (entityCode, eventCode) => dispatch => {
  dispatch({
    type: ADD_EVENT + START
  })

  getJSON(`/entities/${entityCode}/events`, {
    method: 'POST',
    body: JSON.stringify({ eventCode })
  })
    .then(() => getJSON(`/entities/${entityCode}/events`))
    .then(items => items.map(normalizeItem))
    .then(items => dispatch({
      type: ADD_EVENT + SUCCESS,
      payload: items
    }))
    .catch(error => dispatch({
      type: ADD_EVENT + FAIL,
      error
    }))
}

export const select = eventId => ({
  type: SELECT_EVENT,
  payload: eventId
})

export const remove = (entityCode, id) => dispatch => {
  dispatch({
    type: REMOVE_EVENT + START
  })

  getJSON(`/entities/${entityCode}/events/${id}`, {
    method: 'DELETE'
  })
    .then(() => getJSON(`/entities/${entityCode}/events`))
    .then(items => items.map(normalizeItem))
    .then(items => dispatch({
      type: REMOVE_EVENT + SUCCESS,
      payload: items
    }))
    .catch(error => dispatch({
      type: REMOVE_EVENT + FAIL,
      error
    }))
}
