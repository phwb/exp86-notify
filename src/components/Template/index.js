import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateTemplate } from '../../actions/providers'

export const Template = props => {
  const {
    title, body, providerId,
    update
  } = props

  const handle = name => e => {
    update(providerId, {
      [ name ]: e.target.value
    })
    e.preventDefault()
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <div>---------- Template ----------</div>
      <div style={{ marginLeft: '20px' }}>
        <div>
          <label>
            Title<br/>
            <input
              type='text'
              value={ title }
              onChange={ handle('title') }
            />
          </label>
        </div>
        <div>
          <label>
            Body<br/>
            <textarea
              value={ body }
              onChange={ handle('body') }
            />
          </label>
        </div>
      </div>
    </div>
  )
}

Template.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  providerId: PropTypes.number,
  update: PropTypes.func
}

const mapDispatchToProps = {
  update: updateTemplate
}

export default connect(null, mapDispatchToProps)(Template)