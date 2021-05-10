import React, { useState, useCallback, useRef } from 'react'
import { Form } from '@unform/web'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import MoneyInput from '../../components/MoneyInput'
import Select from '../../components/Select'
import Button from '../../components/Button'

export default function Home() {
  const history = useHistory()

  const formRef = useRef(null)

  const [tipoFinanciamentoCredito, setHideTipoFinanciamentoCredito] = useState(
    false
  )

  const options = [
    { value: 'imobiliario', label: 'Financiamento imobiliário' },
    { value: 'credito', label: 'Crédito com garantia imobiliária' },
  ]

  const handleSelectFinanciamento = useCallback((e) => {
    const selectedOption = e.value

    formRef.current.setErrors({})

    localStorage.setItem('tipo_financiamento_ideall', selectedOption)

    if (selectedOption === 'imobiliario') {
      setHideTipoFinanciamentoCredito(false)
    } else {
      setHideTipoFinanciamentoCredito(true)
    }
  })

  const handleSubmit = useCallback(async (data) => {
    if (tipoFinanciamentoCredito) {
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          tipo_financiamento: Yup.string().required(
            'Selecione o tipo de financiamento'
          ),
          valor_imovel: Yup.string().required('Informe o valor do imóvel'),
          valor_solicitado: Yup.string().required('Informe o valor da entrada'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        history.push('/cadastro')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errorMessages = {}

          err.inner.forEach((error) => {
            errorMessages[error.path] = error.message
          })

          formRef.current.setErrors(errorMessages)
        }
      }
    } else {
      try {
        const schema = Yup.object().shape({
          tipo_financiamento: Yup.string().required(
            'Selecione o tipo de financiamento'
          ),
          valor_imovel: Yup.string().required('Informe o valor do imóvel'),
          valor_entrada: Yup.string().required('Informe o valor da entrada'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        formRef.current.setErrors({})

        history.push('/cadastro')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errorMessages = {}

          err.inner.forEach((error) => {
            errorMessages[error.path] = error.message
          })

          formRef.current.setErrors(errorMessages)
        }
      }
    }
  })

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12 mb-5 text-center">
          <h1>Simule seu crédito</h1>
        </div>
        <div className="col-md-12">
          <Select
            name="tipo_financiamento"
            options={options}
            onChange={handleSelectFinanciamento}
            label="Tipo de financiamento"
            placeholder="Selecione o tipo de financiamento"
          />
        </div>
        <div className="col-md-12">
          <MoneyInput
            name="valor_imovel"
            type="text"
            label="Valor do imóvel"
            inputId="valor_imovel"
            placeholder="Informe o valor do imóvel"
          />
        </div>
        <div className={`col-md-12 ${tipoFinanciamentoCredito && 'd-none'}`}>
          <MoneyInput
            name="valor_entrada"
            type="text"
            label="Valor da entrada"
            inputId="valor_entrada"
            placeholder="Informe o valor da entrada"
          />
        </div>
        <div className="col-md-12">
          <MoneyInput
            name="valor_solicitado"
            type="text"
            placeholder="Informe o valor que necessita"
            label="Valor necessário"
            inputId="valor_solicitado"
            disabled={!tipoFinanciamentoCredito}
          />
        </div>
        <div className="col-md-12 mt-3 text-center">
          <Button btnType="submit" btnClassType="primary">
            CONTINUAR
          </Button>
        </div>
      </div>
    </Form>
  )
}
