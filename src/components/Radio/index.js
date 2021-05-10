import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useField } from '@unform/core'

export default function Radio({ name, options, ...rest }) {
  const inputRefs = useRef([])
  const { fieldName, registerField, defaultValue = '', error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs,
      getValue: (refs) => refs.current.find((input) => input?.checked)?.value,
      setValue: (refs, id) => {
        const inputRef = refs.current.find((ref) => ref.id === id)
        if (inputRef) inputRef.checked = true
      },
      clearValue: (refs) => {
        const inputRef = refs.current.find((ref) => ref.checked === true)
        if (inputRef) inputRef.checked = false
      },
    })
  }, [fieldName, registerField])

  return (
    <>
      {options.map((option, index) => (
        <div className="col-12" key={option.id}>
          <input
            type="radio"
            ref={(ref) => {
              inputRefs.current[index] = ref
            }}
            id={option.id}
            name={name}
            defaultChecked={defaultValue.includes(option.id)}
            value={option.value}
            className="form-check-input"
            {...rest}
          />
          <label
            className="form-check-label"
            htmlFor={option.id}
            key={option.id}
          >
            {option.label}
          </label>
        </div>
      ))}
      {error && (
        <div className="row" aria-labelledby={name}>
          <div className="col-md-12">
            <small className="text-danger">{error}</small>
          </div>
        </div>
      )}
    </>
  )
}

Radio.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
}
