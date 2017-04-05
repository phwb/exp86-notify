import React, { Component, PropTypes } from 'react'

export class Template extends Component {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.string
  }

  state = { ...this.props }

  componentWillReceiveProps (nextProps) {
    this.setState({ ...nextProps })
  }

  handle = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })

    e.preventDefault()
  }

  render () {
    const { title, body } = this.state

    return (
      <div style={{ marginTop: '10px' }}>
        <div>Template</div>
        <div style={{ marginLeft: '20px' }}>
          <div>
            <label>
              Title<br/>
              <input
                type='text'
                name='title'
                value={ title }
                onChange={ this.handle }
                ref={ input => this.title = input }
              />
            </label>
          </div>
          <div>
            <label>
              Body<br/>
              <textarea
                name='body'
                value={ body }
                onChange={ this.handle }
                ref={ input => this.body = input }
              />
            </label>
          </div>
        </div>
      </div>
    )
  }
}
