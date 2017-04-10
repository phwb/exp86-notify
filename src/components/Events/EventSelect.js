import React, { PropTypes } from 'react'

const EventOption = props => (
  <option value={ props.code }>
    { props.name }
  </option>
)

EventOption.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired
}

const EventSelect = props => (
  <select onChange={ event => props.onChange(event.target.value) }>
    <EventOption code='' name='не выбрано' />
    { props.items.map(item => <EventOption key={ item.code } { ...item } />) }
  </select>
)

EventSelect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(EventOption.propTypes)),
  onChange: PropTypes.func.isRequired
}

export { EventSelect }
