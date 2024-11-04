import apiInstance from "./apiService";

const createNewApplication = async (data) => {
    try {
        const response = await apiInstance.post(`student_reg/new`, data)
        return response.data
    } catch (error) {
        console.log("Cannot create a new application in student_register table")
    }
}

const fetchData = async (applicationNo, queryParams) => {
    try {
        const response = await apiInstance.get(`/student_reg/${applicationNo}`, {
            params: {
                fields: queryParams
            }
        })
        return response.data
    } catch (error) {
        console.log("Error fetching details from student_register table")
    }
}

const updateData = async (applicationNo, data) => {
    try {
        const response = await apiInstance.put(`student_reg/${applicationNo}`, data)
        return response
    } catch (error) {
        console.log("Cannot update details in student_register table")
    }
}

const fetchFromMaster = async (option) => {
    try {
        const response = await apiInstance.get(`/master/${option}`)
        return response.data
    } catch (error) {
        console.log(`Cannont fetch ${option} from master table`)
    }
}

const getValueFromMaster = async (option, id) => {
    try {
        const response = await apiInstance.get(`/master/${option}/${id}`)
        return response.data.value
    } catch (error) {
        console.log(`Error fetching value for ${option} from master table`)
    }
}

const insertStudentAdditionalDet = async (data) => {
    try {
        const response = await apiInstance.post(`student_add_det`, data)
        return response
    } catch (error) {
        console.log("Cannot create a new application in student_register table")
    }
}

const services = {
    createNewApplication,
    fetchData,
    updateData,
    fetchFromMaster,
    getValueFromMaster,
    insertStudentAdditionalDet,
};

export default services;