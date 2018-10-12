import React from 'react'
import PropTypes from 'prop-types'

import './normalize.css'
import './index.css'

const Layout = ({ children }) => (
  <div>
    <div>{children}</div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node,
}
Layout.defaultProps = {
  children: null,
}

export default Layout
