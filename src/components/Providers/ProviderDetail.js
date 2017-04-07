import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Template from '../Template'
import { Rules } from '../Rules'
import { update, addRule } from '../../actions/providers'

export const ProviderDetail = props => {
  const {
    template, rules,
    entityCode, eventId, providerId, defaultLogic,
    update, addRule
  } = props

  const saveHandle = e => {
    update(entityCode, eventId, providerId, {
      template,
      rules
    })
    e.preventDefault()
  }

  return (
    <div className="provider-detail">
      <Template
        { ...template }
        providerId={ providerId }
      />
      <Rules
        entityCode={ entityCode }
        eventId={ eventId }
        providerId={ providerId }
        rules={ rules }
        add={ () => addRule(providerId, defaultLogic) }
      />
      <br/>
      <div>
        <button onClick={ saveHandle }>Save</button>
      </div>
    </div>
  )
}

ProviderDetail.propTypes = {
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

const mapStateToProps = ({ providers, dictionaries }, { providerId }) => {
  const { template, rules } = providers.data[ providerId ]
  const { logic } = dictionaries
  const defaultLogic = logic && logic.length > 0
    ? logic[0].code
    : ''

  return {
    template,
    rules,
    defaultLogic
  }
}

const mapDispatchToProps = {
  update,
  addRule
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderDetail)