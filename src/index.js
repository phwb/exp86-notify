import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger  } from 'redux-logger'
import { reducers } from './reducers'
import App from './components/App'

const logger = createLogger({
  collapsed: true
})

const middleware = [ thunk ]

/** @namespace process */
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

render(
  <Provider store={ createStore(reducers, applyMiddleware(...middleware)) }>
    <App />
  </Provider>,
  document.querySelector('#root')
)
