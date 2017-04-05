import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ProviderSelect } from './ProviderSelect'
import { ProviderList } from './ProviderList'
import { load, register, unregister } from '../../actions/providers'

export class Providers extends Component {
  static propTypes = {
    entityCode: PropTypes.string,
    eventId: PropTypes.number,
    available: PropTypes.array,
    registered: PropTypes.array,
    loading: PropTypes.bool,
    save: PropTypes.func,
    load: PropTypes.func
  }

  componentDidMount () {
    const { load, entityCode, eventId } = this.props
    load(entityCode, eventId)
  }

  componentWillReceiveProps (nextProps) {
    const { load, entityCode, eventId } = this.props
    const { available, registered, loading } = nextProps
    const items = available.concat(registered)

    // обновляемся в случае смены события (клик по списку событий)
    if (nextProps.eventId !== eventId) {
      return load(entityCode, nextProps.eventId)
    }

    // обновляемся в случае сохранения или удаления продайера
    if (!items.length && loading === false) {
      return load(entityCode, nextProps.eventId)
    }
  }

  render () {
    const {
      entityCode, eventId,
      available, registered, loading,
      save, remove
    } = this.props
    const items = available.concat(registered)

    if (!items.length && loading === false) {
      return null
    }

    if (loading) {
      return <div>Loading providers...</div>
    }

    return (
      <div className="providers">
        <ProviderSelect items={ available } onChange={ providerCode => save(entityCode, eventId, providerCode) }/>
        <ProviderList
          items={ registered }
          removeHandler={ providerId => remove(entityCode, eventId, providerId) }
          entityCode={ entityCode }
          eventId={ eventId }
        />
      </div>
    )
  }
}

const mapStateToProps = ({ providers }) => ({
  registered: providers.registered,
  available: providers.available,
  loading: providers.loading
})

const mapDispatchToProps = {
  load,
  save: register,
  remove: unregister
}

export default connect(mapStateToProps, mapDispatchToProps)(Providers)