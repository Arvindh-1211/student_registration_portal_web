import '../css/Header.css'
import bitlogo from '../assets/bitlogo.png'
import { useSelector } from 'react-redux';
import Logout from './Logout';


function Header() {
	const applicationNo = useSelector((state) => state.applicationNo.value)

	return (
		<div className='Header'>
			<div className='header'>
				<img className='bit-logo' src={bitlogo} alt='Bannari Amman Institute of Technology' />
				<div className='header-data'>
					<Logout />
					{applicationNo &&
						<div className='application-no'>Application No. : {applicationNo}</div>
					}
				</div>
			</div>
			<hr></hr>
		</div>
	)
}

export default Header