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

  function formatarMoeda() {
    const elemento = inputRef.current
    let valor = elemento.value

    valor += ''
    // eslint-disable-next-line radix
    valor = parseInt(valor.replace(/[\D]+/g, ''))
    valor += ''
    valor = valor.replace(/([0-9]{2})$/g, ',$1')

    if (valor.length > 6) {
      valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
    }

    elemento.value = valor
    if (valor === 'NaN') elemento.value = ''
  }

  return (
    <div className="form-group">
      {label && <label htmlFor={inputId || name}>{label}</label>}
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            R$
          </span>
        </div>
        <input
          ref={inputRef}
          defaultValue={defaultValue}
          className={`form-control ${className}`}
          id={inputId || name}
          onKeyUp={formatarMoeda}
          {...rest}
        />
      </div>
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
