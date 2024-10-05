// Form-5
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

import services from "../services/services";

import InputField from '../Components/InputField'
import DropDown from '../Components/DropDown';
import CheckBox from '../Components/CheckBox'
import Form from '../Components/Form';
import Row from "../Components/Row";


function ContactDetails() {
    const navigate = useNavigate();
    const applicationNo = useSelector((state) => state.applicationNo.value)

    let formData = {
        stu_mobile_no: '',
        stu_email_id: '',
        parent_mobile_no: '',
        parent_email_id: '',
        nominee_name: '',
        nominee_age: '',
    }

    const options = {
        'nominee_relation': {},
    }

    useEffect(() => {
        const queryParams = Object.keys(formData).join(',')
        formData = services.fetchData(applicationNo, queryParams)

        const optionsArray = Object.keys(options)
        optionsArray.forEach(async (option) => {
            options[option] = services.fetchFromMaster(option)
        })
    }, [])


    const { register, handleSubmit } = useForm({ defaultValues: formData });

    const onSubmit = async (data) => {
        services.updateData(applicationNo, data)
        navigate('/tnea_details')
    }

    return (
        <div>
            <Form handleNext={handleSubmit(onSubmit)} heading="Contact & Insurance Details" handleBack={() => { navigate('/parent_details') }} >
                <div className="form-sub-header">Contact Details</div>
                <Row>
                    <div className="form-adjust1">
                        <InputField
                            label='Student&apos;s Phone Number'
                            registerProps={register("stu_mobile_no")}
                            type='number'
                        />
                    </div>
                    <div className="form-adjust1">
                        <InputField
                            label='Student&apos;s Email ID'
                            registerProps={register("stu_email_id")}
                            type='email'
                        />
                    </div>
                </Row>

                <Row>
                    <div className="form-adjust1">
                        <InputField
                            label='Parent&apos;s Phone Number'
                            registerProps={register("parent_mobile_no")}
                            type='number'
                        />
                    </div>
                    <div className="form-adjust1">
                        <InputField
                            label='Parent&apos;s Email ID'
                            registerProps={register("parent_email_id")}
                            type='email'
                        />
                    </div>
                </Row>

                <div className="form-sub-header form-adjust2">Insurance Details</div>
                <Row>
                    <DropDown
                        label="Nominee&apos;s Relation"
                        options={options['nominee_relation']}
                        registerProps={register("nominee_relation")}
                    />
                    <InputField
                        label='Nominee&apos;s Name'
                        registerProps={register("nominee_name")}
                        type='text'
                    />
                    <InputField
                        label='Nomimee&apos;s Age'
                        registerProps={register("nominee_age")}
                        type='number'
                    />
                </Row>
            </Form>
        </div>
    )
}

export default ContactDetails