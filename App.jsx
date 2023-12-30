import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./style.css"
import api from './Service/api'

function App() {

  const [input, setInput] = useState("")
  const [cep, setCep] = useState({}) // para renderizar na tela 

  async function handlesearch (){

    if (input === ""){

      alert(" Preencha algum cep!!")

      return; // aqui o return faz parar a execução do nosso codigo 
    }

    try {

      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")

    } catch {

      alert("Erro ao buscar cep!")
      setInput("")

    }
  }

  return ( 
    
      <div className='container'>

       <h1 className='title'>Buscar CEP</h1> 

       <div className='containerInput'>

         <input type="text" value={input} onChange={(event)=> setInput(event.target.value)} placeholder='Digite seu cep...'/>

         <button onClick={(handlesearch)}> Search</button>

       </div>

       {Object.keys(cep).length > 0 && (
        // Verificando se tem alguma coisa  dentro do objecto

       <main className='main'>

         <h2>CEP: {cep.cep}</h2>

         <span>{cep.logradouro}</span>
         <span>{cep.complemento}</span>
         <span>{cep.bairro}</span>
         <span>{cep.localidade}-{cep.uf}</span>

        </main>

       )}

      </div>
      
  )
}

export default App;
