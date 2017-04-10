import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateTemplate } from '../../actions/providers'

export const Template = props => {
  const {
    title, body, providerId, templates,
    update
  } = props

  const handle = name => e => {
    update(providerId, {
      [ name ]: e.target.value
    })
    e.preventDefault()
  }

  return (
    <section className="provider-template">
      <div className="form_default_item">
        <div className="form_default_title">Заголовок</div>
        <input type='text' value={ title } onChange={ handle('title') }/>
      </div>
      <div className="contacts_form_item">
        <div className="form_default_title">Тело</div>
        <textarea value={ body } onChange={ handle('body') }/>
      </div>
      <div className="form_default_item">
        <div className="form_default_title">Доступные константы</div>
        { templates.map((item, i) => (
          <div className="form_default_option" key={ `template-${i}` }>
            <strong>{ item.code }</strong> - { item.value }
          </div>
        )) }
      </div>
    </section>
  )
}

Template.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  providerId: PropTypes.number,
  update: PropTypes.func
}

const mapStateToProps = ({ events }) => ({
  templates: events.templates
})

const mapDispatchToProps = {
  update: updateTemplate
}

export default connect(mapStateToProps, mapDispatchToProps)(Template)