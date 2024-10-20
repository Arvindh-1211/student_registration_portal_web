import * as Yup from 'yup';

const PersonalDetails = Yup.object().shape({
    student_name: Yup.string()
        .matches(/^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/, "Name should contain only characters and spaces")
        .required('Name is required'),

    initial: Yup.string()
        .matches(/^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/, "Name should contain only characters and spaces")
        .required('Name is required'),

    dob: Yup.string()
        .required("Date of birth is required"),

    age: Yup.string()
        .length(2, "Age must be between 10 and 99")
        .required("Age is required"),

    aadhar_no: Yup.string()
        .length(12, "Must be 12 digits")
        .required('Aadhar Number is required'),
})

const ParentDetails = Yup.object().shape({
    father_name: Yup.string()
        .matches(/^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/, "Name should contain only characters and spaces"),

    parent_income: Yup.number()
        .min(0, "Income should be positive"),

    work_area: Yup.string(),

    mother_name: Yup.string()
        .matches(/^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/, "Name should contain only characters and spaces"),

    parent_income_mother: Yup.number()
        .min(0, "Income should be positive"),

    work_area_mother: Yup.string(),

    gaurdian_name: Yup.string()
        .matches(/^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/, "Name should contain only characters and spaces"),
})

const ContactDetails = Yup.object().shape({
    stu_mobile_no: Yup.string()
        .length(10, "Phone Number must be 10 digits")
        .required("Student phone number is required"),

    stu_email_id: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

    parent_mobile_no: Yup.string()
        .length(10, "Phone Number must be 10 digits")
        .required("Parent phone number is required"),

    parent_email_id: Yup.string()
        .email("Invalid email"),

    nominee_name: Yup.string()
        .matches(/^[A-Za-zÀ-ÿ]+([ '-][A-Za-zÀ-ÿ]+)*$/, "Name should contain only characters and spaces"),

    nominee_age: Yup.string()
        .length(2, "Age must be between 10 and 99"),
})

const AddressDetails = Yup.object().shape({
    comm_add_street: Yup.string()
        .required("Street name is required"),

    comm_add_town: Yup.string()
        .required("Town is required"),

    comm_add_pincode: Yup.string()
        .length(6, "PIN code must be 6 digits")
        .required("PIN code is required"),

    perm_add_street: Yup.string()
        .required("Street name is required"),

    perm_add_town: Yup.string()
        .required("Town is required"),

    perm_add_pincode: Yup.string()
        .length(6, "PIN code must be 6 digits")
        .required("PIN code is required"),
})

const MarkDetails = Yup.object().shape({
    school_name: Yup.string()
        .required("School name is reuquired"),

    school_class: Yup.string()
        .required("School class is required"),

    school_tc_no: Yup.string()
        .matches(/^[A-Za-z0-9-]+$/, "Invalid TC number")
        .required("TC number is required"),

    school_tc_date: Yup.string()
        .required("TC date is required"),

    sch_attempt: Yup.string()
        .required("No. of attempts is required"),

    sch_reg1: Yup.string()
        .required("This field is required"),

    sch_cer1: Yup.string()
        .required("This field is required"),

    sch_tot_mark1: Yup.string()
        .required("This field is required"),

    sch_reg2: Yup.string()
        .required("This field is required"),

    sch_cer2: Yup.string()
        .required("This field is required"),

    sch_tot_mark2: Yup.string()
        .required("This field is required"),

    physics_secured: Yup.number()
        .min(0, "Mark cannot be negative")
        .max(200, "Mark is too big"),

    physics_max: Yup.number()
        .min(0, "Mark cannot be negative")
        .max(200, "Mark is too big"),

    physics_percentage: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    chemistry_secured: Yup.number()
        .min(0, "Mark cannot be negative")
        .max(200, "Mark is too big"),

    chemistry_max: Yup.number()
        .min(0, "Mark cannot be negative")
        .max(200, "Mark is too big"),

    chemistry_percentage: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    maths_secured: Yup.number()
        .min(0, "Mark cannot be negative")
        .max(200, "Mark is too big"),

    maths_max: Yup.number()
        .min(0, "Mark cannot be negative")
        .max(200, "Mark is too big"),

    maths_percentage: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    biology_secured: Yup.number()
        .min(0, "Mark cannot be negative")
        .max(200, "Mark is too big"),

    biology_max: Yup.number()
        .min(0, "Mark cannot be negative")
        .max(200, "Mark is too big"),

    biology_percentage: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    cs_secured: Yup.number()
        .min(0, "Mark cannot be negative")
        .max(200, "Mark is too big"),

    cs_max: Yup.number()
        .min(0, "Mark cannot be negative")
        .max(200, "Mark is too big"),

    cs_percentage: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    pcm_sec: Yup.number()
        .min(0, "Mark cannot be negative")
        .max(200, "Mark is too big"),

    pcm_max: Yup.number()
        .min(0, "Mark cannot be negative")
        .max(200, "Mark is too big"),

    pcm_per: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    phy_che: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    maths: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    cut_off: Yup.number()
        .min(0, "Cutoff cannot be negative")
        .max(200, "Cutoff must be less than 200"),

    diploma_first_sec: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_first_max: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_first_per: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    diploma_second_sec: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_second_max: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_second_per: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    diploma_third_sec: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_third_max: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_third_per: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    diploma_fourth_sec: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_fourth_max: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_fourth_per: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    diploma_fifth_sec: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_fifth_max: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_fifth_per: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    diploma_sixth_sec: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_sixth_max: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_sixth_per: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    diploma_seventh_sec: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_seventh_max: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_seventh_per: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    diploma_eighth_sec: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_eighth_max: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_eighth_per: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    diploma_nineth_sec: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_nineth_max: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_nineth_per: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    diploma_tenth_sec: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_tenth_max: Yup.number()
        .min(0, "Mark cannot be negative"),

    diploma_tenth_per: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    ug_mark_sec: Yup.number()
        .min(0, "Mark cannot be negative"),

    ug_mark_max: Yup.number()
        .min(0, "Mark cannot be negative"),

    ug_mark_per: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    I_II: Yup.number()
        .min(0, "Mark cannot be negative"),

    III_IV: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    V_VI: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    VII_VIII: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    IX_X: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),

    entrance_secured: Yup.number()
        .min(0, "Mark cannot be negative"),

    entrance_max: Yup.number()
        .min(0, "Mark cannot be negative"),

    entrance_percenteage: Yup.number()
        .min(0, "Percentage cannot be negative")
        .max(100, "Percentage cannot be more than 100"),
})

const TNEADetails = Yup.object().shape({
    tnea_app_no: Yup.number("Must be a number"),

    tnea_adm_no: Yup.number("Must be a number"),

    general_rank: Yup.number("Must be a number"),

    comm_rank: Yup.number("Must be a number"),

    tnea_pay_rec_no: Yup.string()
        .matches(/^[A-Za-z0-9 -]+$/, "Invalid Format"),

    tnea_pay_rec_date: Yup.string(),

    tnea_pay_rec_amt: Yup.string()
        .matches(/^[0-9 .]+$/, "Invalid amount"),

    tnea_pay_bank: Yup.string(),
})

const ScholarshipDetails = Yup.object().shape({
    adm_sch_amt1: Yup.string()
        .matches(/^[A-Za-z0-9 -]+$/, "Invalid Format"),

    adm_sch_amt2: Yup.string()
        .matches(/^[A-Za-z0-9 -]+$/, "Invalid Format"),
})

const AdditionalDetails = Yup.object().shape({
    father_qual: Yup.string(),

    mother_qual: Yup.string(),

    sports_int: Yup.string(),

    first_gr_appno: Yup.string()
        .matches(/^[A-Za-z0-9 -]+$/, "Invalid Format"),
});

const schema = {
    PersonalDetails,
    ParentDetails,
    ContactDetails,
    AddressDetails,
    MarkDetails,
    TNEADetails,
    ScholarshipDetails,
    AdditionalDetails,
}

export default schema