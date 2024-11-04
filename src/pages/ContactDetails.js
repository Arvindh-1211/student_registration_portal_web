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
import Loading from "../Components/Loading";
import Error from "../Components/Error";

function ContactDetails() {
    const navigate = useNavigate();
    const applicationNo = useSelector((state) => state.applicationNo.value)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({
        stu_mobile_no: '',
        stu_email_id: '',
        parent_mobile_no: '',
        parent_email_id: '',
        nominee_name: '',
        nominee_age: '',
        nominee_relation: '',
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
            setError(null)
            const optionsArray = Object.keys(options);
            const fetchedOptions = await Promise.all(
                optionsArray.map((option) => services.fetchFromMaster(option))
            );
            if (!fetchedOptions[0]) {
                setError("Error fetching options!")
            }
            const newOptions = {};
            optionsArray.forEach((option, index) => {
                newOptions[option] = fetchedOptions[index];
            })
            setOptions(newOptions);
        };

        const init = async () => {
            setIsLoading(true)
            await getOptions();
            await getDefaultValues();
            setIsLoading(false)
        };

        if(applicationNo){
            init();
        } else {
            navigate('/')
        }
    }, [])

    const onSubmit = async (data) => {
        setIsLoading(true)
        setError(null)
        const response = await services.updateData(applicationNo, data)

        if (response) {
            navigate('/tnea_details')
        } else {
            setError("Error submitting form!")

        }
        setIsLoading(false)
    }

    return (
        <div>
            {isLoading && <Loading />}
            {error && <Error message={error} />}
            <Form handleNext={handleSubmit(onSubmit)} heading="Contact & Insurance Details" handleBack={() => { navigate('/parent_details') }} >
                <div className="form-sub-header">Contact Details</div>
                <Row>
                    <InputField
                        label="Student's Phone Number"
                        registerProps={register("stu_mobile_no")}
                        type='number'
                        error={errors.stu_mobile_no && errors.stu_mobile_no.message}
                    />
                    <InputField
                        label="Student's Email ID"
                        registerProps={register("stu_email_id")}
                        type='text'
                        error={errors.stu_email_id && errors.stu_email_id.message}
                    />
                </Row>

                <Row>
                    <InputField
                        label="Parent's Phone Number"
                        registerProps={register("parent_mobile_no")}
                        type='number'
                        error={errors.parent_mobile_no && errors.parent_mobile_no.message}
                    />
                    <InputField
                        label="Parent's Email ID"
                        registerProps={register("parent_email_id")}
                        type='text'
                        error={errors.parent_email_id && errors.parent_email_id.message}
                    />
                </Row>

                <div className="form-sub-header">Insurance Details</div>
                <Row>
                    <DropDown
                        label="Nominee's Relation"
                        options={options['nominee_relation']}
                        registerProps={register("nominee_relation")}
                    />
                    <InputField
                        label="Nominee's Name"
                        registerProps={register("nominee_name")}
                        type='text'
                        error={errors.nominee_name && errors.nominee_name.message}
                    />
                    <InputField
                        label="Nominee's Age"
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