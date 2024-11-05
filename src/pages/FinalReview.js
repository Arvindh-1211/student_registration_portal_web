import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'

import { setApplicationNo } from '../store/applicationNoSlice';
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
    const dispatch = useDispatch();
    dispatch(setApplicationNo(1395));

    const [formData, setFormData] = useState({
        // Personal Details
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

        // Parent Details
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

        // Branch Details
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

        // Address Details
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

        // Contact Details
        stu_mobile_no: '',
        stu_email_id: '',
        parent_mobile_no: '',
        parent_email_id: '',
        nominee_name: '',
        nominee_age: '',

        // TNEA Details
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

        // Scholarship Details
        adm_sch_name1: '',
        adm_sch_amt1: '',
        adm_sch_name2: '',
        adm_sch_amt2: '',

        // Marks Details
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

        // Additional Details
        // father_qual: '',
        // mother_qual: '',
        // school_type: '',
        // college_bus: '',
        // boarding_point: '',
        // sports_int: '',
        // first_gr_appno: '',
        // choose_college: '',
    })

    useEffect(() => {
        let fetchedData
        const getDefaultValues = async () => {
            const queryParams = Object.keys(formData).join(',')
            fetchedData = await services.fetchData(applicationNo, queryParams)
            setFormData(fetchedData)
            if (fetchedData.dob) {
                let dob = new Date(fetchedData.dob).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
                setFormData((prevFormData) => ({ ...prevFormData, dob: dob }))
            }
            if (fetchedData.tnea_pay_rec_date) {
                let tnea_pay_rec_date = new Date(fetchedData.tnea_pay_rec_date).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
                setFormData((prevFormData) => ({ ...prevFormData, tnea_pay_rec_date: tnea_pay_rec_date }))
            }
            if (fetchedData.school_tc_date) {
                let school_tc_date = new Date(fetchedData.school_tc_date).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
                setFormData((prevFormData) => ({ ...prevFormData, school_tc_date: school_tc_date }))
            }
        }

        const getValue = async () => {
            if (fetchedData.blood_group) {
                const blood_group = await services.getValueFromMaster('blood_group', fetchedData.blood_group)
                setFormData((prevFormData) => ({ ...prevFormData, blood_group: blood_group }))
            }
            if (fetchedData.community_id) {
                const community = await services.getValueFromMaster('community', fetchedData.community_id)
                setFormData((prevFormData) => ({ ...prevFormData, community_id: community }))
            }
            if (fetchedData.caste_id) {
                const caste = await services.getValueFromMaster('caste', fetchedData.caste_id)
                setFormData((prevFormData) => ({ ...prevFormData, caste_id: caste }))
            }
            if (fetchedData.religion_id) {
                const religion = await services.getValueFromMaster('religion', fetchedData.religion_id)
                setFormData((prevFormData) => ({ ...prevFormData, religion_id: religion }))
            }
            if (fetchedData.nationality_id) {
                const nationality = await services.getValueFromMaster('nationality', fetchedData.nationality_id)
                setFormData((prevFormData) => ({ ...prevFormData, nationality_id: nationality }))
            }
            if (fetchedData.occupation) {
                const occupation = await services.getValueFromMaster('occupation', fetchedData.occupation)
                setFormData((prevFormData) => ({ ...prevFormData, occupation: occupation }))
            }
            if (fetchedData.designation) {
                const designation = await services.getValueFromMaster('designation', fetchedData.designation)
                setFormData((prevFormData) => ({ ...prevFormData, designation: designation }))
            }
            if (fetchedData.occupation_mother) {
                const occupation_mother = await services.getValueFromMaster('occupation', fetchedData.occupation_mother)
                setFormData((prevFormData) => ({ ...prevFormData, occupation_mother: occupation_mother }))
            }
            if (fetchedData.designation_mother) {
                const designation_mother = await services.getValueFromMaster('designation', fetchedData.designation_mother)
                setFormData((prevFormData) => ({ ...prevFormData, designation_mother: designation_mother }))
            }
            if (fetchedData.batch_id) {
                const batch_id = await services.getValueFromMaster('batch_id', fetchedData.batch_id)
                setFormData((prevFormData) => ({ ...prevFormData, batch_id: batch_id }))
            }
            if (fetchedData.acad_yr_id) {
                const acad_yr_id = await services.getValueFromMaster('acad_yr_id', fetchedData.acad_yr_id)
                setFormData((prevFormData) => ({ ...prevFormData, acad_yr_id: acad_yr_id }))
            }
            if (fetchedData.branch_id) {
                const branch_id = await services.getValueFromMaster('branch_id', fetchedData.branch_id)
                setFormData((prevFormData) => ({ ...prevFormData, branch_id: branch_id }))
            }
            if (fetchedData.course_id) {
                const course_id = await services.getValueFromMaster('course_id', fetchedData.course_id)
                setFormData((prevFormData) => ({ ...prevFormData, course_id: course_id }))
            }
            if (fetchedData.dept_id) {
                const dept_id = await services.getValueFromMaster('dept_id', fetchedData.dept_id)
                setFormData((prevFormData) => ({ ...prevFormData, dept_id: dept_id }))
            }
            if (fetchedData.regulation_id) {
                const regulation_id = await services.getValueFromMaster('regulation_id', fetchedData.regulation_id)
                setFormData((prevFormData) => ({ ...prevFormData, regulation_id: regulation_id }))
            }
            if (fetchedData.university_id) {
                const university_id = await services.getValueFromMaster('university_id', fetchedData.university_id)
                setFormData((prevFormData) => ({ ...prevFormData, university_id: university_id }))
            }
            if (fetchedData.student_cat_id) {
                const student_cat_id = await services.getValueFromMaster('student_cat_id', fetchedData.student_cat_id)
                setFormData((prevFormData) => ({ ...prevFormData, student_cat_id: student_cat_id }))
            }
            if (fetchedData.quota_id) {
                const quota_id = await services.getValueFromMaster('quota_id', fetchedData.quota_id)
                setFormData((prevFormData) => ({ ...prevFormData, quota_id: quota_id }))
            }
            if (fetchedData.sch_qual_id) {
                const sch_qual_id = await services.getValueFromMaster('sch_qual_id', fetchedData.sch_qual_id)
                setFormData((prevFormData) => ({ ...prevFormData, sch_qual_id: sch_qual_id }))
            }
        }

        const init = async () => {
            await getDefaultValues();
            await getValue()
        };

        init();
    }, [])



    return (
        <div className='form-container'>
            <div className='details-card'>
                <div className="detail-header">PERSONAL DETAILS
                    <hr></hr>
                </div>
                <div className='details-container'>
                    <div className='detail-row'>
                        <Detail label="Name" value={formData.legend + ' ' + formData.student_name + ' ' + formData.initial} />
                        <Detail label="Dob" value={formData.dob} />
                        <Detail label="Age" value={formData.age} />
                        <Detail label="Gender" value={formData.gender} />
                        <Detail label="Mother Tongue" value={formData.mother_tongue} />
                        <Detail label="Blood Group" value={formData.blood_group} />
                        <Detail label="Aadhar Number" value={formData.aadhar_no} />
                        <Detail label="Community" value={formData.community_id} />
                        <Detail label="Caste" value={formData.caste_id} />
                        <Detail label="Religion" value={formData.religion_id} />
                        <Detail label="Nationality" value={formData.nationality_id} />
                    </div>
                </div>
            </div>
            <div className='details-card'>
                <div className="detail-header">PARENT DETAILS
                    <hr></hr>
                </div>
                <div className='details-container'>
                    <div className='detail-row'>
                        <Detail label="Father Name" value={formData.father_name} />
                        <Detail label="Mother Name" value={formData.mother_name} />
                        <Detail label="Father's Occupation" value={formData.occupation} />
                        <Detail label="Mother's Occupation" value={formData.occupation_mother} />
                        <Detail label="Father's Income" value={formData.parent_income} />
                        <Detail label="Mother's Income" value={formData.parent_income_mother} />
                        <Detail label="Organisation/Company" value={formData.work_area} />
                        <Detail label="Organisation/Company" value={formData.work_area_mother} />
                        <Detail label="Designation" value={formData.designation} />
                        <Detail label="Designation" value={formData.designation_mother} />
                        <Detail label="Guardian Name" value={formData.guardian_name} />
                    </div>
                </div>
            </div>
            <div className='details-card'>
                <div className="detail-header">BRANCH DETAILS
                    <hr></hr>
                </div>
                <div className='details-container'>
                    <div className='detail-row'>
                        <Detail label="Batch" value={formData.batch_id} />
                        <Detail label="Academic Year" value={formData.acad_yr_id} />
                        <Detail label="Branch" value={formData.branch_id} />
                        <Detail label="Course" value={formData.course_id} />
                        <Detail label="Department" value={formData.dept_id} />
                        <Detail label="Branch Type" value={formData.branch_type} />
                        <Detail label="Degree Level" value={formData.degree_level} />
                        <Detail label="Year of Admission" value={formData.year_of_admission} />
                        <Detail label="Year of Completion" value={formData.year_of_completion} />
                        <Detail label="Regulation" value={formData.regulation_id} />
                        <Detail label="University" value={formData.university_id} />
                        <Detail label="Student Catagory" value={formData.student_cat_id} />
                        <Detail label="Year of Study" value={formData.year_of_study} />
                        <Detail label="Sem of Study" value={formData.sem_of_study} />
                        <Detail label="Section" value={formData.section} />
                    </div>
                </div>
            </div>
            <div className='details-card'>
                <div className="detail-header">ADDRESS DETAILS
                    <hr></hr>
                </div>
                <div className='details-container'>
                    <div className='detail-row'>
                        <div className='details-sub-header'>Communication Address</div>
                        <div className='details-sub-header'>Permanent Address</div>
                        <Detail label="Street" value={formData.comm_add_street} />
                        <Detail label="Street" value={formData.perm_add_street} />
                        <Detail label="Town" value={formData.comm_add_town} />
                        <Detail label="Town" value={formData.perm_add_town} />
                        <Detail label="City" value={formData.comm_add_city} />
                        <Detail label="City" value={formData.perm_add_city} />
                        <Detail label="District" value={formData.comm_add_district} />
                        <Detail label="District" value={formData.perm_add_district} />
                        <Detail label="State" value={formData.comm_add_state} />
                        <Detail label="State" value={formData.perm_add_state} />
                        <Detail label="Country" value={formData.comm_add_country} />
                        <Detail label="Country" value={formData.perm_add_country} />
                        <Detail label="Pincode" value={formData.comm_add_pincode} />
                        <Detail label="Pincode" value={formData.perm_add_pincode} />
                        <Detail label="Area Location" value={formData.area_location} />
                    </div>
                </div>
            </div>
            <div className='details-card'>
                <div className="detail-header">CONTACT DETAILS
                    <hr></hr>
                </div>
                <div className='details-container'>
                    <div className='detail-row'>
                        <Detail label="Student's Phone Number" value={formData.stu_mobile_no} />
                        <Detail label="Student's Email ID" value={formData.stu_email_id} />
                        <Detail label="Parent's Phone Number" value={formData.parent_mobile_no} />
                        <Detail label="Parent's Email ID" value={formData.parent_email_id} />
                        <Detail label="Nominee's Relation" value={formData.nominee_relation} />
                        <Detail label="Nominee's Name" value={formData.nominee_name} />
                        <Detail label="Nominee's Age" value={formData.nominee_age} />
                    </div>
                </div>
            </div>
            <div className='details-card'>
                <div className="detail-header">TNEA DETAILS
                    <hr></hr>
                </div>
                <div className='details-container'>
                    <div className='detail-row'>
                        <Detail label="Seat Category" value={formData.seat_cat} />
                        <div className='details-sub-header'>TNEA Payment Details</div>
                        <Detail label="Quota" value={formData.quota_id} />
                        <Detail label="Receipt No." value={formData.tnea_pay_rec_no} />
                        <Detail label="TNEA Application No." value={formData.tnea_app_no} />
                        <Detail label="Receipt Date" value={formData.tnea_pay_rec_date} />
                        <Detail label="TNEA Admission No." value={formData.tnea_adm_no} />
                        <Detail label="Receipt Amount" value={formData.tnea_pay_rec_amt} />
                        <Detail label="General Rank" value={formData.general_rank} />
                        <Detail label="Payment Bank" value={formData.tnea_pay_bank} />
                        <Detail label="Community Rank" value={formData.comm_rank} />

                    </div>
                </div>
            </div>
            <div className='details-card'>
                <div className="detail-header">SCHOLARSHIP DETAILS
                    <hr></hr>
                </div>
                <div className='details-container'>
                    <div className='detail-row'>
                        <Detail label="Scholarship-1" value={formData.adm_sch_name1} />
                        <Detail label="Amount-1" value={formData.adm_sch_amt1} />
                        <Detail label="Scholarship-2" value={formData.adm_sch_name2} />
                        <Detail label="Amount-2" value={formData.adm_sch_amt2} />
                    </div>
                </div>
            </div>
            <div className='details-card'>
                <div className="detail-header">MARK DETAILS
                    <hr></hr>
                </div>
                <div className='details-container'>
                    <div className='detail-row'>
                        <Detail label="School Name" value={formData.school_name} />
                        <Detail label="School Board" value={formData.school_board} />
                        <Detail label="School class" value={formData.school_class} />
                        <Detail label="TC Number" value={formData.school_tc_no} />
                        <Detail label="TC Date" value={formData.school_tc_date} />
                        <Detail label="Qualification" value={formData.sch_qual_id} />
                        <Detail label="School Year of Passing" value={formData.sch_yr_pass} />
                        <Detail label="Study state" value={formData.sch_study_state} />
                        <Detail label="Medium of Instruction" value={formData.study_medium} />
                        <Detail label="Number of Attempts" value={formData.sch_attempt} />

                        <div className='details-sub-header'>Marksheet Details</div>
                        <div></div>
                        <Detail label="Register Number 1" value={formData.sch_reg1} />
                        <Detail label="Register Number 2" value={formData.sch_reg2} />
                        <Detail label="Certificate Name" value={formData.sch_cer1} />
                        <Detail label="Certificate Name" value={formData.sch_cer2} />
                        <Detail label="Total Marks" value={formData.sch_tot_mark1} />
                        <Detail label="Total Marks" value={formData.sch_tot_mark2} />

                        <div className='details-sub-header'>HSC Details</div>
                        <div></div>
                        {/* <Detail label="Physics Marks" value={formData.physics_secured + '/'+ formData.physics_max} /> */}

                        <Detail label="Physics Marks Secured" value={formData.physics_secured} />
                        <Detail label="Chemistry Marks Secured" value={formData.chemistry_secured} />
                        <Detail label="Physics Max Marks" value={formData.physics_max} />
                        <Detail label="Chemistry Max Marks" value={formData.chemistry_max} />
                        <Detail label="Physics Percentage" value={formData.physics_percentage} />
                        <Detail label="Chemistry Percentage" value={formData.chemistry_percentage} />


                        <Detail label="Maths Marks Secured" value={formData.maths_secured} />
                        <Detail label="Biology Marks Secured" value={formData.biology_secured} />
                        <Detail label="Maths Max Marks" value={formData.maths_max} />
                        <Detail label="Biology Max Marks" value={formData.biology_max} />
                        <Detail label="Maths Percentage" value={formData.maths_percentage} />
                        <Detail label="Biology Percentage" value={formData.biology_percentage} />


                        <Detail label="CS Marks Secured" value={formData.cs_secured} />
                        <Detail label="Physics + Chemistry Secured" value={formData.phy_che} />
                        <Detail label="CS Max Marks" value={formData.cs_max} />
                        <Detail label="Mathematics Secured" value={formData.maths} />
                        <Detail label="CS Percentage" value={formData.cs_percentage} />
                        <Detail label="Cut Off" value={formData.cut_off} />
                        <Detail label="PCM Secured" value={formData.pcm_sec} />
                        <div></div>
                        <Detail label="PCM Max Marks" value={formData.pcm_max} />
                        <div></div>
                        <Detail label="PCM Percentage" value={formData.pcm_per} />
                        <div></div>

                        <div className='details-sub-header'>Diploma/UG/PG Details</div>
                        <div></div>
                        <Detail label="I sem Marks Secured" value={formData.diploma_first_sec} />
                        <Detail label="II sem Marks Secured" value={formData.diploma_second_sec} />
                        <Detail label='I sem Max Marks' value={formData.diploma_first_max} />
                        <Detail label="II sem Max Marks" value={formData.diploma_second_max} />
                        <Detail label='I sem percentage' value={formData.diploma_first_per} />
                        <Detail label="II sem percentage" value={formData.diploma_second_per} />


                        <Detail label="III sem Marks Secured" value={formData.diploma_third_sec} />
                        <Detail label="IV sem Marks Secured" value={formData.diploma_fourth_sec} />
                        <Detail label="III sem Max Marks" value={formData.diploma_third_max} />
                        <Detail label="IV sem Max Marks" value={formData.diploma_fourth_max} />
                        <Detail label="III sem percentage" value={formData.diploma_third_per} />
                        <Detail label="IV sem percentage" value={formData.diploma_fourth_per} />


                        <Detail label="V sem Marks Secured" value={formData.diploma_fifth_sec} />
                        <Detail label="VI sem Marks Secured" value={formData.diploma_sixth_sec} />
                        <Detail label="V sem Max Marks" value={formData.diploma_fifth_max} />
                        <Detail label="VI sem Max Marks" value={formData.diploma_sixth_max} />
                        <Detail label="V sem percentage" value={formData.diploma_fifth_per} />
                        <Detail label="VI sem percentage" value={formData.diploma_sixth_per} />


                        <Detail label="VII sem Marks Secured" value={formData.diploma_seventh_sec} />
                        <Detail label="VIII sem Marks Secured" value={formData.diploma_eighth_sec} />
                        <Detail label="VII sem Max Marks" value={formData.diploma_seventh_max} />
                        <Detail label="VIII sem Max Marks" value={formData.diploma_eighth_max} />
                        <Detail label="VII sem percentage" value={formData.diploma_seventh_per} />
                        <Detail label="VIII sem percentagee" value={formData.diploma_eighth_per} />


                        <Detail label="IX sem Marks Secured" value={formData.diploma_ninenth_sec} />
                        <Detail label="X sem Marks Secured" value={formData.diploma_tenth_sec} />
                        <Detail label="IX sem Max Marks" value={formData.diploma_ninenth_max} />
                        <Detail label="X sem Max Markss" value={formData.diploma_tenth_max} />
                        <Detail label="IX sem percentage" value={formData.diploma_ninenth_per} />
                        <Detail label="X sem percentage" value={formData.diploma_tenth_per} />


                        <Detail label="I + II Marks" value={formData.I_II} />
                        <Detail label="III + IV Marks" value={formData.III_IV} />
                        <Detail label="V + VI Marks" value={formData.V_VI} />
                        <Detail label="VII + VIII Marks" value={formData.VII_VIII} />
                        <Detail label="IX + X Marks" value={formData.IX_X} />
                        <div></div>
                        <Detail label="Entrance Secured" value={formData.entrance_secured} />
                        <Detail label="UG Marks Secured" value={formData.ug_mark_sec} />
                        <Detail label="Entrance Max Marks" value={formData.entrance_max} />
                        <Detail label="UG Max Marks" value={formData.ug_mark_max} />
                        <Detail label="Entrance Percentage" value={formData.entrance_percenteage} />
                        <Detail label="UG Percentage" value={formData.ug_mark_per} />
                    </div>
                </div>
            </div>
            <div className='details-card'>
                <div className="detail-header">ADDITIONAL DETAILS
                    <hr></hr>
                </div>
                <div className='details-container'>
                    <div className='detail-row'>
                        <Detail label="Father Qualification" value={formData.father_qual} />
                        <Detail label="Mother Qualification" value={formData.mother_qual} />
                        <Detail label="College bus needed?" value={formData.college_bus} />
                        <Detail label="Boarding Point" value={formData.boarding_point} />
                        <Detail label="School Type" value={formData.school_type} />
                        <Detail label="Sports Interested" value={formData.sports_int} />
                        <Detail label="First Graduate Application No." value={formData.first_gr_appno} />
                        <Detail label="How did you choose this college?" value={formData.choose_college} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinalReview
