import React from 'react'

import Logo  from '../components/Logo'

function Footer() {
  return (
    <div className="flex flex-row border-t border-neutral-900 py-4 px-25 py-16
                    justify-between items-center gap-4">       

        <div>
            <Logo/>            
        </div>
        <div>
            <p className="text-md pt-2">Copyright ©2025 Movie Explorer</p>
        </div>

    </div>
  )
}

export default Footer