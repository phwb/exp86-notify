import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { load as loadDictionaries } from '../../actions/dictionaries'
import { load as loadSections } from '../../actions/sections'
import Sections from '../Sections'
import Events from '../Events'

export class App extends Component {
  static propTypes = {
    loadDictionaries: PropTypes.func,
    loadSections: PropTypes.func,
    loading: PropTypes.bool
  }

  componentDidMount () {
    this.props.loadDictionaries()
    this.props.loadSections()
  }

  render () {
    const { loading } = this.props

    if (loading) {
      return <div>Global loading...</div>
    }

    return (
      <div className="App">
        <h1>Настройка уведомлений</h1>
        <Sections/>
        <hr/>
        <Events/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.dictionaries.loading || state.sections.loading
})

const mapDispatchToProps = {
  loadDictionaries,
  loadSections
}

export default connect(mapStateToProps, mapDispatchToProps)(App)