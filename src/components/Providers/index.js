import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ProviderSelect } from './ProviderSelect'
import ProviderList from './ProviderList'
import { load, register } from '../../actions/providers'

export class Providers extends Component {
  static propTypes = {
    entityCode: PropTypes.string,
    eventId: PropTypes.number,
    items: PropTypes.array,
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
    const { items, loading, eventId: nextEventId } = nextProps

    // обновляемся в случае смены события (клик по списку событий)
    if (nextEventId !== eventId) {
      return load(entityCode, nextEventId)
    }

    // обновляемся в случае сохранения или удаления продайера
    if (!items.length && loading === false) {
      return load(entityCode, nextEventId)
    }
  }

  render () {
    const {
      entityCode, eventId, items, loading,
      register
    } = this.props

    if (!items.length && loading === false) {
      return null
    }

    if (loading) {
      return <div><em>Загрузка списка провайдеров...</em></div>
    }

    const registered = items.filter(items => items.id > 0)

    return (
      <div className="providers">
        <div className="form_default_item">
          <div className="form_default_title">Добавить провайдера</div>
          <div className="form_default_input">
            <ProviderSelect
              items={ items }
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
  items: providers.items,
  loading: providers.loading
})

const mapDispatchToProps = {
  load,
  register
}

export default connect(mapStateToProps, mapDispatchToProps)(Providers)