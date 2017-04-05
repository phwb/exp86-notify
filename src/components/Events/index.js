import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { EventSelect } from './EventSelect'
import { EventList } from './EventList'
import { EventDetail } from './EventDetail'
import { add as addEvent, select as selectEvent, remove as removeEvent } from '../../actions/events'


export class Events extends Component {
  static propTypes = {
    entityCode: PropTypes.string,
    loading: PropTypes.bool,
    items: PropTypes.array,
    event: PropTypes.object,
    addEvent: PropTypes.func,
    selectEvent: PropTypes.func,
    removeEvent: PropTypes.func
  }

  // remove (id) {
  //   if (!id) {
  //     return
  //   }
  //
  //   getJSON(`/entities/${this.props.entityCode}/events/${id}`, {
  //     method: 'DELETE'
  //   })
  //     .then(() => this.resetItems())
  //     .catch(console.error)
  // }

  render () {
    const {
      loading, items, entityCode, event,
      addEvent, selectEvent, removeEvent
    } = this.props

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

export default connect(mapStateToProps, mapDispatchToProps)(Events)