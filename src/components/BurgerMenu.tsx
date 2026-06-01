import { Button } from '../components/ui/button';
import BurgerMenuIcon from '../assets/burger-menu-icon.svg';
import MgIcon from '../assets/mg-icon.svg';
import CloseIcon from '../assets/close-icon.svg';


interface BurgerMenuProps {
  onSearchClick?: () => void;
  onMenuClick?: () => void;
  isOpen?: boolean;
}
function BurgerMenu({ onSearchClick, onMenuClick, isOpen }: BurgerMenuProps) {
  
  return (    
    <div>

        <div className="flex flex-row gap-4 items-center text-white pt-2 
                        cursor-pointer md:hidden">

            {/* ini button search, cuma muncul di mobile aja.... */}                          
            <Button className="bg-transparent" onClick={onSearchClick}>
            
                <img src={MgIcon} className="w-4 h-4 bg-transparent border-white"/>            
            </Button>

            {/* ini burger menu, iya, cuma muncul di mobile aja.... */}                          
            <Button className="bg-transparent" onClick={onMenuClick}>
              
                <img src={isOpen ? CloseIcon : BurgerMenuIcon} className="w-6 h-6"/>
            
            </Button>

        </div>

        
    </div>
  )
}

export default BurgerMenu