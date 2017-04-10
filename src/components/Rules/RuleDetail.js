import React from 'react'
import { connect } from 'react-redux'
import { Assertions } from './detail/Assertions'
import { Consumers } from './detail/Consumers'
import { Logic } from './detail/Logic'
import { updateRule, removeRule, } from '../../actions/providers'

export const RuleDetail = props => {
  const { dictionaries } = props
  const {
    id = null, assertions, logic, consumers,
    entityCode, eventId, providerId, ruleIndex,
    updateRule, removeRule
  } = props
  const key = `${providerId}-${ruleIndex}`

  const selectAssertionsHandle = assertions => updateRule(providerId, ruleIndex, { assertions })

  const changeLogicHandle = logic => updateRule(providerId, ruleIndex, { logic })

  const addConsumerHandler = () => updateRule(providerId, ruleIndex, {
    consumers: consumers.concat([ '' ])
  })

  const removeConsumerHandler = (i) => updateRule(providerId, ruleIndex, {
    consumers: [
      ...consumers.slice(0, i),
      ...consumers.slice(i + 1)
    ]
  })

  const updateConsumerHandler = (i, value) => updateRule(providerId, ruleIndex, {
    consumers: consumers.map((item, index) => {
      if (index !== i) {
        return item
      }

      return value
    })
  })

  return (
    <div className="provider-regulations-block">
      <Assertions
        items={ dictionaries.assertions }
        values={ assertions }
        change={ selectAssertionsHandle }
      />
      <Logic
        items={ dictionaries.logic }
        value={ logic }
        change={ changeLogicHandle }
      />
      <Consumers
        items={ consumers }
        dictionaries={ dictionaries.consumers }
        update={ updateConsumerHandler }
        remove={ removeConsumerHandler }
        id={ `consumer-${key}` }
      />
      <div className="provider-nav__add">
        <button onClick={ addConsumerHandler }>Добавить получателя</button>
      </div>
      <div className="provider-nav__remove-regulation">
        <button onClick={ () => removeRule(entityCode, eventId, providerId, ruleIndex, id) }>
          Удалить правило
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ events, dictionaries }) => {
  const { assertions } = events
  const { logic, consumers } = dictionaries

  return {
    dictionaries: {
      assertions,
      logic,
      consumers
    }
  }
}

const mapDispatchToProps = {
  updateRule,
  removeRule
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleDetail)
