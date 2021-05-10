import React from 'react'
import { Link } from 'react-router-dom'

export default function TimeToBuyHome() {
  return (
    <div className="row">
      <div className="col-md-12 mb-5 text-center">
        <h1>Resultados</h1>
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Banco</th>
            <th scope="col">Renda mínima</th>
            <th scope="col">Tipo</th>
            <th scope="col">Primeira parcela</th>
            <th scope="col">Prazo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Itau</td>
            <td>R$ 35.000,60</td>
            <td>SAC</td>
            <td>R$ 1.000</td>
            <td>360</td>
          </tr>
          <tr>
            <td>Santander</td>
            <td>R$ 13.000,60</td>
            <td>SAC</td>
            <td>R$ 8.000</td>
            <td>360</td>
          </tr>
          <tr>
            <td>Bradesco</td>
            <td>R$ 17.000,60</td>
            <td>SAC</td>
            <td>R$ 3.000</td>
            <td>360</td>
          </tr>
          <tr>
            <td>Sicoob</td>
            <td>R$ 10.000,60</td>
            <td>SAC</td>
            <td>R$ 5.050</td>
            <td>360</td>
          </tr>
        </tbody>
      </table>
      <div className="col-md-12 mt-3 text-center">
        <Link to="/" className="btn btn-primary">
          REFAZER
        </Link>
      </div>
    </div>
  )
}
