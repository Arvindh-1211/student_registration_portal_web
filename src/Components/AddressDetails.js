import React, { useEffect, useState } from 'react'
import axios from "axios";

import Header from './Header'
import InputField from './InputField'
import Button from './Button'
import CheckBox from './CheckBox';

function AddressDetails() {
    const [isChecked, setIsChecked] = useState(false)
    const [address, setAddress] = useState({
        street: '',
        town: '',
        district: '',
        state: '',
        country: '',
        pincode: '',
    });
    const [tempAddress, setTempAddress] = useState({
        street: '',
        town: '',
        district: '',
        state: '',
        country: '',
        pincode: '',
    });

    useEffect(() => {
        isChecked && setTempAddress(address)
    }, [isChecked])

    const handleSubmit = (e) => {
        e.preventDefault()

        const req = {
            perm_address : address,
            temp_address : tempAddress
        }

        axios.post('http://localhost:8000/', req)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <Header />
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-header'>Address Details</div>
                <div className='form-sub-header'>Permanent Address</div>
                <div className='form-fields'>
                    <InputField label="Street" onChange={(e) => { setAddress((prevAddress) => ({ ...prevAddress, ['street']: e.target.value })) }} type="text" />
                    <InputField label="Town" onChange={(e) => { setAddress((prevAddress) => ({ ...prevAddress, ['town']: e.target.value })) }} type="text" />
                    <InputField label="District" onChange={(e) => { setAddress((prevAddress) => ({ ...prevAddress, ['district']: e.target.value })) }} type="text" />
                    <InputField label="State" onChange={(e) => { setAddress((prevAddress) => ({ ...prevAddress, ['state']: e.target.value })) }} type="text" />
                    <InputField label="Country" onChange={(e) => { setAddress((prevAddress) => ({ ...prevAddress, ['country']: e.target.value })) }} type="text" />
                    <InputField label="Pincode" onChange={(e) => { setAddress((prevAddress) => ({ ...prevAddress, ['pincode']: e.target.value })) }} type="text" />
                </div>
                <div className='form-sub-header'>Temporary Address</div>
                <CheckBox label="Same as permanent address" onClick={() => { setIsChecked(!isChecked) }} />
                <div className='form-fields'>
                    <InputField label="Street" value={tempAddress['street']} isDisabled={isChecked ? true : false} onChange={(e) => { setTempAddress((prevAddress) => ({ ...prevAddress, ['street']: e.target.value })) }} type="text" />
                    <InputField label="Town" value={tempAddress['town']} isDisabled={isChecked ? true : false} onChange={(e) => { setTempAddress((prevAddress) => ({ ...prevAddress, ['town']: e.target.value })) }} type="text" />
                    <InputField label="District" value={tempAddress['district']} isDisabled={isChecked ? true : false} onChange={(e) => { setTempAddress((prevAddress) => ({ ...prevAddress, ['district']: e.target.value })) }} type="text" />
                    <InputField label="State" value={tempAddress['state']} isDisabled={isChecked ? true : false} onChange={(e) => { setTempAddress((prevAddress) => ({ ...prevAddress, ['state']: e.target.value })) }} type="text" />
                    <InputField label="Country" value={tempAddress['country']} isDisabled={isChecked ? true : false} onChange={(e) => { setTempAddress((prevAddress) => ({ ...prevAddress, ['country']: e.target.value })) }} type="text" />
                    <InputField label="Pincode" value={tempAddress['pincode']} isDisabled={isChecked ? true : false} onChange={(e) => { setTempAddress((prevAddress) => ({ ...prevAddress, ['pincode']: e.target.value })) }} type="text" />
                </div>
                <div className='button-container'>
                    <Button value="Next" onClick={handleSubmit} />
                </div>
            </form>
        </div>
    )
}

export default AddressDetails
