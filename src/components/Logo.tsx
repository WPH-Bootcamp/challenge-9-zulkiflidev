import LogoImg from '../assets/logo_bxs_tv.svg'        

function Logo() {
  return (
    <div>
        {/* Logo dan Menu */}
        <div className="flex flex-row gap-4">
            <img src={LogoImg} />
            <p className="text-neutral-25 text-display-xs pt-2">Movie</p>
        </div>
    </div>
  )
}

export default Logo