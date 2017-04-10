import React, { PropTypes } from 'react'

export const Logic = props => {
  const { items, value, change } = props

  const changeHandler = e => change(e.target.value)

  return (
    <div className="form_default_item">
      <div className="form_default_title">Логика</div>
      <div className="form_default_input">
        { items.map((item, i) => (
          <div className="form_default_radio" key={ `logic-${i}` }>
            <input
              id={ `logic-${i}` }
              type="radio"
              checked={ item.code === value }
              value={ item.code }
              onChange={ changeHandler }
            />
            <label htmlFor={ `logic-${i}` }>
              { item.name }
            </label>
          </div>
        )) }
      </div>
    </div>
  )
}

Logic.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string
  })).isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired
}