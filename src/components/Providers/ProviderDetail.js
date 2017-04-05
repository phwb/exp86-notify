import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Template } from '../Template'
import { update } from '../../actions/providers'
// import { Rules } from '../Rules'

export class ProviderDetail extends Component {
  static propTypes = {
    entityCode: PropTypes.string.isRequired,
    eventId: PropTypes.number.isRequired,
    providerId: PropTypes.number.isRequired,
    template: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string
    }),
    rules: PropTypes.array,
    update: PropTypes.func
  }

  render () {
    const {
      template, /*rules , */
      entityCode, eventId, providerId,
      update
    } = this.props

    const saveHandle = e => {
      const { title, body } = this.template
      const params = {
        template: {
          title: title.value,
          body: body.value
        },
        rules: []
      }

      update(entityCode, eventId, providerId, params)

      e.preventDefault()
    }

    return (
      <div className="provider-detail">
        <Template
          { ...template }
          ref={ instance => this.template = instance }
        />
        {/*<Rules
          rules={ rules }
          ref={ instance => this.rules = instance }
        />*/}
        <div>
          <button onClick={ saveHandle }>Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ providers }, { providerId }) => {
  const { template, rules } = providers.rules[ providerId ]

  return {
    template,
    rules
  }
}

const mapDispatchToProps = {
  update
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderDetail)