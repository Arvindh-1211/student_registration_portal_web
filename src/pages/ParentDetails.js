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
        father_name: '',
        mother_name: '',
        guardian_name: '',
        occupation: '',
        parent_income: '',
        work_area: '',
        designation: '',
        occupation_mother: '',
        parent_income_mother: '',
        work_area_mother: '',
        designation_mother: '',
    }
    const options = {
        'occupation': {},
        'designation': {},
        'occupation_mother': {},
        'designation_mother': {},
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/parent_details/${applicationNo}`)
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
            const response = await axios.put(`http://localhost:8000/parent_details/${applicationNo}`, data)
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
                    registerProps={register("father_name")}
                    type="text"
                />
                
                <InputField
                    label="Mother Name"
                    registerProps={register("mother_name")}
                    type="text"
                />
                
                <InputField
                    label="Gaurdian Name"
                    registerProps={register("gaurdian_name")}
                    type="text"
                />
                
                <DropDown
                    label="Father Occupation"
                    options={options['occupation']}
                    registerProps={register("occupation")}
                />

                <InputField
                    label="Father Income"
                    registerProps={register("parent_income")}
                    type="number"
                />

                <InputField
                    label="Organisation/Company"
                    registerProps={register("work_area")}
                    type="text"
                />

                <DropDown
                    label="Designation"
                    options={options['designation']}
                    registerProps={register("designation")}
                />
                
                <DropDown
                    label="Mother Occupation"
                    options={options['occupation_mother']}
                    registerProps={register("occupation_mother")}
                />

                <InputField
                    label="Mother's Income"
                    registerProps={register("parent_income_mother")}
                    type="number"
                />
                
                <InputField
                    label="Organisation/Company"
                    registerProps={register("work_area_mother")}
                    type="text"
                />
                
                <DropDown
                    label="Designation"
                    options={options['designation_mother']}
                    registerProps={register("designation_mother")}
                />

            </Form>
        </div>
    )
}

export default ParentDetails