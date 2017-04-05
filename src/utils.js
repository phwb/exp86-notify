export function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function parseJSON (response) {
  return response.json()
}

const initialParams = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export function getJSON (url, params = {}) {
  return fetch(`/local/api/notify${url}`, { ...initialParams, ...params })
    .then(checkStatus)
    .then(parseJSON)
}
