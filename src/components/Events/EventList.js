import React, { PropTypes } from 'react'

const Item = props => {
  const handler = e => {
    props.onClick(props.id)
    e.preventDefault()
  }

  const className = props.selected
    ? 'active'
    : ''

  return (
    <li className={ className }>
      <a href="#" onClick={ handler }>
        { props.name }
      </a>
    </li>
  )
}

Item.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired
}

const EventList = props => {
  const { items, onClick, selectedEventId } = props

  if (!items.length) {
    return null
  }

  return (
    <nav className="navbar notification-navbar">
      <ul>
        { items.map(item => (
          <Item
            key={ item.id }
            onClick={ onClick }
            selected={ selectedEventId === item.id }
            { ...item }
          />
        )) }
      </ul>
    </nav>
  )
}

EventList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)),
  onClick: PropTypes.func
}

export { EventList }
