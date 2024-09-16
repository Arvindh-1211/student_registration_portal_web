import InputField from '../Components/InputField'
import DropDown from '../Components/DropDown';
import Form from '../Components/Form';
import Header from '../Components/Header';

import {  useForm } from "react-hook-form";
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios";

function PersonalDetails() {
    const applicationNo = useSelector((state) => state.applicationNo.value)

    const formData = {
        title: '',
        student_name: '',
        initial: '',
        dob: '',
        age: '',
        gender: '',
        mother_tongue: '',
        blood_group: '',
        aadhar_no: '',
        community: '',
        caste: '',
        religion: '',
        nationality: ''
    }
    const options = {
        'title': {},
        'gender': {},
        'blood_group': {},
        'community': {},
        'caste': {},
        'religion': {},
        'nationality': {},
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
            <Form handleNext={handleSubmit(onSubmit)} heading="Personal Details" >
                <DropDown
                    label="Title"
                    options={options['title']}
                    registerProps={register("title")}
                />

                <InputField
                    label="Student Name"
                    registerProps={register("student_name")}
                    type="text"
                />

                <InputField
                    label="Initial"
                    registerProps={register("initial")}
                    type="text"
                />

                <InputField
                    label="Date of Birth"
                    registerProps={register("dob")}
                    type="date"
                />

                <InputField
                    label="Age"
                    registerProps={register("age")}
                    type="number"
                />

                <DropDown
                    label="Gender"
                    options={options['gender']}
                    registerProps={register("gender")}
                />

                <InputField
                    label="Mother Tongue"
                    registerProps={register("mother_tongue")}
                    type="text"
                />

                <DropDown
                    label="Blood Group"
                    options={options['blood_group']}
                    registerProps={register("blood_group")}
                />

                <InputField
                    label="Aadhar Number"
                    registerProps={register("aadhar_no")}
                    type="number"
                />

                <DropDown
                    label="Community"
                    options={options['community']}
                    registerProps={register("community")}
                />

                <DropDown
                    label="Caste"
                    options={options['caste']}
                    registerProps={register("caste")}
                />

                <DropDown
                    label="Religion"
                    options={options['religion']}
                    registerProps={register("religion")}
                />

                <DropDown
                    label="Nationality"
                    options={options['nationality']}
                    registerProps={register("nationality")}
                />
            </Form>
        </div>
    )
}

export default PersonalDetails