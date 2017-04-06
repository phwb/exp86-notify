import React, { Component, PropTypes } from 'react'
import RuleDetail from './RuleDetail'

const style = {
  display: 'inline-block',
  padding: '2px 8px',
  border: '1px solid #000',
  borderRadius: '50%',
  margin: '0 3px'
}

const RuleItem = props => {
  const handle = e => {
    props.onClick(props.id)
    e.preventDefault()
  }

  return (
    <span>
      <a href='#' style={ style } onClick={ handle }>{ props.name }</a>
    </span>
  )
}

const RuleList = props => (
  <div>
    { props.items.map((item, index) => (
      <RuleItem
        key={ index }
        name={ index + 1 }
        { ...item }
        onClick={ () => props.changeHandle(index) }
      />
    )) }
  </div>
)

RuleList.propTypes = {
  items: PropTypes.array,
  changeHandle: PropTypes.func
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

    const addHandle = e => {
      add()
      e.preventDefault()
    }

    return (
      <div style={{ marginTop: '10px' }}>
        <div>---------- Rules ----------</div>
        <div style={{ marginLeft: '20px' }}>
          <RuleList items={ rules } changeHandle={ index => this.setState({ index }) }/>
          <a href="#" onClick={ addHandle }>+ Add rule</a>
        </div>
        { rule
          ? <RuleDetail
            { ...rule }
            entityCode={ entityCode }
            eventId={ eventId }
            providerId={ providerId }
            ruleIndex={ index }
          />
          : null }
      </div>
    )
  }
}
