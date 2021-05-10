import React, { useCallback, useRef } from 'react'
import { Form } from '@unform/web'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import Radio from '../../components/Radio'
import Button from '../../components/Button'

export default function TimeToBuyHome() {
  const history = useHistory()
  const formRef = useRef(null)

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        tempo_pagamento: Yup.string().required(
          'Selecione o tempo de pagamento'
        ),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      history.push('/resultado')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {}

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message
        })

        formRef.current.setErrors(errorMessages)
      }
    }
  })

  const radioOptions = [
    { id: '1mes', value: '1', label: 'Em até 1 mês' },
    { id: '1_3mes', value: '1-3', label: 'De 1 a 3 meses' },
    { id: '3_6mes', value: '3-6', label: 'De 3 a 6 meses' },
    { id: '6mes', value: '6', label: '  Mais de 6 meses' },
    { id: 'notdefined', value: 'notdefined', label: 'Ainda não defini' },
  ]

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12 mb-5 text-center">
          <h1>Em quanto tempo pretente pagar o imóvel?</h1>
        </div>
        <div className="col-12">
          <div className="form-check">
            <Radio name="tempo_pagamento" options={radioOptions} />
          </div>
        </div>
        <div className="col-md-6 mt-3 text-center">
          <Link to="/cadastro" className="btn btn-warning">
            VOLTAR
          </Link>
        </div>
        <div className="col-md-6 mt-3 text-center">
          <Button btnType="submit" btnClassType="primary">
            CONTINUAR
          </Button>
        </div>
      </div>
    </Form>
  )
}
