import React, { Component, PropTypes } from 'react'
import RuleDetail from './RuleDetail'

const RuleItem = props => {
  const handle = e => {
    props.onClick(props.id)
    e.preventDefault()
  }

  let className = props.active
    ? 'provider-tabs__item active'
    : 'provider-tabs__item'

  return (
    <a href='#' className={ className } onClick={ handle }>
      { props.name }
    </a>
  )
}

const RuleList = props => (
  <div className="provider-tabs regs">
    { props.items.map((item, index) => (
      <RuleItem
        key={ `rule-item-${index}` }
        name={ index + 1 }
        { ...item }
        onClick={ () => props.changeHandle(index) }
        active={ index === props.selectedIndex }
      />
    )) }

    <div className="provider-nav__add-rule">
      <button onClick={ () => props.addHandle() }>Добавить правило</button>
    </div>
  </div>
)

RuleList.propTypes = {
  items: PropTypes.array,
  changeHandle: PropTypes.func,
  addHandle: PropTypes.func
}

export class Rules extends Component {
  static propTypes = {
    entityCode: PropTypes.string.isRequired,
    eventId: PropTypes.number.isRequired,
    providerId: PropTypes.number.isRequired,
    rules: PropTypes.array,
    add: PropTypes.func
  }

  state = {
    index: 0
  }

  render () {
    const { entityCode, eventId, providerId } = this.props
    const { rules, add } = this.props
    const { index } = this.state
    const rule = rules[ index ]
    let detail = null

    if (rule) {
      detail = <RuleDetail
        { ...rule }
        entityCode={ entityCode }
        eventId={ eventId }
        providerId={ providerId }
        ruleIndex={ index }
      />
    }

    return (
      <section className="provider-regulations">
        <RuleList
          items={ rules }
          changeHandle={ index => this.setState({ index }) }
          addHandle={ () => add() }
          selectedIndex={ index }
        />
        { detail }
      </section>
    )
  }
}
