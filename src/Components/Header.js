import '../css/Header.css'
import bitlogo from '../assets/bitlogo.png'


function Header() {
  return (
    <div>
      <img className='bit-logo' src={bitlogo} alt='Bannari Amman Institute of Technology' />

      <div className='header-data'>
        <div>User</div>
      </div>
      <hr></hr>
    </div>
  )
}

export default Header