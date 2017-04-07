import React from 'react'
import { connect } from 'react-redux'
import { updateRule, removeRule, } from '../../actions/providers'

const style = {
  margin: '10px 30px',
  border: '1px solid #000',
  padding: '10px'
}

export const RuleDetail = props => {
  const { dictionaries } = props
  const {
    id = null, assertions, logic, consumers,
    entityCode, eventId, providerId, ruleIndex,
    updateRule, removeRule
  } = props
  const key = `${providerId}-${ruleIndex}`

  const selectAssertionsHandle = e => {
    const { options } = e.target
    let assertions = []

    for (let option of options) {
      option.selected && (assertions = assertions.concat([ option.value ]))
    }

    updateRule(providerId, ruleIndex, { assertions })
  }

  const changeLogicHandle = e => updateRule(providerId, ruleIndex, {
    logic: e.target.value
  })

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
    <div style={ style }>
      <select
        multiple={ true }
        value={ assertions }
        onChange={ selectAssertionsHandle }
      >
        { dictionaries.assertions.map((item, i) => (
          <option key={ `assertions-${key}-${i}` } value={ item.code }>
            { item.name }
          </option>
        )) }
      </select>
      <br/>
      { dictionaries.logic.map((item, i) => (
        <label key={ `logic-${key}-${i}` }>
          <input
            type="radio"
            checked={ item.code === logic }
            value={ item.code }
            onChange={ changeLogicHandle }
          /> { item.name }
        </label>
      )) }
      <hr/>
      { consumers.map((name, i) => (
        <div key={ `consumer-${key}-${i}` }>
          <input
            type="text"
            value={ name }
            onChange={ e => updateConsumerHandler(i, e.target.value) }
          />
          <button onClick={ () => removeConsumerHandler(i) }>
            Delete consumer
          </button>
          <br/>
        </div>
      )) }
      <div style={{ marginTop: '5px' }}>
        <button onClick={ addConsumerHandler }>+ Add consumer</button>
      </div>
      <hr/>
      <button onClick={ () => removeRule(entityCode, eventId, providerId, ruleIndex, id) }>
        Delete rule
      </button>
    </div>
  )
}

const mapStateToProps = ({ events, dictionaries }) => {
  const { assertions } = events
  const { logic } = dictionaries

  return {
    dictionaries: {
      assertions,
      logic
    }
  }
}

const mapDispatchToProps = {
  updateRule,
  removeRule
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleDetail)
