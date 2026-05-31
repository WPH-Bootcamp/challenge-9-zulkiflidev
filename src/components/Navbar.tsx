import { useEffect, useState } from 'react'
import BurgerMenu from './BurgerMenu';
import SearchBar from './SearchBar';
import MenuList from './MenuList';


function Navbar() {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

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

            <div className={`${isMobileSearchActive ? "hidden md:block" : "block"}`}>
              <MenuList />
            </div>

            <SearchBar isMobileSearchActive={isMobileSearchActive} onBack={() => setIsMobileSearchActive(false)} />
            
            <div className={`${isMobileSearchActive ? "hidden" : "block"}`}>
            
              <BurgerMenu onSearchClick={() => setIsMobileSearchActive(true)} />
            
            </div>
            
        </nav> 
    </div>
  )
}

export default Navbar