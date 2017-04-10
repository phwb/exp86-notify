import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { EventSelect } from './EventSelect'
import { EventList } from './EventList'
import { EventDetail } from './EventDetail'
import { add, select, remove } from '../../actions/events'

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
    <div className="col-nt">
      <div className="col-nt-30 mr-20">
        <h2 className="notification-h2">Список событий</h2>
        <div className="form_default_item">
          <div className="form_default_title">Добавить событие</div>
          <EventSelect items={ available } onChange={ code => addEvent(entityCode, code) }/>
        </div>

        <EventList items={ registered } onClick={ eventId => selectEvent(entityCode, eventId) }/>
      </div>

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
    loadingProviders: state.providers.loading,
    loading,
    items,
    event
  }
}

const mapDispatchToProps = {
  selectEvent: select,
  addEvent: add,
  removeEvent: remove
}

const mergeProps = (stateProps, dispatchProps) => {
  const { loadingProviders, ...state } = stateProps
  const { event } = state
  const { selectEvent } = dispatchProps

  return {
    ...state,
    ...dispatchProps,
    selectEvent: (entityCode, eventId) => {
      if (loadingProviders) {
        return
      }

      if (!event) {
        return selectEvent(eventId)
      }

      event.id !== eventId && selectEvent(eventId)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Events)