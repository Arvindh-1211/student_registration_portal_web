import React from 'react'
import { useNavigate } from 'react-router-dom';

import Button from '../Components/Button'

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setApplicationNo } from '../store/applicationNoSlice';

function LandingPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch()

	const handleNew = async () => {
		try {
			const response = await axios.get('http://localhost:8000/new')
			dispatch(setApplicationNo(response.data['applicationNo']))
			navigate('/personal_details');
		} catch (error) {
			console.log("Unable create a new record in student_register")
		}
	}

	return (
		<div>
			<Button value="New" onSubmit={handleNew} />
		</div>
	)
}

export default LandingPage
