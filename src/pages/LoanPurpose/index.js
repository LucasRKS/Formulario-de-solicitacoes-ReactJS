import React, { useCallback, useRef } from 'react'
import { Form } from '@unform/web'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import Checkbox from '../../components/Checkbox'
import Button from '../../components/Button'

export default function TimeToBuyHome() {
  const history = useHistory()
  const formRef = useRef(null)

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current.setErrors({})

      const storage = JSON.parse(localStorage.getItem('dados_ideall'))
      const newStorage = { ...storage, ...data }

      localStorage.setItem('dados_ideall', JSON.stringify(newStorage))

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

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12 mb-5 text-center">
          <h1>Finalidade do empréstimo</h1>
        </div>
        <div className="col-6">
          <Checkbox
            name="finalidade_dividas"
            value="dividas"
            label="Pagar dívidas"
          />
        </div>
        <div className="col-6">
          <Checkbox
            name="finalidade_bens"
            value="adiquirir bens"
            label="Adiquirir bens"
          />
        </div>
        <div className="col-6">
          <Checkbox
            name="finalidade_estudos"
            value="estudos"
            label="Pagar estudos"
          />
        </div>
        <div className="col-6">
          <Checkbox
            name="finalidade_investir"
            value="investir"
            label="Investir"
          />
        </div>
        <div className="col-6">
          <Checkbox
            name="finalidade_reformar"
            value="reformar"
            label="Reformar a casa"
          />
        </div>
        <div className="col-6" />

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
