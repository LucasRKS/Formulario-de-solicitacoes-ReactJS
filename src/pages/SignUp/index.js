import React, { useCallback, useRef } from 'react'
import { Form } from '@unform/web'
import { useHistory, Link } from 'react-router-dom'
import * as Yup from 'yup'

import Input from '../../components/Input'
import MoneyInput from '../../components/MoneyInput'
import MaskedInput from '../../components/MaskedInput'
import Select from '../../components/Select'
import Button from '../../components/Button'

export default function Home() {
  const history = useHistory()
  const formRef = useRef(null)

  const options = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'Não identificar', label: 'Não identificar' },
  ]

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape({
        nome: Yup.string().required('Informe seu nome'),
        cpf: Yup.string().required('Informe o seu cpf'),
        sexo: Yup.string().required('Informe seu sexo'),
        data_nasc: Yup.string().required('Informe sua data de nascimento'),
        email: Yup.string().required('Informe o seu e-mail'),
        celular: Yup.string().required('Informe o seu celular'),
        renda: Yup.string().required('Informe sua renda'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })

      formRef.current.setErrors({})

      const storageValue = localStorage.getItem('tipo_financiamento_ideall')

      let pushTo

      if (storageValue === 'imobiliario') {
        pushTo = '/tempo'
      } else {
        pushTo = '/finalidade'
      }

      history.push(pushTo)
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
          <h1>Preencha seus dados</h1>
        </div>
        <div className="col-md-12">
          <Input
            name="nome"
            type="text"
            label="Nome completo"
            placeholder="Informe o seu nome"
          />
        </div>
        <div className="col-md-12">
          <MaskedInput
            name="cpf"
            type="text"
            label="CPF"
            placeholder="Informe seu CPF"
            mask="999.999.999-99"
          />
        </div>
        <div className="col-md-12">
          <Select
            name="sexo"
            options={options}
            label="Sexo"
            placeholder="Selecione o sexo"
          />
        </div>
        <div className="col-md-12">
          <MaskedInput
            name="data_nasc"
            type="text"
            label="Data de nascimento"
            placeholder="Informe sua data de nascimento"
            mask="99/99/9999"
          />
        </div>
        <div className="col-md-12">
          <MaskedInput
            mask="(99) 99999-9999"
            name="celular"
            type="text"
            label="Celular"
            placeholder="Informe seu celular"
          />
        </div>
        <div className="col-md-12">
          <Input
            name="email"
            type="email"
            label="E-mail"
            placeholder="Informe o seu e-mail"
          />
        </div>
        <div className="col-md-12">
          <MoneyInput
            name="renda"
            type="text"
            label="Renda total"
            placeholder="Informe sua renda"
          />
        </div>
        <div className="col-md-6 mt-3 text-center">
          <Link to="/" className="btn btn-warning">
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
