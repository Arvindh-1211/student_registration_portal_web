import apiInstance from "./apiService";
import { useSelector } from 'react-redux'

const applicationNo = useSelector((state) => state.applicationNo.value)
const fetchData = async (queryParams) => {
    try {
        const response = await apiInstance.get(`/student_reg/${applicationNo}?`, {
            params: {
                fields: queryParams
            }
        })
        return response.data[0]
    } catch (error) {
        console.log("Error fetching details from stundent_register table")
    }
}

const updateData = (data) => {
    try {
        apiInstance.put(`student_reg/${applicationNo}`, data)
    } catch (error) {
        console.log("Cannot update details in student_register table")
    }
}

const fetchOption = async (option) => {
    try {
        const response = await apiInstance.get(`/master/${option}`)
        return response.data[0]
    } catch (error) {
        console.log(`Cannont fetch options for ${option} from master table`)
    }
}

const services = {
    fetchData,
    updateData,
    fetchOption,
};

export default services;