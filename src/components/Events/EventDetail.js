import React, { PropTypes } from 'react'
import Providers from '../Providers'

export const EventDetail = props => {
  const { event, removeHandler, entityCode } = props

  if (!event) {
    return null
  }

  const handler = e => {
    removeHandler(event.id)
    e.preventDefault()
  }

  return (
    <div className="col-nt-70">
      <div className="notification-h2 clean">
        { event.name }
        <div className="notification-remove" onClick={ handler } title="Удалить событие">
          <span className="icon-remove"/>
        </div>
      </div>
      <hr/>
      <Providers entityCode={ entityCode } eventId={ event.id } />
    </div>
  )
}

EventDetail.propTypes = {
  removeHandler: PropTypes.func.isRequired,
  entityCode: PropTypes.string.isRequired,
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })
}