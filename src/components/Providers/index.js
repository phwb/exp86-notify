import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ProviderSelect } from './ProviderSelect'
import ProviderList from './ProviderList'
import { load, register } from '../../actions/providers'

export class Providers extends Component {
  static propTypes = {
    entityCode: PropTypes.string,
    eventId: PropTypes.number,
    available: PropTypes.array,
    registered: PropTypes.array,
    loading: PropTypes.bool,
    load: PropTypes.func,
    register: PropTypes.func
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
      register
    } = this.props
    const items = available.concat(registered)

    if (!items.length && loading === false) {
      return null
    }

    if (loading) {
      return <div><em>Загрузка списка провайдеров...</em></div>
    }

    return (
      <div className="providers">
        <div className="form_default_item">
          <div className="form_default_title">Добавить провайдера</div>
          <div className="form_default_input">
            <ProviderSelect
              items={ available }
              onChange={ providerCode => register(entityCode, eventId, providerCode) }
            />
          </div>
        </div>

        <ProviderList
          items={ registered }
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
  register
}

export default connect(mapStateToProps, mapDispatchToProps)(Providers)