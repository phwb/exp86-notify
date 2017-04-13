import { LOAD_DICTIONARIES, START, SUCCESS, FAIL } from '../constants'
import { getJSON } from '../utils'

export const load = () => dispatch => {
  dispatch({
    type: LOAD_DICTIONARIES + START
  })

  return Promise.all([
    getJSON(`/dictionaries/variables/consumers`),
    getJSON(`/dictionaries/logic`)
  ])
    .then(results => {
      const [ consumers, logic ] = results

      dispatch({
        type: LOAD_DICTIONARIES + SUCCESS,
        payload: {
          consumers,
          logic
        }
      })
    })
    .catch(error => dispatch({
      type: LOAD_DICTIONARIES + FAIL,
      error
    }))
}