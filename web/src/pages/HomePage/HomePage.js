import PainCell from 'src/components/PainCell'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 60px auto;
    background-color: #111;
    color: #eee;
    font-family: Creepster, sans-serif;
    max-width: 1200px;
    padding: 20px;
    text-align: center;
  }

  @media (min-width: 900px) {
    body {
      margin: 120px auto 0;
    }
  }
`

const HomePage = () => {
  return (
    <>
      <GlobalStyle />
      <PainCell />
    </>
  )
}

export default HomePage
