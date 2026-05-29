import { useEffect, useState } from 'react'
import { Input } from '../components/ui/input';
import MgIcon from '../assets/mg-icon.svg';
import Logo from '../components/Logo';
import BurgerMenu from '../assets/burger-menu-icon.svg';
import { Button } from '../components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';


function Navbar() {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {

        //hapus eventListenernya, supaya ga membebani memory
        window.removeEventListener('scroll', handleScroll); // 
    };

  }, []);

  return (
    <div>
        <nav className={`w-full sticky top-0 z-50  
                         top-5 flex flex-row justify-between px-4 gap-4 z-15 
                        md:px-16 md:items-center 
                        ${isScrolled ? "backdrop-blur-md" : ""}
                        `}>
            <div className="flex flex-row gap-16 items-center pt-2 md:px-9">                             
                <Logo />
                <div className="hidden md:flex md:flex-row md:gap-16 md:items-center text-white pt-4 md:pb-2 cursor-pointer">
                    <div>
                        <Link to="/">
                            Home
                        </Link>
                    </div>
                    <div>Favorites</div>
                </div>
            </div>

            <div className="hidden md:block flex flex-row relative items-center pt-2 cursor-pointer gap-4">
                <span className="absolute left-3 top-1/2 pt-2 -translate-y-1/2 text-gray-400">
                    <img src={MgIcon} className="w-4 h-4 bg-transparent border-white"/>
                </span>
                <Input type="text" placeholder="Search Movie" className="bg-white/10  border-transparent/50 text-white pl-9 placeholder:text-neutral-400"></Input>
            </div>

            <div className="flex flex-row gap-4 items-center text-white pt-2 cursor-pointer md:hidden">

                <Button className="bg-transparent">
                    <img src={MgIcon} className="w-4 h-4 bg-transparent border-white"/>
                </Button>
                
                <Button className="bg-transparent">
                    <img src={BurgerMenu} className="w-6 h-6"/>
                </Button>
            </div>
            
        </nav> 
    </div>
  )
}

export default Navbar