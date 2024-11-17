import '../css/Logout.css'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setAuth } from '../store/authSlice'
import { setApplicationNo } from '../store/applicationNoSlice';

function Logout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(setAuth({}))
        dispatch(setApplicationNo(null))
        navigate('/login', {replace: true})
    }

    return (
        <div>
            <input className='logout-btn' type='submit' value='Logout' onClick={handleLogout} />
        </div>
    )
}

export default Logout
