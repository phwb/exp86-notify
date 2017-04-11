import { combineReducers } from 'redux'
import { dictionaries } from './dictionaries'
import { sections } from './sections'
import { selectedSection } from './selectedSection'
import { events } from './events'
import { providers } from './providers'
import { providersData } from './providersData'

export const reducers = combineReducers({
  dictionaries,
  sections,
  selectedSection,
  events,
  providers,
  providersData
})
