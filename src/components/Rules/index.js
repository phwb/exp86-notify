import React, { Component, PropTypes } from 'react'
// import { connect } from 'react-redux'

const RuleDetail = props => (
  <div style={{ margin: '10px 30px', border: '1px solid #000', padding: '10px' }}>
    <select>
      <option value="1">Assert 1</option>
      <option value="2">Assert 2</option>
      <option value="3">Assert 3</option>
    </select>
    <br/>
    <label><input type="radio" name="radio1"/> OR</label>
    <label><input type="radio" name="radio1"/> AND</label>
    <br/>
    <input type="text" placeholder="Consumer"/>
  </div>
)

const RuleItem = props => {
  const handle = e => {
    props.onClick(props.id)
    e.preventDefault()
  }

  return (
    <span style={{ margin: '0 3px' }}>
      <a href='#' onClick={ handle }>{ props.name }</a>
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
    rules: PropTypes.array
  }

  static defaultProps = {
    rules: []
  }

  state = {
    rules: this.props.rules,
    index: 0
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      rules: nextProps.rules
    })
  }

  toJSON () {
    console.log(this.state.rules)
  }

  add () {
    const { rules } = this.state
    const newRules = [
      ...rules,
      {
        name: `${rules.length + 1}`
      }
    ]

    this.setState({
      rules: newRules,
      index: newRules.length - 1
    })
  }

  render () {
    const { index, rules } = this.state
    const rule = rules[ index ]

    const handle = e => {
      this.add()
      e.preventDefault()
    }

    return (
      <div style={{ marginTop: '10px' }}>
        <div>Rules</div>
        <div style={{ marginLeft: '20px' }}>
          <RuleList items={ rules } changeHandle={ index => this.setState({ index }) }/>
          <a href="#" onClick={ handle }>+ Add rule</a>
        </div>
        <RuleDetail { ...rule }/>
      </div>
    )
  }
}
