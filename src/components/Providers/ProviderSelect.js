import React, { PropTypes } from 'react'
import Select from 'react-select'

export const ProviderSelect = props => (
  <Select
    className="CustomSelect"
    options={ props.items.map(item => ({
      label: item.name,
      value: item.code
    })) }
    onChange={ val => props.onChange(val.value) }
    placeholder="Выберите провайдер..."
  />
)

ProviderSelect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string
  })).isRequired,
  onChange: PropTypes.func.isRequired
}
