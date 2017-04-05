import React, { PropTypes } from 'react'

const Item = props => {
  const handler = e => {
    props.onClick(props.id)
    e.preventDefault()
  }

  return (
    <li>
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

const EventList = props => (
  <ul>
    { props.items.map(item => <Item key={ item.id } onClick={ props.onClick } { ...item } />) }
  </ul>
)

EventList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)),
  onClick: PropTypes.func
}

export { EventList }
