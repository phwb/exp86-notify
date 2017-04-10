import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectedSection } from '../../actions/selectedSection'
import { load } from '../../actions/events'

const Item = props => {
  const handler = e => {
    props.onClick(props.code)
    e.preventDefault()
  }

  return (
    <li className="notification-menu__item">
      <a href="#" onClick={ handler }>
        { props.name }
      </a>
    </li>
  )
}

Item.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

const List = props => (
  <ul className="notification-menu">
    { props.items.map(item => <Item key={ item.code } { ...item } onClick={ props.onClick }/>) }
  </ul>
)

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)),
  onClick: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  items: state.sections.items
})

const mapDispatchToProps = dispatch => ({
  onClick: value => {
    dispatch(selectedSection(value))
    dispatch(load(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
