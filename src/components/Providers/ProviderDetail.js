import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Template } from '../Template'
import { Rules } from '../Rules'
import { update, addRule } from '../../actions/providers'

export class ProviderDetail extends Component {
  static propTypes = {
    entityCode: PropTypes.string.isRequired,
    eventId: PropTypes.number.isRequired,
    providerId: PropTypes.number.isRequired,
    template: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string
    }),
    defaultLogic: PropTypes.string,
    rules: PropTypes.array,
    update: PropTypes.func,
    addRule: PropTypes.func
  }

  render () {
    const {
      template, rules,
      entityCode, eventId, providerId, defaultLogic,
      update, addRule
    } = this.props

    const saveHandle = e => {
      const { title, body } = this.template
      const params = {
        template: {
          title: title.value,
          body: body.value
        },
        rules
      }

      update(entityCode, eventId, providerId, params)

      e.preventDefault()
    }
    console.log(rules)

    return (
      <div className="provider-detail">
        <Template
          { ...template }
          ref={ instance => this.template = instance }
        />
        <Rules
          entityCode={ entityCode }
          eventId={ eventId }
          providerId={ providerId }
          rules={ rules }
          add={ () => addRule(providerId, defaultLogic) }
          ref={ instance => this.rules = instance }
        />
        <br/>
        <div>
          <button onClick={ saveHandle }>Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ providers, dictionaries }, { providerId }) => {
  const { template, rules } = providers.data[ providerId ]

  return {
    template,
    rules,
    defaultLogic: dictionaries.logic[0].code
  }
}

const mapDispatchToProps = {
  update,
  addRule
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderDetail)