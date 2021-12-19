import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Navbar } from '../components/nav/Navbar'
import { useForm } from '../hooks/useForm'
import Swal from 'sweetalert2'

export const colonias = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/colonia',{
            colonia: colonia,
            cp: cp,
            idMunicipio: idMunicipio
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
        axios.post('http://127.0.0.1:8000/buscacolonianombre',{
            colonia: query
        })
        .then(({data}) => {
            console.log(data[0])
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Colonia Encontrada',
                text: `colonia: ${data[0].colonia}
                cp: ${data[0].cp}`,
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
    const handleSubmitQueryCp = (e) => {
        e.preventDefault()
        axios.post('http://127.0.0.1:8000/buscacoloniacp',{
            cp: querycp
        })
        .then(({data}) => {
            console.log(querycp)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Colonia Encontrada',
                text: `colonia: ${data[0].colonia}
                cp: ${data[0].cp}`,
                showConfirmButton: true,                
              })
        })
        .catch((e) => {  
            console.log(querycp)          
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

    const [colonia_data, setcolonia_data] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/colonia')
          .then(({data}) => {
            setcolonia_data(data)            
          })
          .catch((e) => {
            console.log(e)
          })
      }, [handleSubmit])
    
      const [formValues,handleInputchange] = useForm({
        colonia: '',
        cp: 0,
        idMunicipio: 0,
        query: ''
      })
      const { colonia, cp, idMunicipio, query, querycp } = formValues




    return (
        <div className='overflow-x-visible'>
            <Navbar/>
           <h1>Colonias</h1> 
           <form onSubmit={handleSubmit} className='flex flex-col md:w-52 space-x-4 '>
                    <label>Colonias</label>
                    <input 
                        className='border-2 border-black'
                        type='text' 
                        value={colonia}
                        name='colonia'
                        onChange={handleInputchange}                        
                     />
                    <label>Código Postal</label>
                    <input 
                        className='border-2 border-black'
                        type='number' 
                        value={cp}
                        name='cp'
                        onChange={handleInputchange}                        
                     />
                    <label>Id Municipio</label>
                    <input 
                        className='border-2 border-black'
                        type='number' 
                        value={idMunicipio}
                        name='idMunicipio'
                        onChange={handleInputchange}                        
                     />
                     <button className='my-3 p-2 rounded-md bg-emerald-400' type='submit'>Agregar</button>
            </form>
            <hr/>
            <form onSubmit={handleSubmitQuery}>
                <label>Buscar por Colonia</label>
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
            <form onSubmit={handleSubmitQueryCp}>
                <label>Buscar por Código Postal</label>
                    <input 
                        className='border-2 border-black'
                        type='number' 
                        value={querycp}
                        name='querycp'
                        onChange={handleInputchange}                        
                     />
                     <button className='my-3 p-2 rounded-md bg-emerald-400' type='submit'>Buscar</button>
            </form>
            <hr/>
           <table className="table-auto overflow-scroll min-w-full">
                <thead>
                    <tr>
                        <th>Id Colonia</th>
                        <th>Colonia</th>
                        <th>Código Postal</th>
                        <th>Id Municipio</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        colonia_data.length >0 && 
                        colonia_data.map( ( colonia ) => (
                            <tr key={colonia.idColonia}>
                                <td className='text-center'>{colonia.idColonia}</td>
                                <td className='text-center'>{colonia.colonia}</td>
                                <td className='text-center'>{colonia.cp}</td>
                                <td className='text-center'>{colonia.idMunicipio}</td>
                            </tr>   
                        ))
                    }                                     
                </tbody>
            </table>
        </div>
    )
}

export default colonias
