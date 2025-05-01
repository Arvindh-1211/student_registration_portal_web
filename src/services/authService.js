import apiInstance from "./apiService";

// data: { email, password, loginType: 'application_number' | 'google' }
const login = async (data) => {
    try {
        const response = await apiInstance.post('/login', {...data, loginType: data.loginType || 'application_number'})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// data: { email, password }
const register = async (data) => {
    try {
        const response = await apiInstance.post('/register', data)
        return response
    } catch (error) {
        console.log(error)
    }
}

const getUser = async () => {
    try {
        const response = await apiInstance.get('/user')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const authServices = {
    login,
    register,
    getUser
}

export default authServices