import Link from 'next/link'
import React from 'react'
import {useState } from 'react'

export const Navbar = () => {
    const [button, setbutton] = useState(false)
    const handleButton = () => {
        setbutton(!button)        
    }  
    return (
        <>
        <div className="hidden animate__animated animate__backInDown md:flex justify-between container mx-auto lg:text-3xl lg:py-5 lg:p-5 2xl:m-5 2xl:ml-28">
            <h1 className="py-4" > Cura Deuda </h1>            
            <div className=" flex space-x-4 items-center" >
              <Link href='/'>
                <a className="py-4" > Estados </a>
              </Link>
              <Link href='/municipios'>
                <a className="py-4" > Municipios </a>
              </Link>
              <Link href='/colonias'>
                <a className="py-4" > Colonias </a>
              </Link>
                                    
            </div>
        </div>
        <div className="flex justify-between container mx-auto px-4 md:hidden">
            <h1 className="py-4" > Alan Page </h1>            
            <button onClick={handleButton}>            
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>            
            </button>
        </div>
        <div className={`${button ? 'block' : 'hidden'} px-4 space-y-4 md:hidden`}>
              <Link href='/'>
                <a className="py-4" > Estados </a>
              </Link>
              <Link href='/municipios'>
                <a className="py-4" > Municipios </a>
              </Link>
              <Link href='/colonias'>
                <a className="py-4" > Colonias </a>
              </Link>
              
        </div>
        </>
    )
}

