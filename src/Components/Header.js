import '../css/Header.css'
import bitlogo from '../assets/bitlogo.png'


function Header() {
  return (
    <div>
      <img className='bit-logo' src={bitlogo} alt='Bannari Amman Institute of Technology' />
      <hr></hr>
    </div>
  )
}

export default Header