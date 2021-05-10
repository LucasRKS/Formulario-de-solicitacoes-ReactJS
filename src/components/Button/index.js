import React from 'react'

import PropTypes from 'prop-types'

export default function Button({
  children,
  className,
  btnClassType,
  btnType,
  ...rest
}) {
  return (
    <button
      type={btnType === 'submit' ? 'submit' : 'button'}
      className={`btn btn-${btnClassType} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  btnType: PropTypes.string.isRequired,
  children: PropTypes.string,
  className: PropTypes.string,
  btnClassType: PropTypes.string,
}

Button.defaultProps = {
  className: '',
  children: '',
  btnClassType: 'primary',
}
