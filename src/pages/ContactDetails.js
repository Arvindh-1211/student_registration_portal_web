// Form-5
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

function ContactDetails() {
    const navigate = useNavigate();
    const applicationNo = useSelector((state) => state.applicationNo.value)

    const [formData, setFormData] = useState({
        stu_mobile_no: '',
        stu_email_id: '',
        parent_mobile_no: '',
        parent_email_id: '',
        nominee_name: '',
        nominee_age: '',
    })

    const [options, setOptions] = useState({
        'nominee_relation': {},
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: formData, resolver: yupResolver(schema.ContactDetails) });

    useEffect(() => {
        const getDefaultValues = async () => {
            const queryParams = Object.keys(formData).join(',')
            const fetchedData = await services.fetchData(applicationNo, queryParams)
            setFormData(fetchedData)
            reset(fetchedData)
        }

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
        };

        const init = async () => {
            await getOptions();
            await getDefaultValues();
        };

        init();
    }, [])

    const onSubmit = async (data) => {
        services.updateData(applicationNo, data)
        navigate('/tnea_details')
    }

    return (
        <div>
            <Form handleNext={handleSubmit(onSubmit)} heading="Contact & Insurance Details" handleBack={() => { navigate('/parent_details') }} >
                <div className="form-sub-header">Contact Details</div>
                <Row>
                    <InputField
                        label='Student&apos;s Phone Number'
                        registerProps={register("stu_mobile_no")}
                        type='number'
                        error={errors.stu_mobile_no && errors.stu_mobile_no.message}
                    />
                    <InputField
                        label='Student&apos;s Email ID'
                        registerProps={register("stu_email_id")}
                        type='text'
                        error={errors.stu_email_id && errors.stu_email_id.message}
                    />
                </Row>

                <Row>
                    <InputField
                        label='Parent&apos;s Phone Number'
                        registerProps={register("parent_mobile_no")}
                        type='number'
                        error={errors.parent_mobile_no && errors.parent_mobile_no.message}
                    />
                    <InputField
                        label='Parent&apos;s Email ID'
                        registerProps={register("parent_email_id")}
                        type='text'
                        error={errors.parent_email_id && errors.parent_email_id.message}
                    />
                </Row>

                <div className="form-sub-header">Insurance Details</div>
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
                        error={errors.nominee_name && errors.nominee_name.message}
                    />
                    <InputField
                        label='Nomimee&apos;s Age'
                        registerProps={register("nominee_age")}
                        type='number'
                        error={errors.nominee_age && errors.nominee_age.message}
                    />
                </Row>
            </Form>
        </div>
    )
}

export default ContactDetails