import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Template from '../Template'
import { Rules } from '../Rules'
import { addRule } from '../../actions/providersData'

export class ProviderDetail extends Component {
  state = {
    activeTab: Template.TAB_NAME
  }

  changeTab = tabName => () => {
    this.setState({
      activeTab: tabName
    })
  }

  render () {
    const {
      template, rules,
      entityCode, eventId, providerId, defaultLogic,
      addRule
    } = this.props
    const key = `${eventId}-${providerId}`
    const { activeTab } = this.state

    return (
      <div className="provider-tabs">
        <input
          className="provider-template__input"
          id={ `template-${key}` }
          name={ `tab-${key}` }
          type="radio"
          onChange={ this.changeTab(Template.TAB_NAME) }
          checked={ activeTab === Template.TAB_NAME }
        />
        <label htmlFor={ `template-${key}` }>Шаблон</label>
        <input
          className="provider-regulations__input"
          id={ `rules-${key}` }
          name={ `tab-${key}` }
          type="radio"
          onChange={ this.changeTab(Rules.TAB_NAME) }
          checked={ activeTab === Rules.TAB_NAME }
        />
        <label htmlFor={ `rules-${key}` }>Правила</label>
        <hr/>

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
      </div>
    )
  }
}

ProviderDetail.propTypes = {
  entityCode: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
  providerId: PropTypes.number.isRequired,
  defaultLogic: PropTypes.string,

  template: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string
  }),
  rules: PropTypes.array,

  addRule: PropTypes.func
}

const mapStateToProps = ({ dictionaries } ) => {
  const { logic } = dictionaries
  const defaultLogic = logic && logic.length > 0
    ? logic[0].code
    : ''

  return {
    defaultLogic
  }
}

const mapDispatchToProps = {
  addRule
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderDetail)