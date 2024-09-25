import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import services from "../services/services";

import InputField from '../Components/InputField'
import DropDown from '../Components/DropDown';
import CheckBox from '../Components/CheckBox'
import Form from '../Components/Form';
import Row from "../Components/Row";


function AddressDetails() {
    const navigate = useNavigate();
    const [isAddressSame, setIsAddressSame] = useState(false)

    let formData = {
        comm_add_street: '',
        comm_add_town: '',
        comm_add_city: '',
        comm_add_district: '',
        comm_add_state: '',
        comm_add_country: '',
        comm_add_pincode: '',
        perm_add_street: '',
        perm_add_town: '',
        perm_add_city: '',
        perm_add_district: '',
        perm_add_state: '',
        perm_add_country: '',
        perm_add_pincode: '',
        area_location: '',
    }

    const options = {
        'city': {},
        'district': {},
        'state': {},
        'country': {},
    }

    useEffect(() => {
        const queryParams = Object.keys(formData).join(',')
        formData = services.fetchData(queryParams)

        const optionsArray = Object.keys(options)
        optionsArray.forEach(async (option) => {
            options[option] = services.fetchOption(option)
        })
    }, [])


    const { register, getValues, setValue, handleSubmit } = useForm({ defaultValues: formData });

    useEffect(() => {
        if (isAddressSame) {
            setValue('perm_add_street', getValues('comm_add_street'));
            setValue('perm_add_town', getValues('comm_add_town'));
            setValue('perm_add_city', getValues('comm_add_city'));
            setValue('perm_add_district', getValues('comm_add_district'));
            setValue('perm_add_state', getValues('comm_add_state'));
            setValue('perm_add_country', getValues('comm_add_country'));
            setValue('perm_add_pincode', getValues('comm_add_pincode'));
        }
    }, [isAddressSame, getValues, setValue]);


    const onSubmit = async (data) => {
        services.updateData(data)
        navigate('/contact_details')
    }

    return (
        <div>
            <Form handleNext={handleSubmit(onSubmit)} heading="Address Details" >
                <div className="form-sub-header">Communication Address</div>
                <Row>
                    <InputField
                        label='Street'
                        registerProps={register("comm_add_street")}
                        type='text'
                    />
                    <InputField
                        label='Town'
                        registerProps={register("comm_add_town")}
                        type='text'
                    />
                    <DropDown
                        label="City"
                        options={options['city']}
                        registerProps={register("comm_add_city")}
                    />
                </Row>

                <Row>
                    <DropDown
                        label="District"
                        options={options['district']}
                        registerProps={register("comm_add_district")}
                    />
                    <DropDown
                        label="State"
                        options={options['state']}
                        registerProps={register("comm_add_state")}
                    />
                    <DropDown
                        label="Country"
                        options={options['country']}
                        registerProps={register("comm_add_country")}
                    />
                </Row>

                <Row>
                    <InputField
                        label='Pincode'
                        registerProps={register("comm_add_pincode")}
                        type='number'
                    />
                </Row>

                <CheckBox
                    label='Same as Communication Address'
                    onClick={() => {
                        setIsAddressSame(!isAddressSame)
                    }} />

                <div className="form-sub-header">Permanent Address</div>
                <Row>
                    <InputField
                        label='Street'
                        registerProps={register("perm_add_street")}
                        type='text'
                        // value={permAddress.street}
                        readOnly={isAddressSame}
                    />
                    <InputField
                        label='Town'
                        registerProps={register("perm_add_town")}
                        type='text'
                        // value={permAddress.town}
                        readOnly={isAddressSame}
                    />
                    <DropDown
                        label="City"
                        options={options['city']}
                        registerProps={register("perm_add_city")}
                    // value={permAddress.city}
                    />
                </Row>

                <Row>
                    <DropDown
                        label="District"
                        options={options['district']}
                        registerProps={register("perm_add_district")}
                    // value={permAddress.district}
                    />
                    <DropDown
                        label="State"
                        options={options['state']}
                        registerProps={register("perm_add_state")}
                    // value={permAddress.state}
                    />
                    <DropDown
                        label="Country"
                        options={options['country']}
                        registerProps={register("perm_add_country")}
                    // value={permAddress.country}
                    />
                </Row>

                <Row>
                    <InputField
                        label='Pincode'
                        registerProps={register("perm_add_pincode")}
                        type='number'
                        // value={permAddress.pincode}
                        readOnly={isAddressSame}
                    />
                </Row>
                <Row>
                    <DropDown
                        label="Area Location"
                        options={{ "Rural": "Rural", "Urban": "Urban" }}
                        registerProps={register("area_location")}
                    />
                </Row>
            </Form>
        </div>
    )
}

export default AddressDetails