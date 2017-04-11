import React, { PropTypes } from 'react'
import Select from 'react-select'

export const Assertions = props => {
  const { items, change, values } = props
  const options = items.map(item => ({
    value: item.code,
    label: item.name
  }))

  const changeHandler = values => {
    const mapValues = values.map(value => value.value)
    change(mapValues)
  }

  return (
    <div className="form_default_item">
      <div className="form_default_title">Утверждение</div>
      <div className="form_default_input">
        <Select
          className="CustomSelect"
          options={ options }
          value={ values }
          onChange={ val => changeHandler(val) }
          multi={ true }
          placeholder="Выберите утверждение..."
        />
      </div>
    </div>
  )
}

Assertions.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string
  })),
  values: PropTypes.arrayOf(PropTypes.string),
  change: PropTypes.func
}