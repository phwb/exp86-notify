import React, { PropTypes } from 'react'

const EventList = props => {
  const { items, onClick, selectedEventId } = props

  if (!items.length) {
    return null
  }

  return (
    <nav className="navbar notification-navbar">
      <ul>
        { items.map(item => {
          const { id, name } = item
          const className = selectedEventId === id
            ? 'active'
            : ''

          const handler = e => {
            onClick(id)
            e.preventDefault()
          }

          return (
            <li className={ className } key={ id } >
              <a href="#" onClick={ handler }>{ name }</a>
            </li>
          )}
        ) }
      </ul>
    </nav>
  )
}

EventList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string
  })),
  onClick: PropTypes.func,
  selectedEventId: PropTypes.number
}

export { EventList }
