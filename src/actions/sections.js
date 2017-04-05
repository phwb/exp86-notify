import { LOAD_SECTIONS, START, SUCCESS, FAIL } from '../constants'
import { getJSON } from '../utils'

export const load = () => dispatch => {
  dispatch({
    type: LOAD_SECTIONS + START
  })

  getJSON('/entities')
    .then(items => dispatch({
      type: LOAD_SECTIONS + SUCCESS,
      payload: items
    }))
    .catch(error => dispatch({
      type: LOAD_SECTIONS + FAIL,
      error
    }))
}