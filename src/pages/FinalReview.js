import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import services from "../services/services";

import { useNavigate } from 'react-router-dom';
import "../css/FinalReview.css"


function Detail({ label, value }) {
    return (
        <div className='detail'>
            <span className='detail-label'>
                <div>{label}</div><div>:</div>
            </span>
            {value}
        </div>
    )

}

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

        school_name: '',
        school_tc_no: '',
        school_tc_date: '',
        sch_attempt: '',
        sch_reg1: '',
        sch_cer1: '',
        sch_tot_mark1: '',
        sch_reg2: '',
        sch_cer2: '',
        sch_tot_mark2: '',
        physics_secured: '',
        physics_max: '',
        physics_percentage: '',
        chemistry_secured: '',
        chemistry_max: '',
        chemistry_percentage: '',
        maths_secured: '',
        maths_max: '',
        maths_percentage: '',
        biology_secured: '',
        biology_max: '',
        biology_percentage: '',
        cs_secured: '',
        cs_max: '',
        cs_percentage: '',
        pcm_sec: '',
        pcm_max: '',
        pcm_per: '',
        phy_che: '',
        maths: '',
        cut_off: '',
        diploma_first_sec: '',
        diploma_first_max: '',
        diploma_first_per: '',
        diploma_second_sec: '',
        diploma_second_max: '',
        diploma_second_per: '',
        diploma_third_sec: '',
        diploma_third_max: '',
        diploma_third_per: '',
        diploma_fourth_sec: '',
        diploma_fourth_max: '',
        diploma_fourth_per: '',
        diploma_fifth_sec: '',
        diploma_fifth_max: '',
        diploma_fifth_per: '',
        diploma_sixth_sec: '',
        diploma_sixth_max: '',
        diploma_sixth_per: '',
        diploma_seventh_sec: '',
        diploma_seventh_max: '',
        diploma_seventh_per: '',
        diploma_eighth_sec: '',
        diploma_eighth_max: '',
        diploma_eighth_per: '',
        diploma_ninenth_sec: '',
        diploma_ninenth_max: '',
        diploma_ninenth_per: '',
        diploma_tenth_sec: '',
        diploma_tenth_max: '',
        diploma_tenth_per: '',
        ug_mark_sec: '',
        ug_mark_max: '',
        ug_mark_per: '',
        I_II: '',
        III_IV: '',
        V_VI: '',
        VII_VIII: '',
        IX_X: '',
        entrance_secured: '',
        entrance_max: '',
        entrance_percenteage: '',
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
            if (formData.blood_group) {
                const blood_group = await services.getValueFromMaster('blood_group', formData.blood_group)
                setFormData((prevFormData) => ({ ...prevFormData, blood_group: blood_group.value }))
            }
            if (formData.community_id) {
                const community = await services.getValueFromMaster('community', formData.community_id)
                setFormData((prevFormData) => ({ ...prevFormData, community_id: community.value }))
            }
            if (formData.caste_id) {
                const caste = await services.getValueFromMaster('caste', formData.caste_id)
                setFormData((prevFormData) => ({ ...prevFormData, caste_id: caste.value }))
            }
            if (formData.religion_id) {
                const religion = await services.getValueFromMaster('religion', formData.religion_id)
                setFormData((prevFormData) => ({ ...prevFormData, religion_id: religion.value }))
            }
            if (formData.nationality_id) {
                const nationality = await services.getValueFromMaster('nationality', formData.nationality_id)
                setFormData((prevFormData) => ({ ...prevFormData, nationality_id: nationality.value }))
            }
            if (formData.occupation) {
                const occupation = await services.getValueFromMaster('occupation', formData.occupation)
                setFormData((prevFormData) => ({ ...prevFormData, occupation: occupation.value }))
            }
            if (formData.designation) {
                const designation = await services.getValueFromMaster('designation', formData.designation)
                setFormData((prevFormData) => ({ ...prevFormData, designation: designation.value }))
            }
            if (formData.occupation_mother) {
                const occupation_mother = await services.getValueFromMaster('occupation_mother', formData.occupation_mother)
                setFormData((prevFormData) => ({ ...prevFormData, occupation_mother: occupation_mother.value }))
            }
            if (formData.designation_mother) {
                const designation_mother = await services.getValueFromMaster('designation_mother', formData.designation_mother)
                setFormData((prevFormData) => ({ ...prevFormData, designation_mother: designation_mother.value }))
            }
            if (formData.batch_id) {
                const batch_id = await services.getValueFromMaster('batch_id', formData.batch_id)
                setFormData((prevFormData) => ({ ...prevFormData, batch_id: batch_id.value }))
            }
            if (formData.acad_yr_id) {
                const acad_yr_id = await services.getValueFromMaster('acad_yr_id', formData.acad_yr_id)
                setFormData((prevFormData) => ({ ...prevFormData, acad_yr_id: acad_yr_id.value }))
            }
            if (formData.branch_id) {
                const branch_id = await services.getValueFromMaster('branch_id', formData.branch_id)
                setFormData((prevFormData) => ({ ...prevFormData, branch_id: branch_id.value }))
            }
            if (formData.course_id) {
                const course_id = await services.getValueFromMaster('course_id', formData.course_id)
                setFormData((prevFormData) => ({ ...prevFormData, course_id: course_id.value }))
            }
            if (formData.dept_id) {
                const dept_id = await services.getValueFromMaster('dept_id', formData.dept_id)
                setFormData((prevFormData) => ({ ...prevFormData, dept_id: dept_id.value }))
            }
            if (formData.regulation_id) {
                const regulation_id = await services.getValueFromMaster('regulation_id', formData.regulation_id)
                setFormData((prevFormData) => ({ ...prevFormData, regulation_id: regulation_id.value }))
            }
            if (formData.university_id) {
                const university_id = await services.getValueFromMaster('university_id', formData.university_id)
                setFormData((prevFormData) => ({ ...prevFormData, university_id: university_id.value }))
            }
            if (formData.student_cat_id) {
                const student_cat_id = await services.getValueFromMaster('student_cat_id', formData.student_cat_id)
                setFormData((prevFormData) => ({ ...prevFormData, student_cat_id: student_cat_id.value }))
            }
            if (formData.quota_id) {
                const quota_id = await services.getValueFromMaster('quota_id', formData.quota_id)
                setFormData((prevFormData) => ({ ...prevFormData, quota_id: quota_id.value }))
            }
            if (formData.sch_qual_id) {
                const sch_qual_id = await services.getValueFromMaster('sch_qual_id', formData.sch_qual_id)
                setFormData((prevFormData) => ({ ...prevFormData, sch_qual_id: sch_qual_id.value }))
            }
        }

        const init = async () => {
            await getDefaultValues();
            await getValue()
            console.log(formData)
        };

        init();
    }, [])
    console.log(formData)

    return (
        <div className='form-container'>
            <div className='form'>
                <div className="form-sub-header">PERSONAL DETAILS:</div>
                <Detail label="Name" value="dsdfghj" />
                <div className="summary-sub-header">PARENT DETAILS:</div>
            </div>
        </div>
    )
}

export default FinalReview
