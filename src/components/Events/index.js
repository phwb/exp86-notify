import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { EventSelect } from './EventSelect'
import { EventList } from './EventList'
import { EventDetail } from './EventDetail'
import { add as addEvent, select as selectEvent, remove as removeEvent } from '../../actions/events'

export const Events = props => {
  const {
    loading, items, entityCode, event,
    addEvent, selectEvent, removeEvent
  } = props

  if (loading) {
    return <div>Loading events...</div>
  }

  if (!items.length) {
    return null
  }

  // доступные для регистрации события
  const available = items.filter(item => item.id === 0)
  // уже зарегистрированные события
  const registered = items.filter(item => item.id > 0)

  return (
    <div className="events">
      <div className="event-list">
        <EventSelect items={ available } onChange={ code => addEvent(entityCode, code) }/>
        <EventList items={ registered } onClick={ id => selectEvent(id) }/>
      </div>
      <hr/>
      <EventDetail
        removeHandler={ id => removeEvent(entityCode, id) }
        event={ event }
        entityCode={ entityCode }
      />
    </div>
  )
}

Events.propTypes = {
  entityCode: PropTypes.string,
  loading: PropTypes.bool,
  items: PropTypes.array,
  event: PropTypes.object,
  addEvent: PropTypes.func,
  selectEvent: PropTypes.func,
  removeEvent: PropTypes.func
}

const mapStateToProps = state => {
  const { events, selectedSection } = state
  const { items, id, loading } = events
  const event = id
    ? items.find(item => item.id === id)
    : null

  return {
    entityCode: selectedSection,
    loading,
    items,
    event
  }
}

const mapDispatchToProps = {
  selectEvent,
  addEvent,
  removeEvent
}

const mergeProps = (stateProps, dispatchProps) => {
  const { event } = stateProps
  const { selectEvent } = dispatchProps

  return {
    ...stateProps,
    ...dispatchProps,
    selectEvent: id => {
      if (!event) {
        return selectEvent(id)
      }

      event.id !== id && selectEvent(id)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Events)