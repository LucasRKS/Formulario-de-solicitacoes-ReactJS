import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'

export default function MoneyInput({
  name,
  className,
  label,
  inputId,
  ...rest
}) {
  const inputRef = useRef(null)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value)
      },
    })
  }, [fieldName, registerField])

  return (
    <div className="form-group">
      {label && <label htmlFor={inputId || name}>{label}</label>}
      <input
        ref={inputRef}
        id={inputId || name}
        defaultValue={defaultValue}
        className={`form-control ${className}`}
        {...rest}
      />
      {error && (
        <div className="row" aria-labelledby={inputId || name}>
          <div className="col-md-12">
            <small className="text-danger">{error}</small>
          </div>
        </div>
      )}
    </div>
  )
}

MoneyInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  inputId: PropTypes.string,
  className: PropTypes.string,
}

MoneyInput.defaultProps = {
  className: '',
  label: null,
  inputId: null,
}
