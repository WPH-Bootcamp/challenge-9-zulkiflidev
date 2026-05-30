import { useState, useRef, useEffect } from 'react';
import MgIcon from '../assets/mg-icon.svg';

import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
 
interface SearchBarProps {
  isMobileSearchActive?: boolean;
  onBack?: () => void;
}
function SearchBar({ isMobileSearchActive, onBack }: SearchBarProps) {

  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMobileSearchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobileSearchActive]);

  //Mulai menerima event dari input keyboard
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

    //harus tekan enter dulu ya baru hasil pencarian-nya muncul...
    if (e.key === 'Enter' && query.trim() !== '') {

      navigate(`/search?q=${encodeURIComponent(query.trim())}`);

    }
  };

  return (
    <div className={`md:ml-auto md:mr-2 lg:mr-0 ${isMobileSearchActive ? 'w-full md:w-auto block' : 'hidden md:block'}`}>
        
        <div className="flex flex-row relative items-center pt-2 cursor-pointer gap-4 w-full">
            
            {isMobileSearchActive && (

                <button onClick={onBack} className="text-white md:hidden flex items-center justify-center">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    
                </button>
            )}

            <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <img src={MgIcon} className="w-4 h-4 bg-transparent border-white"/>
            </span>

            <Input 
                ref={inputRef}
                className="bg-white/10 border-transparent/50 text-white pl-9 placeholder:text-neutral-400 w-full"
                
                type="text"                 
                placeholder="Search Movie" 
                
                value={query}

                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}

            />
            </div>
        </div>

    </div>
  )
}

export default SearchBar