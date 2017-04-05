import React, { Component, PropTypes } from 'react'
// import { Providers } from '../Providers'

export class EventDetail extends Component {
  static propTypes = {
    removeHandler: PropTypes.func.isRequired,
    entityCode: PropTypes.string.isRequired,
    event: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  }

  shouldComponentUpdate (nextProps) {
    const { event } = this.props

    if (!event) {
      return true
    }

    return event.id !== nextProps.event.id
  }

  render () {
    const { event, removeHandler/*, entityCode */} = this.props

    if (!event) {
      return null
    }

    const handler = e => {
      removeHandler(event.id)
      e.preventDefault()
    }

    return (
      <div className="event-detail">
        <div className="event-detail__title">
          { event.name } <a href="#" onClick={ handler }>Удалить</a>
        </div>
        {/*<hr/>
        <Providers entityCode={ entityCode } eventId={ event.id } />*/}
      </div>
    )
  }
}