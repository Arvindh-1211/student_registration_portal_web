import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

import services from "../services/services";

import Form from '../Components/Form';
import Row from "../Components/Row";

function FinalReview() {
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
        nationality_id: '',
		father_name: '',
        mother_name: '',
        guardian_name: '',
        occupation: '',
        parent_income: '',
        work_area: '',
        designation: '',
        occupation_mother: '',
        parent_income_mother: '',
        work_area_mother: '',
        designation_mother: '',

        batch_id: '',
        acad_yr_id: '',
        branch_id: '',
        course_id: '',
        dept_id: '',
        branch_type: '',
        degree_level: '',
        year_of_admission: '',
        year_of_completion: '',

        regulation_id: '',
        university_id: '',
        student_cat_id: '',
        year_of_study: '',
        sem_of_study: '',
        section: '',
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
		stu_mobile_no: '',
        stu_email_id: '',
        parent_mobile_no: '',
        parent_email_id: '',
        nominee_name: '',
        nominee_age: '',
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
		adm_sch_name1: '',
        adm_sch_amt1: '',
        adm_sch_name2: '',
        adm_sch_amt2: '',
	})

	useEffect(() => {
		const getDefaultValues = async () => {
            const queryParams = Object.keys(formData).join(',')
            const fetchedData = await services.fetchData(applicationNo, queryParams)
            setFormData(fetchedData)
            if (formData.dob) {
                let dob = new Date(formData.dob).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
                setFormData((prevFormData) => ({ ...prevFormData, dob: dob }))
            }
			if (formData.tnea_pay_rec_date) {
				let tnea_pay_rec_date = new Date(formData.tnea_pay_rec_date).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
				setFormData((prevFormData) => ({ ...prevFormData, tnea_pay_rec_date: tnea_pay_rec_date }))
			}
            if (formData.school_tc_date) {
                let school_tc_date = new Date(formData.school_tc_date).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
                setFormData((prevFormData) => ({ ...prevFormData, school_tc_date: school_tc_date }))
            }
        }

		const getValue = async () => {
			if(formData.blood_group){
				const blood_group = await services.getValueFromMaster('blood_group', formData.blood_group)
				setFormData((prevFormData) => ({ ...prevFormData, blood_group: blood_group.value }))
			}
			if(formData.community_id){
				const community = await services.getValueFromMaster('community', formData.community_id)
				setFormData((prevFormData) => ({ ...prevFormData, community_id: community.value }))
			}
			if(formData.caste_id){
				const caste = await services.getValueFromMaster('caste', formData.caste_id)
				setFormData((prevFormData) => ({ ...prevFormData, caste_id: caste.value }))
			}
			if(formData.religion_id){
				const religion = await services.getValueFromMaster('religion', formData.religion_id)
				setFormData((prevFormData) => ({ ...prevFormData, religion_id: religion.value }))
			}
			if(formData.nationality_id){
				const nationality = await services.getValueFromMaster('nationality', formData.nationality_id)
				setFormData((prevFormData) => ({ ...prevFormData, nationality_id: nationality.value }))
			}
			if(formData.occupation){
				const occupation = await services.getValueFromMaster('occupation', formData.occupation)
				setFormData((prevFormData) => ({ ...prevFormData, occupation: occupation.value }))
			}
			if(formData.designation){
				const designation = await services.getValueFromMaster('designation', formData.designation)
				setFormData((prevFormData) => ({ ...prevFormData, designation: designation.value }))
			}
			if(formData.occupation_mother){
				const occupation_mother = await services.getValueFromMaster('occupation_mother', formData.occupation_mother)
				setFormData((prevFormData) => ({ ...prevFormData, occupation_mother: occupation_mother.value }))
			}
			if(formData.designation_mother){
				const designation_mother = await services.getValueFromMaster('designation_mother', formData.designation_mother)
				setFormData((prevFormData) => ({ ...prevFormData, designation_mother: designation_mother.value }))
			}
		}

		const init = async () => {
            await getDefaultValues();
			await getValue()
        };

        init();
	}, [])

	return (
		<div>

		</div>
	)
}

export default FinalReview
