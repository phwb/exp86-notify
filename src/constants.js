const LOAD = 'LOAD_'
const ADD = 'ADD_'
const SELECT = 'SELECT_'
const REMOVE = 'REMOVE_'
const UPDATE = 'UPDATE_'

export const START = '_START'
export const SUCCESS = '_SUCCESS'
export const FAIL = '_FAIL'

export const LOAD_DICTIONARIES = 'LOAD_DICTIONARIES'

export const LOAD_SECTIONS = 'LOAD_SECTIONS'

export const SET_ENTITY_CODE = 'SET_ENTITY_CODE'

const EVENT = 'EVENT'
export const LOAD_EVENT = LOAD + EVENT
export const SELECT_EVENT = SELECT + EVENT
export const REMOVE_EVENT = REMOVE + EVENT
export const ADD_EVENT = ADD + EVENT

const PROVIDER = 'PROVIDER'
export const LOAD_PROVIDER = LOAD + PROVIDER
export const ADD_PROVIDER = ADD + PROVIDER
export const REMOVE_PROVIDER = REMOVE + PROVIDER
export const UPDATE_PROVIDER_DATA = `${UPDATE + PROVIDER}_DATA`

export const ADD_PROVIDER_RULE = `${ADD + PROVIDER}_RULE`
export const UPDATE_PROVIDER_RULE = `${UPDATE + PROVIDER}_RULE`
export const REMOVE_PROVIDER_RULE = `${REMOVE + PROVIDER}_RULE`

export const UPDATE_PROVIDER_TEMPLATE = `${UPDATE + PROVIDER}_TEMPLATE`
