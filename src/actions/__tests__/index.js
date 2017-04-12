import { selectedSection } from '../selectedSection'
import * as types from '../../constants'

describe('actions', () => {
  it('should create an action to select section code', () => {
    const code = 'TestSectionCode'
    const expectedAction = {
      type: types.SET_ENTITY_CODE,
      payload: code
    }
    expect(selectedSection(code)).toEqual(expectedAction)
  })
})