import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/nav/Navbar'
import axios from 'axios'
import { useForm } from '../hooks/useForm'
import Swal from 'sweetalert2'

export const municipios = () => {
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/municipio',{
            municipio: municipio,
            idEstado: idEstado
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
        axios.post('http://127.0.0.1:8000/buscamunicipionombre',{
            municipio: query
        })
        .then(({data}) => {
            console.log(data[0])
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Municipio Encontrado',
                text: `Municipio: ${data[0].municipio} con id: ${data[0].idMunicipio},
                 perteneciente al id estado ${data[0].idEstado}`,                
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

  const [municipios_data, setmunicipios_data] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/municipio')
          .then(({data}) => {
            setmunicipios_data(data)
          })
          .catch((e) => {
            console.log(e)
          })
      }, [handleSubmit])

      
      const [formValues,handleInputchange] = useForm({
        municipio: '',
        idEstado: 0,
        query: ''
      })
      const { municipio, idEstado, query } = formValues

    return (
        <div>
            <Navbar/>
            <h1>Municipios</h1>
            <form onSubmit={handleSubmit} className='space-x-4'>
                    <label>Municipios</label>
                    <input 
                        className='border-2 border-black'
                        type='text' 
                        value={municipio}
                        name='municipio'
                        onChange={handleInputchange}                        
                     />
                    <label>Id del Estado</label>
                    <input 
                        className='border-2 border-black'
                        type='number' 
                        value={idEstado}
                        name='idEstado'
                        onChange={handleInputchange}                        
                     />
                     <button className='mt-3 p-2 rounded-md bg-emerald-400' type='submit'>Agregar</button>
                </form>
                <hr/>
                <form onSubmit={handleSubmitQuery}>
                    <label>Buscar por Municipio</label>
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
                        <th>Id Municipio</th>
                        <th>Municipio</th>
                        <th>Id Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        municipios_data.length >0 && 
                        municipios_data.map( ( municipio ) => (
                            <tr key={municipio.idMunicipio}>
                                <td className='text-center'>{municipio.idMunicipio}</td>
                                <td className='text-center'>{municipio.municipio}</td>
                                <td className='text-center'>{municipio.idEstado}</td>
                            </tr>   
                        ))
                    }                                     
                </tbody>
            </table>
        </div>
    )
}

export default municipios