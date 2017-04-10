import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ProviderDetail from './ProviderDetail'
import { unregister, update } from '../../actions/providers'

const ProviderTitle = props => {
  const { name, remove, save } = props

  const removeHandler = e => {
    remove()
    e.preventDefault()
  }

  const saveHandler = e => {
    save()
    e.preventDefault()
  }

  return (
    <div className="provider-header">
      <div className="provider-name">
        { name }
      </div>
      <div className="provider-nav">
        <div className="provider-nav__submit">
          <button onClick={ saveHandler }>Сохранить</button>
        </div>
        <div className="provider-nav__remove" onClick={ removeHandler } title="Удалить провайдер">
          <span className="icon-remove"/>
        </div>
      </div>
    </div>
  )
}

ProviderTitle.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired
}

export const ProviderList = props => {
  const {
    items, entityCode, eventId, data,
    unregister, update
  } = props

  if (!items.length) {
    return null
  }

  return (
    <div>
      { items.map(provider => {
        const { id } = provider
        const { template, rules } = data[ id ]

        return (
          <div key={ id } className="provider">
            <ProviderTitle
              { ...provider }
              remove={ providerId => unregister(entityCode, eventId, id) }
              save={ providerId => update(entityCode, eventId, id, {
                template,
                rules
              }) }
            />
            <ProviderDetail
              entityCode={ entityCode }
              eventId={ eventId }
              providerId={ id }
              template={ template }
              rules={ rules }
            />
          </div>
        )
      }) }
    </div>
  )
}

ProviderList.propTypes = {
  items: PropTypes.array.isRequired,
  entityCode: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
  unregister: PropTypes.func,
  update: PropTypes.func
}

const mapStateToProps = state => ({
  data: state.providers.data
})

const mapDispatchToProps = {
  unregister,
  update
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderList)