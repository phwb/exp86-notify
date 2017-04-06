import React from 'react'
import { connect } from 'react-redux'
import { updateRule, removeRule } from '../../actions/providers'

const style = {
  margin: '10px 30px',
  border: '1px solid #000',
  padding: '10px'
}

export const RuleDetail = props => {
  const { dictionaries } = props
  const {
    id = null, assertions, logic,/* consumers,*/
    entityCode, eventId, providerId, ruleIndex,
    updateRule, removeRule
  } = props
  const key = `${providerId}-${ruleIndex}`

  const selectHandle = e => {
    const { options } = e.target
    let assertions = []

    for (let option of options) {
      option.selected && (assertions = assertions.concat([ option.value ]))
    }

    updateRule(providerId, ruleIndex, { assertions })
  }

  const radioHandle = e => {
    updateRule(providerId, ruleIndex, {
      logic: e.target.value
    })
  }

  return (
    <div style={ style }>
      <select
        multiple={ true }
        value={ assertions }
        onChange={ selectHandle }
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
            onChange={ radioHandle }
          /> { item.name }
        </label>
      )) }
      <hr/>
      { id
        ? <button onClick={ () => removeRule(entityCode, eventId, providerId, ruleIndex, id) }>Delete rule</button>
        : null }
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
