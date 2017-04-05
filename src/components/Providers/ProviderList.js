import React, { PropTypes } from 'react'
import { ProviderDetail } from './ProviderDetail'

const style = {
  margin: '10px 0',
  border: '1px solid #000',
  padding: '2px 4px'
}

const ProviderTitle = props => {
  const handler = e => {
    props.onClick(props.id)
    e.preventDefault()
  }

  return (
    <div className="provider-item__title">
      { props.name } <a href="#" onClick={ handler }>Удалить</a>
    </div>
  )
}

ProviderTitle.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export const ProviderList = props => (
  <div className="provider-list">
    { props.items.map(item => (
      <div key={ item.id } className="provider-item" style={ style }>
        <ProviderTitle { ...item } onClick={ props.removeHandler }/>
        <ProviderDetail entityCode={ props.entityCode } eventId={ props.eventId } providerId={ item.id }/>
      </div>
    )) }
  </div>
)

ProviderList.propTypes = {
  items: PropTypes.array.isRequired,
  removeHandler: PropTypes.func.isRequired,
  entityCode: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired
}