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

const getStudentAdditionalDet = async (applicationNo, queryParams) => {
    try {
        const response = await apiInstance.get(`/student_add_det/${applicationNo}`, {
            params: {
                fields: queryParams
            }
        })
        return response.data
    } catch (error) {
        console.log("Cannot fetch details from student_additional_det table")
    }
}

const insertStudentAdditionalDet = async (data) => {
    try {
        const response = await apiInstance.post(`student_add_det`, data)
        return response
    } catch (error) {
        console.log("Cannot insert into student_additional_det table")
    }
}

const inserIntoCAMPS = async (applicationNo) => {
    try {
        const response = await apiInstance.post(`/insert_into_camps/${applicationNo}`)
        return response.data
    } catch (error) {
        console.log("Cannot insert into CAMPS")
    }
}

const importStudent = async (data) => {
    try {
        const response = await apiInstance.post(`/import_students`, data)
        return response
    } catch (error) {
        console.log("Cannot import excel file")
    }
}

const addUser = async (data) => {
    try {
        const response = await apiInstance.post(`/add_user`, data)
        return response
    } catch (error) {
        console.log("Cannot add user")
    }
}

const services = {
    createNewApplication,
    fetchData,
    updateData,
    fetchFromMaster,
    getValueFromMaster,
    getStudentAdditionalDet,
    insertStudentAdditionalDet,
    inserIntoCAMPS,
    importStudent,
    addUser
};

export default services;