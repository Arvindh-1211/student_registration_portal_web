import { useForm } from "react-hook-form";
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

import services from "../services/services";

import InputField from '../Components/InputField'
import DropDown from '../Components/DropDown';
import Form from '../Components/Form';
import Row from "../Components/Row";


function PersonalDetails() {
    const navigate = useNavigate();
    const applicationNo = useSelector((state) => state.applicationNo.value)

    let formData = {
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
        'blood_group': {},
        'community': {},
        'caste': {},
        'religion': {},
        'nationality': {},
    }

    useEffect(() => {
        const queryParams = Object.keys(formData).join(',')
        formData = services.fetchData(applicationNo, queryParams)

        const optionsArray = Object.keys(options)
        optionsArray.forEach(async (option) => {
            options[option] = services.fetchOption(option)
        })
    }, [])


    const { register, handleSubmit } = useForm({ defaultValues: formData });


    const onSubmit = async (data) => {
        services.updateData(applicationNo, data)
        navigate('/parent_details')
    }

    return (
        <div>
            <Form handleNext={handleSubmit(onSubmit)} heading="Personal Details" >
                <Row>
                    <DropDown
                        label="Title"
                        options={{ "Mr.": "Mr", "Mrs.": "Mrs" }}
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
                </Row>

                <Row>
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
                        options={{ "Male": "Male", "Female": "Female" }}
                        registerProps={register("gender")}
                    />
                </Row>

                <Row>
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
                </Row>

                <Row>
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
                </Row>
            </Form>
        </div>
    )
}

export default PersonalDetails