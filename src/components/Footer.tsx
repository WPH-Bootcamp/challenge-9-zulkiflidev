//import React from 'react'

import Logo  from '../components/Logo';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div className="flex flex-col md:flex-row border-t border-neutral-900 py-4 px-4 md:px-25 py-16
                    md:justify-between md:items-center gap-4">       

        <div>
            <Link to="/" className="cursor-pointer">
                    <Logo />
                 
            </Link>            
        </div>
        <div>
            <p className="text-md pt-2">Copyright ©2025 Movie Explorer</p>
        </div>

    </div>
  )
}

export default Footer