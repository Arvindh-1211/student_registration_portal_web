// Form-8
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup';

import services from "../services/services";
import schema from "../utils/validation";

import InputField from '../Components/InputField'
import DropDown from '../Components/DropDown';
import Form from '../Components/Form';
import Row from "../Components/Row";

function AdditionalDetails() {
    const navigate = useNavigate();
    const applicationNo = useSelector((state) => state.applicationNo.value)

    const [formData, setFormData] = useState({
        father_qual: '',
        mother_qual: '',
        school_type: '',
        college_bus: '',
        boarding_point: '',
        sports_int: '',
        first_gr_appno: '',
        choose_college: '',
    })

    const [options, setOptions] = useState({
        'boarding_point': {},
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: formData, resolver: yupResolver(schema) });

    useEffect(() => {
        const getOptions = async () => {
            const optionsArray = Object.keys(options);
            const fetchedOptions = await Promise.all(
                optionsArray.map((option) => services.fetchFromMaster(option))
            );

            const newOptions = {};
            optionsArray.forEach((option, index) => {
                newOptions[option] = fetchedOptions[index];
            });

            setOptions(newOptions);
        }
        getOptions()
    }, [])

    const onSubmit = async (data) => {
        // services.updateData(applicationNo, data)
        // navigate('/final_review')
        console.log(data)
    }

    return (
        <div>
            <Form handleNext={handleSubmit(onSubmit)} heading="Additional Details" handleBack={() => { navigate('/mark_details') }} >
                <Row>

                    <InputField
                        label="Father Qualification"
                        registerProps={register("father_qual")}
                        type="text"
                        error={errors.father_qual && errors.father_qual.message}
                    />
                    <InputField
                        label="Mother Qualification"
                        registerProps={register("mother_qual")}
                        type="text"
                        error={errors.mother_qual && errors.mother_qual.message}
                    />
                    <DropDown
                        label="School Type"
                        options={{ "Government": "Government", "Private": "Private", "Government Aided": "Government Aided" }}
                        registerProps={register("school_type")}
                    />
                </Row>
                <Row>
                    <DropDown
                        label="College bus needed?"
                        options={{ "Yes": "Yes", "No": "No" }}
                        registerProps={register("college_bus")}
                    />
                    <DropDown
                        label="Boarding Point"
                        options={options['boarding_point']}
                        registerProps={register("boarding_point")}
                        value = "value"
                    />
                    <InputField
                        label="Sports Interested"
                        registerProps={register("sports_int")}
                        type="text"
                        error={errors.sports_int && errors.sports_int.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label="First Graduate Application No."
                        registerProps={register("first_gr_appno")}
                        type="text"
                        error={errors.first_gr_appno && errors.first_gr_appno.message}
                    />
                    <DropDown
                        label="How did you choose this college?"
                        options={{ "Yes": "Yes", "No": "No" }}
                        registerProps={register("choose_college")}
                    />
                </Row>
            </Form>
        </div>
    )
}

export default AdditionalDetails