// Form - 6
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

function ScholarshipDetails() {
    const navigate = useNavigate();
    const applicationNo = useSelector((state) => state.applicationNo.value)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({
        adm_sch_name1: '',
        adm_sch_amt1: '',
        adm_sch_name2: '',
        adm_sch_amt2: '',
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: formData, resolver: yupResolver(schema.ScholarshipDetails) });

    useEffect(() => {
        const getDefaultValues = async () => {
            setIsLoading(true)
            const queryParams = Object.keys(formData).join(',')
            const fetchedData = await services.fetchData(applicationNo, queryParams)
            setFormData(fetchedData)
            reset(fetchedData)
            setIsLoading(false)
        }

        setIsLoading(false)
        if(applicationNo){
            getDefaultValues();
        } else {
            navigate('/')
        }
    }, [])

    const onSubmit = async (data) => {
        setIsLoading(true)
        setError(null)
        const response = await services.updateData(applicationNo, data)

        if (response) {
            navigate('/mark_details')
        } else {
            setError("Error submitting form!")

        }
        setIsLoading(false)
    }

    return (
        <div>
            {isLoading && <Loading />}
            {error && <Error message={error} />}
            <Form handleNext={handleSubmit(onSubmit)} heading="Scholarship Details" handleBack={() => { navigate('/tnea_details') }} >
                <Row>
                    <DropDown
                        label="Scholarship-1"
                        options={{ "1": "1", "2": "2", "3": "3" }}
                        registerProps={register("adm_sch_name1")}
                    />
                    <InputField
                        label="Amount-1"
                        registerProps={register("adm_sch_amt1")}
                        type="number"
                        error={errors.adm_sch_amt1 && errors.adm_sch_amt1.message}
                    />
                </Row>
                <Row>
                    <DropDown
                        label="Scholarship-2"
                        options={{ "1": "1", "2": "2", "3": "3" }}
                        registerProps={register("adm_sch_name2")}
                    />
                    <InputField
                        label="Amount-2"
                        registerProps={register("adm_sch_amt2")}
                        type="number"
                        error={errors.adm_sch_amt2 && errors.adm_sch_amt2.message}
                    />
                </Row>
            </Form>
        </div>
    )
}

export default ScholarshipDetails
