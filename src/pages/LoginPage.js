import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';

import authServices from '../services/authService';
import { setAuth } from '../store/authSlice';
import { setApplicationNo } from '../store/applicationNoSlice';

import InputField from '../Components/InputField'
import Loading from "../Components/Loading";
import Error from "../Components/Error";

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const { handleSubmit, register } = useForm();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(setAuth({}))
        dispatch(setApplicationNo(null))
    }, [dispatch])

    const onSubmit = async (data) => {
        setIsLoading(true)
        setError(null)
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
        <div className='login-container'>
            {isLoading && <Loading />}
            {error && <Error message={error} />}
            <form className='login-card' onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Username"
                    type="text"
                    registerProps={register("username")}
                    autoComplete='off'
                />
                <InputField
                    label="Password"
                    type="password"
                    registerProps={register("password")}
                />
                <input className='login-btn' type="submit" onSubmit={handleSubmit(onSubmit)} />
            </form>
        </div>
    )
}

export default LoginPage 