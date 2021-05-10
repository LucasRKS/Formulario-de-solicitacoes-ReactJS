/* eslint-disable react/prop-types */
import React from 'react'

import { Route as ReactDOMRoute } from 'react-router-dom'

export default function Route({ component: Component, ...rest }) {
  return <ReactDOMRoute {...rest} render={() => <Component />} />
}
