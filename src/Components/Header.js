import '../css/Header.css'
import bitlogo from '../assets/bitlogo.png'

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoPlus } from "react-icons/go";
import { FaUser } from "react-icons/fa";

import Logout from './Logout';
import ProtectedComponent from './ProtectedComponent';


function Header() {
	const applicationNo = useSelector((state) => state.applicationNo.value)

	return (
		<div className='Header'>
			<div className='header'>
				<img className='bit-logo' src={bitlogo} alt='Bannari Amman Institute of Technology' />
				<div className='header-data'>
					<div className='header-btn-container'>
						<ProtectedComponent users={["admin"]}>
							{/* <Link to="/"> <GoPlus /> Application </Link> */}
							<Link to="/register"> <GoPlus /> <FaUser /> </Link>
						</ProtectedComponent>
						<Logout />
					</div>
					{applicationNo &&
						<div className='application-no'>Application No : {applicationNo}</div>
					}
				</div>
			</div>
			<hr></hr>
		</div>
	)
}

export default Header