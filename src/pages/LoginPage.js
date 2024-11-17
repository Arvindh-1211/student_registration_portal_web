import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';

import authServices from '../services/authService';
import { setAuth } from '../store/authSlice';
import { setApplicationNo, setCampsApplNo } from '../store/applicationNoSlice';

import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Header from '../Components/Header';
import '../css/Login.css'

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const { handleSubmit, register } = useForm();

    useEffect(() => {
        dispatch(setAuth({}))
        dispatch(setApplicationNo(null))
        dispatch(setCampsApplNo(null))
    }, [dispatch])

    const onSubmit = async (data) => {
        setIsLoading(true)
        setError(null)
        data.password = btoa(data.password)
        
        const response = await authServices.login(data)
        if (response) {
            dispatch(setAuth(response))
            navigate('/')
        }
        else {
            setError("Invalid Credentials!")
        }
        setIsLoading(false)
    }

    return (
        <div className='login'>
            <Header />
            <div className='login-det'>
                <div className='login-container'>
                    {isLoading && <Loading />}
                    {error && <Error message={error} />}
                    <form className='login-card' onSubmit={handleSubmit(onSubmit)}>
                        <div className='login-header'>Login</div>
                        <div>
                            <div className='input-label'>Username</div>
                            <input
                                className='input-field'
                                type='text'
                                autoComplete='false'
                                {...register('username')}
                            />
                        </div>
                        <div>
                            <div className='input-label'>Password</div>
                            <input
                                className='input-field'
                                type='password'
                                {...register('password')}
                            />
                        </div>
                        <input className='login-btn' type="submit" onSubmit={handleSubmit(onSubmit)} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage 