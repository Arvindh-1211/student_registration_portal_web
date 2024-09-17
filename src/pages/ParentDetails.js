import InputField from '../Components/InputField'
import DropDown from '../Components/DropDown';
import Form from '../Components/Form';
import Header from '../Components/Header';

import {  useForm } from "react-hook-form";
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios";

function ParentDetails() {
    const applicationNo = useSelector((state) => state.applicationNo.value)

    const formData = {
        Father_Name: '',
        Mother_Name: '',
        Gaurdian_Name: '',
        Father_Occupation: '',
        Father_Income: '',
        Father_Organisaion_Company: '',
        Father_Designation: '',
        Mother_Occupation: '',
        Mother_Income: '',
        Mother_Organisaion_Company: '',
        Mother_Designation: '',
    }
    const options = {
        'Father_Occupation': {},
        'Father_Designation': {},
        'Mother_Occupation': {},
        'Mother_Designation': {},
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/personal_details/${applicationNo}`)
                formData = response.body[0]
            } catch (error) {
                console.log("Error fetching details from stundent_register table")
            }
        }
        const fetchOptions = async () => {
            const optionsArray = Object.keys(options)
            optionsArray.forEach(async (option) => {
                try {
                    const response = await axios.get(`http://localhost:8000/master/${option}`)
                    options[option] = response.data[0]
                } catch (error) {
                    console.log(`Cannont fetch options for ${option} from master table`)
                }
            })
        }

        fetchData()
        fetchOptions()
    }, [])

    const { register, handleSubmit } = useForm({ defaultValues: formData });


    const onSubmit = async (data) => {
        try {
            const response = await axios.put(`http://localhost:8000/personal_details/${applicationNo}`, data)
            console.log(response)
        } catch (error) {
            console.log("Failed to update fields in table");
        }
    }

    return (
        <div>
            <Header />
            <Form handleNext={handleSubmit(onSubmit)} heading="Parent Details" >
                <InputField
                    label="Father Name"
                    registerProps={register("Father_Name")}
                    type="text"
                />
                
                <InputField
                    label="Mother Name"
                    registerProps={register("Mother_Name")}
                    type="text"
                />
                
                <InputField
                    label="Gaurdian Name"
                    registerProps={register("Gaurdian_Name")}
                    type="text"
                />
                
                <DropDown
                    label="Father Occupation"
                    options={options['Father_Occupation']}
                    registerProps={register("Father_Occupation")}
                />

                <InputField
                    label="Father Income"
                    registerProps={register("Father_Income")}
                    type="text"
                />

                <InputField
                    label="Organisation/Company"
                    registerProps={register("Father_Organisaion_Company")}
                    type="text"
                />

                <DropDown
                    label="Designation"
                    options={options['Father_Designation']}
                    registerProps={register("Father_Designation")}
                />
                
                <DropDown
                    label="Mother Occupation"
                    options={options['Mother_Occupation']}
                    registerProps={register("Mother_Occupation")}
                />

                <InputField
                    label="Mother's Income"
                    registerProps={register("Mother_Income")}
                    type="text"
                />
                
                <InputField
                    label="Organisation/Company"
                    registerProps={register("Mother_Organisaion_Company")}
                    type="text"
                />
                
                <DropDown
                    label="Designation"
                    options={options['Mother_Designation']}
                    registerProps={register("Mother_Designation")}
                />

            </Form>
        </div>
    )
}

export default ParentDetails