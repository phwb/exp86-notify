import React, { PropTypes } from 'react'

const ProviderOption = props => (
  <option value={ props.code }>
    { props.name }
  </option>
)

ProviderOption.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export const ProviderSelect = props => (
  <select onChange={ e => props.onChange(e.target.value) }>
    <ProviderOption code='' name='не выбрано' />
    { props.items.map(item => <ProviderOption key={ item.code } { ...item } />) }
  </select>
)

ProviderSelect.propTypes = {
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}
