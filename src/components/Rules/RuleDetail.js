import React from 'react'
import { connect } from 'react-redux'
import { Assertions } from './detail/Assertions'
import { Consumers } from './detail/Consumers'
import { Logic } from './detail/Logic'
import {
  removeRule, updateLogic, updateAssertions,
  updateConsumer, addConsumer, removeConsumer
} from '../../actions/providersData'

export const RuleDetail = props => {
  const { dictionaries } = props
  const { entityCode, eventId, providerId, ruleIndex } = props
  const { id, assertions, logic, consumers } = props
  const {
    removeRule, updateLogic, updateAssertions,
    updateConsumer, addConsumer, removeConsumer
  } = props
  const key = `${providerId}-${ruleIndex}`

  return (
    <div className="provider-regulations-block">
      <Assertions
        items={ dictionaries.assertions }
        values={ assertions }
        change={ assertions => updateAssertions(providerId, ruleIndex, assertions) }
      />
      <Logic
        items={ dictionaries.logic }
        value={ logic }
        change={ logic => updateLogic(providerId, ruleIndex, logic) }
      />
      <Consumers
        items={ consumers }
        dictionaries={ dictionaries.consumers }
        id={ `consumer-${key}` }
        update={ (i, value) => updateConsumer(providerId, ruleIndex, i, value) }
        remove={ i => removeConsumer(providerId, ruleIndex, i) }
      />
      <div className="provider-nav__add">
        <button onClick={ () => addConsumer(providerId, ruleIndex) }>
          Добавить получателя
        </button>
      </div>
      <div className="provider-nav__remove-regulation">
        <button onClick={ () => removeRule(entityCode, eventId, providerId, ruleIndex, id) }>
          Удалить правило
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ dictionaries }) => {
  const { logic, consumers, assertions } = dictionaries

  return {
    dictionaries: {
      assertions,
      logic,
      consumers
    }
  }
}

const mapDispatchToProps = {
  removeRule,
  updateLogic,
  updateAssertions,
  updateConsumer,
  addConsumer,
  removeConsumer
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleDetail)
