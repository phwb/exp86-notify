import React, { Component, PropTypes } from 'react'
import { getJSON } from '../../utils'
import { ProviderSelect } from './ProviderSelect'
import { ProviderList } from './ProviderList'

const initialState = {
  items: []
}

export class Providers extends Component {
  static propTypes = {
    entityCode: PropTypes.string.isRequired,
    eventId: PropTypes.number.isRequired
  }

  state = { ...initialState }

  loadItems () {
    const { entityCode, eventId } = this.props

    getJSON(`/entities/${entityCode}/events/${eventId}/providers`)
      .then(items => items.map(item => ({
        ...item,
        id: parseInt(item.id, 10) || 0
      })))
      .then(items => this.setState({ items }))
      .catch(console.error)
  }

  resetItems () {
    this.setState({ ...initialState }, this.loadItems)
  }

  componentDidMount () {
    this.loadItems()
  }

  componentWillReceiveProps () {
    this.resetItems()
  }

  add (providerCode) {
    if (!providerCode) {
      return
    }

    const { entityCode, eventId } = this.props
    const params = {
      method: 'POST',
      body: JSON.stringify({ providerCode })
    }

    getJSON(`/entities/${entityCode}/events/${eventId}/providers`, params)
      .then(() => this.resetItems())
      .catch(console.error)
  }

  remove (id) {
    if (!id) {
      return
    }

    const { entityCode, eventId } = this.props
    const params = {
      method: 'DELETE'
    }

    getJSON(`/entities/${entityCode}/events/${eventId}/providers/${id}`, params)
      .then(() => this.resetItems())
      .catch(console.error)
  }

  render () {
    const { items } = this.state
    const { entityCode, eventId } = this.props

    if (!items.length) {
      return <div>Loading providers...</div>
    }

    const available = items.filter(item => item.id === 0)
    const registered = items.filter(item => item.id > 0)

    return (
      <div className="providers">
        <ProviderSelect items={ available } onChange={ value => this.add(value) }/>
        <ProviderList
          items={ registered }
          removeHandler={ value => this.remove(value) }
          entityCode={ entityCode }
          eventId={ eventId }
        />
      </div>
    )
  }
}
