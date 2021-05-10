import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background-color: #485461;

    @media(min-width: 780px){
      padding: 10px !important;
    }

    @media(max-width: 780px){
      padding: 10px !important;
    }
  }

  body, input, button {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
  }

  button {
    cursor: pointer;
  }

  #main-container {
    padding: 20px;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

    @media(min-width: 780px){
      max-width: 50%;
    }
  }
`
