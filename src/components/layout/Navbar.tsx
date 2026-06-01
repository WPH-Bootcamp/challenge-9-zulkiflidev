import { useEffect, useState } from 'react'
import BurgerMenu from '../BurgerMenu';
import SearchBar from '../SearchBar';

import MenuList from '../MenuList';
import { Link } from 'react-router-dom';


function Navbar() {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {

    {/* untuk deteksi scroll */} 
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {

        //hapus eventListenernya, supaya ga membebani memory.....
        window.removeEventListener('scroll', handleScroll); // 
    };

  }, []);

  // Mengunci scroll pada body saat menu mobile terbuka
  useEffect(() => {

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'; //supaya ga bisa scroll

    } 
    else {
      document.body.style.overflow = 'auto';
    }

  }, [isMobileMenuOpen]);

  return (
    <div>
        {/* Jika menu mobile dibuka, maka muncul Area gelap yang nutupin
            seluruh layar di bawah navbar */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/90 z-40 md:hidden transition-opacity cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      
        <nav className={`w-full sticky top-0 z-50  
                         flex flex-row justify-between px-4 gap-4 z-15 
                        md:px-16 md:items-center 
                        ${isScrolled ? "backdrop-blur-md" : ""}
                        ${isMobileMenuOpen ? "bg-black" : ""}
                        
                        `}>

            <div className={`${isMobileSearchActive ? "hidden md:block" : "block"}`}>

              {/* yg Ini menu buat desktop view.... */}
              <MenuList />
            
            </div>

            <SearchBar isMobileSearchActive={isMobileSearchActive} 
                       onBack={() => setIsMobileSearchActive(false)} />
            
            <div className={`${isMobileSearchActive ? "hidden" : "block"}`}>
            
              <BurgerMenu 
                onSearchClick={() => setIsMobileSearchActive(true)} 
                onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                isOpen={isMobileMenuOpen}
              />
            
            </div>
            
            {/* Tampilan Menu di mobile setealah burger-menu diklik/ditap */}            
            {isMobileMenuOpen && (

              <div className="absolute flex flex-col  top-full left-0 w-full 
                              bg-black/95 backdrop-blur-md   p-4 gap-4 md:hidden 
                              border-t border-neutral-800 shadow-lg">
                  
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} 
                               className="block text-white text-lg font-medium p-2 
                                          hover:bg-neutral-800 rounded-lg">Home
                  </Link>
                  
                  <Link to="/favorite" onClick={() => setIsMobileMenuOpen(false)} 
                            className="block text-white text-lg font-medium p-2 
                                       hover:bg-neutral-800 rounded-lg">Favorites
                  </Link>

              </div>
            )}


        </nav> 
    </div>


  )
}

export default Navbar