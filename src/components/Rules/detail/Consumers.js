import React, { PropTypes } from 'react'

export const Consumers = props => {
  const {
    id, items, dictionaries,
    update, remove
  } = props

  if (!items.length) {
    return null
  }

  const handler = i => e => {
    remove(i)
    e.preventDefault()
  }

  return (
    <div className="form_default_item mb-5">
      <div className="form_default_title">Получатели</div>
      { items.map((name, i) => (
        <div key={ `${id}-${i}` } className="form_default_input cleaner mb-5">
          <input
            type="text"
            value={ name }
            onChange={ e => update(i, e.target.value) }
          />
          <div className="cleaner-remove" onClick={ handler(i) }>
            <span className="icon-remove"/>
          </div>
          <br/>
        </div>
      )) }
      <div className="form_default_item" style={{ marginTop: '20px' }}>
        <div className="form_default_title">Доступные константы</div>
        { dictionaries.map((item, i) => (
          <div className="form_default_option" key={ `dictionaries-${i}` }>
            <strong>{ item.code }</strong> — { item.value }
          </div>
        )) }
      </div>
    </div>
  )
}

Consumers.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  update: PropTypes.func,
  remove: PropTypes.func,
  id: PropTypes.string,
  dictionaries: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    value: PropTypes.string
  }))
}