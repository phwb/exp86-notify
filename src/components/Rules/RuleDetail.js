import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateRule, removeRule, } from '../../actions/providers'

const Consumers = props => {
  const { id, items, dictionaries, update, remove } = props

  if (!items.length) {
    return null
  }

  const handler = i => e => {
    remove(i)
    e.preventDefault()
  }

  return (
    <div className="form_default_item mb-5">
      <div className="form_default_title">Получатели</div>
      { items.map((name, i) => (
        <div key={ `${id}-${i}` } className="form_default_input cleaner mb-5">
          <input
            type="text"
            value={ name }
            onChange={ e => update(i, e.target.value) }
          />
          <div className="cleaner-remove" onClick={ handler(i) }>
            <span className="icon-remove"/>
          </div>
          <br/>
        </div>
      )) }
      <div className="form_default_item" style={{ marginTop: '20px' }}>
        <div className="form_default_title">Доступные константы</div>
        { dictionaries.map((item, i) => (
          <div className="form_default_option" key={ `dictionaries-${i}` }>
            <strong>{ item.code }</strong> — { item.value }
          </div>
        )) }
      </div>
    </div>
  )
}

Consumers.propTypes = {
  items: PropTypes.array,
  update: PropTypes.func,
  remove: PropTypes.func,
  id: PropTypes.string
}

class Assertions extends Component {
  render () {
    const { items, values, change } = this.props

    return (
      <select ref={ select => this.select = select } multiple={ true } value={ values } onChange={ change } >
        { items.map((item, i) => (
          <option key={ `assertions-${i}` } value={ item.code }>
            { item.name }
          </option>
        )) }
      </select>
    )
  }
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
    <div className="provider-regulations-block">
      <div className="form_default_item">
        <div className="form_default_title">Утверждение</div>
        <div className="form_default_input">
          <Assertions
            items={ dictionaries.assertions }
            values={ assertions }
            change={ selectAssertionsHandle }
          />
        </div>
      </div>
      <div className="form_default_item">
        <div className="form_default_title">Логика</div>
        <div className="form_default_input">
          { dictionaries.logic.map((item, i) => (
            <div className="form_default_radio" key={ `logic-${key}-${i}` }>
              <input
                id={ `logic-${key}-${i}` }
                type="radio"
                checked={ item.code === logic }
                value={ item.code }
                onChange={ changeLogicHandle }
              />
              <label htmlFor={ `logic-${key}-${i}` }>
                { item.name }
              </label>
            </div>
          )) }
        </div>
      </div>
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
