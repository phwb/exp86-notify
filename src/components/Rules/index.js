import React, { Component, PropTypes } from 'react'
import RuleDetail from './RuleDetail'

const RuleList = props => {
  const handle = index => e => {
    props.changeHandle(index)
    e.preventDefault()
  }

  return (
    <div className="provider-tabs regs">
      { props.items.map((item, index) => {
        const className = index === props.selectedIndex
          ? 'provider-tabs__item active'
          : 'provider-tabs__item'

        return (
          <a
            href='#'
            className={ className }
            key={ `rule-item-${index}` }
            onClick={ handle(index) }
          >{ index + 1 }</a>
        )
      }) }

      <div className="provider-nav__add-rule">
        <button onClick={ () => props.addHandle() }>Добавить правило</button>
      </div>
    </div>
  )
}

RuleList.propTypes = {
  items: PropTypes.array,
  selectedIndex: PropTypes.number,
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

  static TAB_NAME = 'rules'

  state = {
    index: 0
  }

  componentWillReceiveProps (nextProps) {
    const currentLength = this.props.rules.length
    const nextLength = nextProps.rules.length

    if (currentLength !== nextLength) {
      this.setState({
        index: nextLength - 1
      })
    }
  }

  render () {
    const { entityCode, eventId, providerId } = this.props
    const { rules, add } = this.props
    const { index } = this.state
    const rule = rules[ index ]
    let detail = null

    if (rule) {
      detail = (
        <RuleDetail
          { ...rule }
          entityCode={ entityCode }
          eventId={ eventId }
          providerId={ providerId }
          ruleIndex={ index }
        />
      )
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
