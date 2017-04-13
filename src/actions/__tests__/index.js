import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { selectedSection } from '../selectedSection'
import { load as loadSections } from '../sections'
import { load as loadDictionaries } from '../dictionaries'
import * as types from '../../constants'

const { SUCCESS, START } = types
const BASE_URL = '/local/api/notify'

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

describe('async actions', () => {
  nock('http://localhost/')
    .get(`${BASE_URL}/entities`)
    .reply(200, [])
    .get(`${BASE_URL}/dictionaries/variables/consumers`)
    .reply(200, [])
    .get(`${BASE_URL}/dictionaries/logic`)
    .reply(200, [])

  const mockStore = configureMockStore([ thunk ])

  it(`creates ${types.LOAD_SECTIONS + SUCCESS} when fetching sections has been done`, () => {
    const expectedActions = [{
      type: types.LOAD_SECTIONS + START
    }, {
      type: types.LOAD_SECTIONS + SUCCESS,
      payload: []
    }]
    const store = mockStore()

    return store.dispatch(loadSections())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  })

  it(`creates ${types.LOAD_DICTIONARIES + SUCCESS} when fetching dictionaries has been done`, () => {
    const expectedActions = [{
      type: types.LOAD_DICTIONARIES + START
    }, {
      type: types.LOAD_DICTIONARIES + SUCCESS,
      payload: {
        consumers: [],
        logic: []
      }
    }]
    const store = mockStore()

    return store.dispatch(loadDictionaries())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  })
})