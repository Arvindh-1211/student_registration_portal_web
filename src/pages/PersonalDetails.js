// Form-1
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react'
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

    const [formData, setFormData] = useState({
        legend: '',
        student_name: '',
        initial: '',
        dob: '',
        age: '',
        gender: '',
        mother_tongue: '',
        blood_group: '',
        aadhar_no: '',
        community_id: '',
        caste_id: '',
        religion_id: '',
        nationality_id: ''
    })
    const [options, setOptions] = useState({
        blood_group: {},
        community: {},
        caste: {},
        religion: {},
        nationality: {}
    });

    const { register, getValues, setValue, handleSubmit, reset } = useForm({ defaultValues: formData });

    useEffect(() => {
        const getDefaultValues = async () => {
            const queryParams = Object.keys(formData).join(',')
            const fetchedData = await services.fetchData(applicationNo, queryParams)
            console.log(fetchedData)
            setFormData(fetchedData)
            reset(fetchedData)
            if (getValues('dob')) {
                let dob = new Date(getValues('dob')).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
                setValue('dob', dob)
            }
        }

        const getOptions = async () => {
            const optionsArray = Object.keys(options);
            const fetchedOptions = await Promise.all(
                optionsArray.map((option) => services.fetchOption(option))
            );

            const newOptions = {};
            optionsArray.forEach((option, index) => {
                newOptions[option] = fetchedOptions[index];
            });

            setOptions(newOptions);
        };
        getOptions()
        getDefaultValues()
    }, [])


    const onSubmit = async (data) => {
        services.updateData(applicationNo, data)
        navigate('/parent_details')
        console.log(data)
    }

    return (
        <div>
            <Form handleNext={handleSubmit(onSubmit)} heading="Personal Details" >
                <Row>
                    <DropDown
                        label="Title"
                        options={{ "Mr.": "Mr", "Mrs.": "Mrs" }}
                        registerProps={register("legend")}
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
                    <DropDown
                        label="Gender"
                        options={{ "Male": "Male", "Female": "Female" }}
                        registerProps={register("gender")}
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
                </Row>

                <Row>
                    <DropDown
                        label="Blood Group"
                        options={options['blood_group']}
                        registerProps={register("blood_group")}
                    />
                    <InputField
                        label="Mother Tongue"
                        registerProps={register("mother_tongue")}
                        type="text"
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
                        registerProps={register("community_id")}
                    />
                    <DropDown
                        label="Caste"
                        options={options['caste']}
                        registerProps={register("caste_id")}
                    />
                    <DropDown
                        label="Religion"
                        options={options['religion']}
                        registerProps={register("religion_id")}
                    />
                </Row>
                <Row>
                    <DropDown
                        label="Nationality"
                        options={options['nationality']}
                        registerProps={register("nationality_id")}
                    />
                </Row>
            </Form>
        </div>
    )
}

export default PersonalDetails