import '../css/Header.css'

import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoPlus } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { useState } from 'react';

import bitlogo from '../assets/bitlogo.png'
import Logout from './Logout';
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import ProtectedComponent from './ProtectedComponent';
import { setApplicationNo } from '../store/applicationNoSlice';
import apiInstance from '../services/apiService';


function Header() {
	const applicationNo = useSelector((state) => state.applicationNo.value)
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [showEdit, setShowEdit] = useState(false)
	const [tempApplNo, setTempApplNo] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const handleEdit = async (e=null) => {
		if(e){
			e.preventDefault()
		}
		if (!tempApplNo) {
			setShowEdit(!showEdit)
		} else {
			setIsLoading(true)
			try {
				const response = await apiInstance.get(`/if_exist`, { params: { appl_no: tempApplNo } })
				if (response.status === 200) {
					setError(null)
					dispatch(setApplicationNo(tempApplNo))
					navigate('/final_review')
				} else {
					setError('Some error occured')
					console.log(response)
				}
			} catch (error) {
				if (!error.response.data.message) {
					setError('Some error occured')
				}
				setError(error.response.data.message)
				console.log(error)
			}
		}
		setIsLoading(false)
	}

	return (
		<div className='Header'>
			{isLoading && <Loading />}
			{error && <Error message={error} />}
			<div className='header'>
				<img className='bit-logo' src={bitlogo} alt='Bannari Amman Institute of Technology' />
				<div className='header-data'>
					<div className='header-btn-container'>
						{
							location.pathname == '/' &&
							<form onSubmit={(e) => {handleEdit(e)}}>
								<input
									className={showEdit ? 'app-no show' : 'app-no'}
									placeholder='Application no.'
									onChange={(e) => { setTempApplNo(e.target.value) }}
									type='number'
								/>
								<div className='edit-btn' onClick={() => {handleEdit()}}> <MdModeEditOutline /> Edit</div>
							</form>
						}
						<ProtectedComponent users={["admin"]}>
							<Link to="/"> <GoPlus /> Application </Link>
							<Link to="/register"> <GoPlus /> <FaUser /> </Link>
						</ProtectedComponent>
						<Logout />
					</div>
					{applicationNo &&
						<div className='application-no'>Application No Temp : {applicationNo}</div>
					}
				</div>
			</div>
			<hr></hr>
		</div>
	)
}

export default Header