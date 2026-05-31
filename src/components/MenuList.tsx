import { Link } from 'react-router-dom';
import Logo  from './Logo'

{/* 
    Ini adalah daftar Menu, kalau di desktop itu di sebelah kiri logo (pojok kiri atas...)    
*/}

function MenuList() {
  return (
    <div>

        <div className="flex flex-row gap-16 items-center pt-2 md:px-9">                             
            
            <Link to="/" className="cursor-pointer ">
                <Logo />
            </Link>                
            
            <div className="hidden md:flex md:flex-row md:gap-16 md:items-center text-white 
                            pt-4 md:pb-2  cursor-pointer">
                <div>
                    <Link to="/">
                        Home
                    </Link>
                </div>

                <div>
                    <Link to="/favorite">
                        Favorites
                    </Link>                    
                </div>
            </div>
        </div>

    </div>
  )
}

export default MenuList