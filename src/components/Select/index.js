import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import { useField } from '@unform/core'

export default function Select({ name, label, ...rest }) {
  const selectRef = useRef(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return []
          }
          return ref.state.value.map((option) => option.value)
        }
        if (!ref.state.value) {
          return ''
        }
        return ref.state.value.value
      },
    })
  }, [fieldName, registerField, rest.isMulti])

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
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

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
}

Select.defaultProps = {
  label: null,
}
