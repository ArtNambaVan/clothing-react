import React from 'react'
import { connect } from 'react-redux'
import './page-wrapper.styles.scss'

import { toggleCartHidden } from '../../redux/cart/cart.actions'

const PageWrapper = ({hidden, toggleCartHidden}) => {
    return (<div onClick={toggleCartHidden} className="page-wrapper" style={hidden ? {display: 'none'} : {display: 'block'}}>
    </div>
)
}

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(
    null,
    mapDispatchToProps
)(PageWrapper);
