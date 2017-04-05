import React, { Component, PropTypes } from 'react'
import { getJSON } from '../../utils'
import { Template } from '../Template'
import { Rules } from '../Rules'

const initialTemplate = {
  title: '',
  body: '',
}

export class ProviderDetail extends Component {
  static propTypes = {
    entityCode: PropTypes.string.isRequired,
    eventId: PropTypes.number.isRequired,
    providerId: PropTypes.number.isRequired
  }

  state = {
    template: { ...initialTemplate },
    rules: []
  }

  load () {
    const { entityCode, eventId, providerId } = this.props

    getJSON(`/entities/${entityCode}/events/${eventId}/providers/${providerId}`)
      .then(({ template, rules }) => this.setState({ template, rules }))
      .catch(console.error)
  }

  reset () {
    this.setState({
      template: { ...initialTemplate }
    }, this.load)
  }

  componentDidMount () {
    this.load()
  }

  save () {
    const { rules } = this
    const { entityCode, eventId, providerId } = this.props
    const { title, body } = this.template
    const params = {
      method: 'POST',
      body: JSON.stringify({
        template: {
          title: title.value,
          body: body.value
        },
        rules: []
      })
    }

    rules.toJSON()

    getJSON(`/entities/${entityCode}/events/${eventId}/providers/${providerId}`, params)
      .then(() => this.reset())
      .catch(console.error)
  }

  render () {
    const { template, rules } = this.state

    const saveHandle = e => {
      e.preventDefault()
      this.save()
    }

    return (
      <div className="provider-detail">
        <Template
          { ...template }
          ref={ instance => this.template = instance }
        />
        <Rules
          rules={ rules }
          ref={ instance => this.rules = instance }
        />
        <div>
          <button onClick={ saveHandle }>Save</button>
        </div>
      </div>
    )
  }
}