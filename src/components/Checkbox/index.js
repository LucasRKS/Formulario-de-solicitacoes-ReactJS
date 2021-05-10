/* eslint-disable no-param-reassign */
import { React, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'

export default function Checkbox({ name, value, label, ...rest }) {
  const inputRef = useRef()
  const { fieldName, defaultValue, registerField, error } = useField(name)

  const defaultChecked = defaultValue === value

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => ref.current.checked,
      clearValue: (ref) => {
        ref.current.checked = defaultChecked
      },
      setValue: (ref, val) => {
        ref.current.checked = val
      },
    })
  }, [defaultValue, fieldName, registerField, defaultChecked])

  return (
    <div className="form-check">
      <input
        defaultChecked={defaultChecked}
        ref={inputRef}
        value={value}
        type="checkbox"
        id={fieldName}
        className="form-check-input"
        {...rest}
      />
      <label className="form-check-label" htmlFor={fieldName} key={fieldName}>
        {label}
      </label>
      {error && (
        <div className="row" aria-labelledby={name}>
          <div className="col-md-12">
            <small className="text-danger">{error}</small>
          </div>
        </div>
      )}
    </div>
  )
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}
