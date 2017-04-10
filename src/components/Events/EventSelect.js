import React, { PropTypes } from 'react'
import Select from 'react-select'

const EventSelect = props => (
  <Select
    className="CustomSelect"
    options={ props.items.map(item => ({
      label: item.name,
      value: item.code
    })) }
    onChange={ val => props.onChange(val.value) }
    placeholder="Выберите событие..."
  />
)

EventSelect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired
  })),
  onChange: PropTypes.func.isRequired
}

export { EventSelect }
