// Form - 5
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

import services from "../services/services";

import InputField from '../Components/InputField'
import DropDown from '../Components/DropDown';
import Form from '../Components/Form';
import Row from "../Components/Row";

function TNEADetails() {
    const navigate = useNavigate();
    const applicationNo = useSelector((state) => state.applicationNo.value)

    const [formData, setFormData] = useState({
        seat_cat: '',
        quota_id: '',
        tnea_app_no: '',
        tnea_adm_no: '',
        general_rank: '',
        comm_rank: '',
        tnea_pay_rec_no: '',
        tnea_pay_rec_date: '',
        tnea_pay_rec_amt: '',
        tnea_pay_bank: '',
    })

    const [options, setOptions] = useState({
        quota: {}
    });

    const { register, getValues, setValue, handleSubmit, reset } = useForm({ defaultValues: formData });

    useEffect(() => {
        const getDefaultValues = async () => {
            const queryParams = Object.keys(formData).join(',')
            const fetchedData = await services.fetchData(applicationNo, queryParams)
            setFormData(fetchedData)
            reset(fetchedData)
            if (getValues('tnea_pay_rec_date')) {
                let tnea_pay_rec_date = new Date(getValues('dob')).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
                setValue('tnea_pay_rec_date', tnea_pay_rec_date)
            }
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
        navigate('/scholarship_details')
    }

    return (
        <div>
            <Form handleNext={handleSubmit(onSubmit)} heading="TNEA Details" handleBack={() => { navigate('/contact_details') }} >
                <Row>
                    <DropDown
                        label="Seat Category"
                        options={{ 'GOVERNMENT': 'GOVERNMENT', 'MANAGEMENT': 'MANAGEMENT' }}
                        registerProps={register("seat_cat")}
                    />
                    <DropDown
                        label="Quota"
                        options={options['quota']}
                        registerProps={register("quota_id")}
                    />
                    <InputField
                        label="TNEA Application No."
                        registerProps={register("tnea_app_no")}
                        type="number"
                    />
                </Row>
                <Row>
                    <InputField
                        label="TNEA Admission No."
                        registerProps={register("tnea_adm_no")}
                        type="number"
                    />
                    <InputField
                        label="General Rank"
                        registerProps={register("general_rank")}
                        type="number"
                    />
                    <InputField
                        label="Community Rank"
                        registerProps={register("comm_rank")}
                        type="number"
                    />
                </Row>
                <div className="form-sub-header">TNEA Payment Details</div>
                <Row>
                    <InputField
                        label="Receipt No."
                        registerProps={register("tnea_pay_rec_no")}
                        type="number"
                    />
                    <InputField
                        label="Receipt Date"
                        registerProps={register("tnea_pay_rec_date")}
                        type="date"
                    />
                    <InputField
                        label="Receipt Amount"
                        registerProps={register("tnea_pay_rec_amt")}
                        type="number"
                    />
                </Row>
                <Row>
                    <InputField
                        label="Payment Bank"
                        placeholder="Bank Name, Place"
                        registerProps={register("tnea_pay_bank")}
                        type="text"
                    />
                </Row>
            </Form>
        </div>
    )
}

export default TNEADetails
