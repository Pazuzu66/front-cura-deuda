import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Navbar } from '../components/nav/Navbar'
import { useForm } from '../hooks/useForm'
import Swal from 'sweetalert2'

export default function Home() { 
  const handleSubmit = (e) => {
      e.preventDefault()
      axios.post('http://127.0.0.1:8000/estado',{
          estado: estado
      })
      .then((response) => {
          Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.data,
              showConfirmButton: false,
              timer: 1500
            })
      })
      .catch((e) => {
          Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: `${e.response.data} 
              Status: ${e.response.status}`,
              showConfirmButton: false,
              timer: 1500
            })
      })
  }

  const handleSubmitQuery = (e) => {
      e.preventDefault()
      axios.post('http://127.0.0.1:8000/buscaestadonombre',{
          estado: query
      })
      .then(({data}) => {
          console.log(data[0])
          Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Estado Encontrado',
              text: `Estado: ${data[0].estado} con id: ${data[0].idEstado}`,                
              showConfirmButton: true,                
            })
      })
      .catch((e) => {
          Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: `${e.response.data} 
              Status: ${e.response.status}`,
              showConfirmButton: false,
              timer: 1500
            })
      })
  }

const [estado_data, setestado_data] = useState([])

useEffect(() => {
    axios.get('http://127.0.0.1:8000/estado')
      .then(({data}) => {
        setestado_data(data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [handleSubmit])

  const [formValues,handleInputchange] = useForm({
    estado: '',
    query: ''
  })
  const { estado, query } = formValues

  return (            
    <div>
        <Navbar/>
        <h1>Estados</h1>            
            <form onSubmit={handleSubmit} className='space-x-4'>
                <label>Estado</label>
                <input 
                    className='border-2 border-black'
                    type='text' 
                    value={estado}
                    name='estado'
                    onChange={handleInputchange}                        
                 />
                 <button className='mt-3 p-2 rounded-md bg-emerald-400' type='submit'>Agregar</button>
            </form>
            <hr/>
        <form onSubmit={handleSubmitQuery}>
            <label>Buscar por Estado</label>
                <input 
                    className='border-2 border-black'
                    type='text' 
                    value={query}
                    name='query'
                    onChange={handleInputchange}                        
                 />
                 <button className='my-3 p-2 rounded-md bg-emerald-400' type='submit'>Buscar</button>
        </form>
        <hr/>
        <table className="table-auto overflow-scroll min-w-full">
            <thead>
                <tr>
                    <th>Id Estado</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {
                    estado_data.length >0 && 
                    estado_data.map( ( estado ) => (
                        <tr key={estado.idEstado}>
                            <td className='text-center'>{estado.idEstado}</td>
                            <td className='text-center'>{estado.estado}</td>
                        </tr>   
                    ))
                }                                     
            </tbody>
        </table>
    </div>
)
}
