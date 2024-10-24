// Form-5
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

import services from "../services/services";
import schema from "../utils/validation";

import InputField from '../Components/InputField'
import DropDown from '../Components/DropDown';
import Form from '../Components/Form';
import Row from "../Components/Row";
import { NumberSchema } from "yup";


function MarkDetails() {
    const navigate = useNavigate();
    const applicationNo = useSelector((state) => state.applicationNo.value)

    const [formData, setFormData] = useState({
        school_name: null,
        school_tc_no: null,
        school_tc_date: null,
        sch_attempt: null,

        sch_reg1: null,
        sch_cer1: null,
        sch_tot_mark1: null,
        sch_reg2: null,
        sch_cer2: null,
        sch_tot_mark2: null,

        physics_secured: null,
        physics_max: null,
        physics_percentage: null,

        chemistry_secured: null,
        chemistry_max: null,
        chemistry_percentage: null,

        maths_secured: null,
        maths_max: null,
        maths_percentage: null,

        biology_secured: null,
        biology_max: null,
        biology_percentage: null,

        cs_secured: null,
        cs_max: null,
        cs_percentage: null,

        pcm_sec: null,
        pcm_max: null,
        pcm_per: null,

        phy_che: null,
        maths: null,
        cut_off: null,

        diploma_first_sec: null,
        diploma_first_max: null,
        diploma_first_per: null,

        diploma_second_sec: null,
        diploma_second_max: null,
        diploma_second_per: null,

        diploma_third_sec: null,
        diploma_third_max: null,
        diploma_third_per: null,

        diploma_fourth_sec: null,
        diploma_fourth_max: null,
        diploma_fourth_per: null,

        diploma_fifth_sec: null,
        diploma_fifth_max: null,
        diploma_fifth_per: null,

        diploma_sixth_sec: null,
        diploma_sixth_max: null,
        diploma_sixth_per: null,

        diploma_seventh_sec: null,
        diploma_seventh_max: null,
        diploma_seventh_per: null,

        diploma_eighth_sec: null,
        diploma_eighth_max: null,
        diploma_eighth_per: null,

        diploma_ninenth_sec: null,
        diploma_ninenth_max: null,
        diploma_ninenth_per: null,

        diploma_tenth_sec: null,
        diploma_tenth_max: null,
        diploma_tenth_per: null,

        ug_mark_sec: null,
        ug_mark_max: null,
        ug_mark_per: null,

        I_II: null,
        III_IV: null,
        V_VI: null,
        VII_VIII: null,
        IX_X: null,

        entrance_secured: null,
        entrance_max: null,
        entrance_percenteage: null,

        school_board:null,
        sch_qual_id:null,
        sch_yr_pass:null,
        sch_study_state:null,
        study_medium:null,
    })

    const [options, setOptions] = useState({
        'school_board': {},
        'sch_qual_id': {},
        'sch_yr_pass': {},
        'state': {},
        'study_medium': {},
    })

    const { handleSubmit, reset, register, watch, getValues, setValue, formState: { errors } } = useForm({ defaultValues: formData, resolver: yupResolver(schema.MarkDetails) });

    useEffect(() => {
        const getDefaultValues = async () => {
            const queryParams = Object.keys(formData).join(',')
            const fetchedData = await services.fetchData(applicationNo, queryParams)
            setFormData(fetchedData)
            reset(fetchedData)
            if (getValues('school_tc_date')) {
                let school_tc_date = new Date(getValues('school_tc_date')).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
                setValue('school_tc_date', school_tc_date)
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


    const calculatePercentage = (securedMarks, maxMarks, setFieldName) => {
        if (securedMarks && maxMarks) {
            const percentage = (securedMarks / maxMarks) * 100;
            setValue(setFieldName, percentage.toFixed(2));
            return percentage;
        } else {
            setValue(setFieldName, null);
        }
    };

    const physicsSecured = watch('physics_secured');
    const physicsMax = watch('physics_max');

    const chemistrySecured = watch('chemistry_secured');
    const chemistryMax = watch('chemistry_max');

    const mathsSecured = watch('maths_secured');
    const mathsMax = watch('maths_max');

    const biologySecured = watch('biology_secured');
    const biologyMax = watch('biology_max');

    const csSecured = watch('cs_secured');
    const csMax = watch('cs_max');

    const diplomaFirstSec = watch('diploma_first_sec');
    const diplomaFirstMax = watch('diploma_first_max');

    const diplomaSecondSec = watch('diploma_second_sec');
    const diplomaSecondMax = watch('diploma_second_max');

    const diplomaThirdSec = watch('diploma_third_sec');
    const diplomaThirdMax = watch('diploma_third_max');

    const diplomaFourthSec = watch('diploma_fourth_sec');
    const diplomaFourthMax = watch('diploma_fourth_max');

    const diplomaFifthSec = watch('diploma_fifth_sec');
    const diplomaFifthMax = watch('diploma_fifth_max');

    const diplomaSixthSec = watch('diploma_sixth_sec');
    const diplomaSixthMax = watch('diploma_sixth_max');

    const diplomaSeventhSec = watch('diploma_seventh_sec');
    const diplomaSeventhMax = watch('diploma_seventh_max');

    const diplomaEighthSec = watch('diploma_eighth_sec');
    const diplomaEighthMax = watch('diploma_eighth_max');

    const diplomaNinthSec = watch('diploma_ninenth_sec');
    const diplomaNinthMax = watch('diploma_ninenth_max');

    const diplomaTenthSec = watch('diploma_tenth_sec');
    const diplomaTenthMax = watch('diploma_tenth_max');

    const ugMarkSec = watch('ug_mark_sec');
    const ugMarkMax = watch('ug_mark_max');

    const entranceSecured = watch('entrance_secured');
    const entranceMax = watch('entrance_max');

    const phyPer = calculatePercentage(physicsSecured, physicsMax, 'physics_percentage');
    const chePer = calculatePercentage(chemistrySecured, chemistryMax, 'chemistry_percentage');
    const mathPer = calculatePercentage(mathsSecured, mathsMax, 'maths_percentage');
    const I_per = calculatePercentage(diplomaFirstSec, diplomaFirstMax, 'diploma_first_per');
    const II_per = calculatePercentage(diplomaSecondSec, diplomaSecondMax, 'diploma_second_per');
    const III_per = calculatePercentage(diplomaThirdSec, diplomaThirdMax, 'diploma_third_per');
    const IV_per = calculatePercentage(diplomaFourthSec, diplomaFourthMax, 'diploma_fourth_per');
    const V_per = calculatePercentage(diplomaFifthSec, diplomaFifthMax, 'diploma_fifth_per');
    const VI_per = calculatePercentage(diplomaSixthSec, diplomaSixthMax, 'diploma_sixth_per');
    const VII_per = calculatePercentage(diplomaSeventhSec, diplomaSeventhMax, 'diploma_seventh_per');
    const VIII_per = calculatePercentage(diplomaEighthSec, diplomaEighthMax, 'diploma_eighth_per');
    const IX_per = calculatePercentage(diplomaNinthSec, diplomaNinthMax, 'diploma_ninenth_per');
    const X_per = calculatePercentage(diplomaTenthSec, diplomaTenthMax, 'diploma_tenth_per');
    calculatePercentage(biologySecured, biologyMax, 'biology_percentage');
    calculatePercentage(csSecured, csMax, 'cs_percentage');
    calculatePercentage(ugMarkSec, ugMarkMax, 'ug_mark_per');
    calculatePercentage(entranceSecured, entranceMax, 'entrance_percenteage');

    const pcmSec = physicsSecured + chemistrySecured + mathsSecured === 0? null : physicsSecured + chemistrySecured + mathsSecured;
    const pcmMax = physicsMax + chemistryMax + mathsMax === 0? null : physicsMax + chemistryMax + mathsMax;
    setValue('pcm_sec', pcmSec);
    setValue('pcm_max', pcmMax);
    calculatePercentage(pcmSec, pcmMax, 'pcm_per');

    const phyChe = physicsSecured + chemistrySecured === 0? null : physicsSecured + chemistrySecured
    setValue('phy_che', phyChe);
    const phyChePer = phyPer + chePer;
    setValue('phy_che', phyChe === null? null : (phyChePer/2).toFixed(2));
    setValue('maths', mathPer);

    const cutOff = phyChe / 2 + mathsSecured === 0? null : phyChe / 2 + mathsSecured;
    setValue('cut_off', cutOff);

    const I_II_per = I_per == null || II_per == null? null : (I_per + II_per / 2).toFixed(2);
    setValue('I_II', I_II_per);

    const III_IV_per = III_per == null || IV_per == null? null : (III_per + IV_per / 2).toFixed(2);
    setValue('III_IV', III_IV_per);

    const V_VI_per = V_per == null || VI_per == null? null : (V_per + VI_per / 2).toFixed(2);
    setValue('V_VI', V_VI_per);

    const VII_VIII_per = VII_per == null || VIII_per == null? null : (VII_per + VIII_per / 2).toFixed(2);
    setValue('VII_VIII', VII_VIII_per);

    const IX_X_per = IX_per ==null || X_per == null? null : (IX_per + X_per / 2).toFixed(2);
    setValue('IX_X', IX_X_per);


    const onSubmit = async (data) => {
        services.updateData(applicationNo, data)
        navigate('/additional_details')
    }

    return (
        <div>
            <Form handleNext={handleSubmit(onSubmit)} heading="Mark Details" handleBack={() => { navigate('/contact_details') }} >
                <Row>
                    <InputField
                        label='School Name'
                        registerProps={register("school_name")}
                        type='text'
                        error={errors.school_name && errors.school_name.message}
                    />
                    <DropDown
                        label="School Board"
                        options={options['school_board']}
                        registerProps={register("school_board")}
                    />
                    <InputField
                        label='School class'
                        registerProps={register("school_class")}
                        type='text'
                        error={errors.school_class && errors.school_class.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='TC Number'
                        registerProps={register("school_tc_no")}
                        type='number'
                        error={errors.school_tc_no && errors.school_tc_no.message}
                    />
                    <InputField
                        label='TC Date'
                        registerProps={register("school_tc_date")}
                        type='date'
                        error={errors.school_tc_date && errors.school_tc_date.message}
                    />
                    <DropDown
                        label="Qualification"
                        options={options['sch_qual_id']}
                        registerProps={register("sch_qual_id")}
                    />
                </Row>
                <Row>
                    <DropDown
                        label="School Year of Passing"
                        options={options['sch_yr_pass']}
                        registerProps={register("sch_yr_pass")}
                        sorted = {false}
                    />
                    <DropDown
                        label="Study state"
                        options={options['state']}
                        registerProps={register("sch_study_state")}
                        value="value"
                    />
                    <DropDown
                        label="Medium of Instruction"
                        options={options['study_medium']}
                        registerProps={register("study_medium")}
                    />
                </Row>
                <Row>
                    <InputField
                        label='Number of Attempts'
                        registerProps={register("sch_attempt")}
                        type='number'
                        error={errors.sch_attempt && errors.sch_attempt.message}
                    />
                </Row>

                <hr></hr>
                <div className="form-sub-header">Marksheet Details</div>
                <Row>
                    <InputField
                        label='Register Number 1'
                        registerProps={register("sch_reg1")}
                        type='number'
                        error={errors.sch_reg1 && errors.sch_reg1.message}
                    />
                    <InputField
                        label='Certificate Name'
                        registerProps={register("sch_cer1")}
                        type='text'
                        error={errors.sch_cer1 && errors.sch_cer1.message}
                    />
                    <InputField
                        label='Total Marks'
                        registerProps={register("sch_tot_mark1")}
                        type='number'
                        error={errors.sch_tot_mark1 && errors.sch_tot_mark1.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='Register Number 2'
                        registerProps={register("sch_reg2")}
                        type='number'
                        error={errors.sch_reg2 && errors.sch_reg2.message}
                    />
                    <InputField
                        label='Certificate Name'
                        registerProps={register("sch_cer2")}
                        type='text'
                        error={errors.sch_cer2 && errors.sch_cer2.message}
                    />
                    <InputField
                        label='Total Marks'
                        registerProps={register("sch_tot_mark2")}
                        type='number'
                        error={errors.sch_tot_mark2 && errors.sch_tot_mark2.message}
                    />
                </Row>

                <hr></hr>
                <div className="form-sub-header">HSC Details</div>
                <Row>
                    <InputField
                        label='Physics Marks Secured'
                        registerProps={register("physics_secured")}
                        type='number'
                        error={errors.physics_secured && errors.physics_secured.message}
                    />
                    <InputField
                        label='Physics Maximum Marks'
                        registerProps={register("physics_max")}
                        type='number'
                        error={errors.physics_max && errors.physics_max.message}
                    />
                    <InputField
                        label='Physics Percentage'
                        registerProps={register("physics_percentage")}
                        type='number'
                        readOnly={true}
                        error={errors.physics_percentage && errors.physics_percentage.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='Chemistry Marks Secured'
                        registerProps={register("chemistry_secured")}
                        type='number'
                        error={errors.chemistry_secured && errors.chemistry_secured.message}
                    />
                    <InputField
                        label='Chemistry Maximum Marks'
                        registerProps={register("chemistry_max")}
                        type='number'
                        error={errors.chemistry_max && errors.chemistry_max.message}
                    />
                    <InputField
                        label='Chemistry Percentage'
                        registerProps={register("chemistry_percentage")}
                        type='number'
                        readOnly={true}
                        error={errors.chemistry_percentage && errors.chemistry_percentage.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='Maths Marks Secured'
                        registerProps={register("maths_secured")}
                        type='number'
                        error={errors.maths_secured && errors.maths_secured.message}
                    />
                    <InputField
                        label='Maths Maximum Marks'
                        registerProps={register("maths_max")}
                        type='number'
                        error={errors.maths_max && errors.maths_max.message}
                    />
                    <InputField
                        label='Maths Percentage'
                        registerProps={register("maths_percentage")}
                        type='number'
                        readOnly={true}
                        error={errors.maths_percentage && errors.maths_percentage.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='Biology Marks Secured'
                        registerProps={register("biology_secured")}
                        type='number'
                        error={errors.biology_secured && errors.biology_secured.message}
                    />
                    <InputField
                        label='Biology Maximum Marks'
                        registerProps={register("biology_max")}
                        type='number'
                        error={errors.biology_max && errors.biology_max.message}
                    />
                    <InputField
                        label='Biology Percentage'
                        registerProps={register("biology_percentage")}
                        type='number'
                        readOnly={true}
                        error={errors.biology_percentage && errors.biology_percentage.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='CS Marks Secured'
                        registerProps={register("cs_secured")}
                        type='number'
                        error={errors.cs_secured && errors.cs_secured.message}
                    />
                    <InputField
                        label='CS Maximum Marks'
                        registerProps={register("cs_max")}
                        type='number'
                        error={errors.cs_max && errors.cs_max.message}
                    />
                    <InputField
                        label='CS Percentage'
                        registerProps={register("cs_percentage")}
                        type='number'
                        readOnly={true}
                        error={errors.cs_percentage && errors.cs_percentage.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='Total Marks Secured'
                        registerProps={register("pcm_sec")}
                        type='number'
                        readOnly={true}
                        error={errors.pcm_sec && errors.pcm_sec.message}
                    />
                    <InputField
                        label='Total Maximum Marks'
                        registerProps={register("pcm_max")}
                        type='number'
                        readOnly={true}
                        error={errors.pcm_max && errors.pcm_max.message}
                    />
                    <InputField
                        label='Total Percentage'
                        registerProps={register("pcm_per")}
                        type='number'
                        readOnly={true}
                        error={errors.pcm_per && errors.pcm_per.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='Physics + Chemistry Percentage'
                        registerProps={register("phy_che")}
                        type='number'
                        readOnly={true}
                        error={errors.phy_che && errors.phy_che.message}
                    />
                    <InputField
                        label='Maths Percentage'
                        registerProps={register("maths")}
                        type='number'
                        readOnly={true}
                        error={errors.maths && errors.maths.message}
                    />
                    <InputField
                        label='Cutoff'
                        registerProps={register("cut_off")}
                        type='number'
                        readOnly={true}
                        error={errors.cut_off && errors.cut_off.message}
                    />
                </Row>

                <hr></hr>
                <div className="form-sub-header">Diploma/UG/PG Details</div>
                <Row>
                    <InputField
                        label='I sem Marks Secured'
                        registerProps={register("diploma_first_sec")}
                        type='number'
                        error={errors.diploma_first_sec && errors.diploma_first_sec.message}
                    />
                    <InputField
                        label='I sem Maximum Marks'
                        registerProps={register("diploma_first_max")}
                        type='number'
                        error={errors.diploma_first_sec && errors.diploma_first_sec.message}
                    />
                    <InputField
                        label='I sem percentage'
                        registerProps={register("diploma_first_per")}
                        type='number'
                        readOnly={true}
                        error={errors.diploma_first_per && errors.diploma_first_per.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='II sem Marks Secured'
                        registerProps={register("diploma_second_sec")}
                        type='number'
                        error={errors.diploma_second_sec && errors.diploma_second_sec.message}
                    />
                    <InputField
                        label='II sem Maximum Marks'
                        registerProps={register("diploma_second_max")}
                        type='number'
                        error={errors.diploma_second_max && errors.diploma_second_max.message}
                    />
                    <InputField
                        label='II sem percentage'
                        registerProps={register("diploma_second_per")}
                        type='number'
                        readOnly={true}
                        error={errors.diploma_second_per && errors.diploma_second_per.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='III sem Marks Secured'
                        registerProps={register("diploma_third_sec")}
                        type='number'
                        error={errors.diploma_third_sec && errors.diploma_third_sec.message}
                    />
                    <InputField
                        label='III sem Maximum Marks'
                        registerProps={register("diploma_third_max")}
                        type='number'
                        error={errors.diploma_third_max && errors.diploma_third_max.message}
                    />
                    <InputField
                        label='III sem percentage'
                        registerProps={register("diploma_third_per")}
                        type='number'
                        readOnly={true}
                        error={errors.diploma_third_per && errors.diploma_third_per.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='IV sem Marks Secured'
                        registerProps={register("diploma_fourth_sec")}
                        type='number'
                        error={errors.diploma_fourth_sec && errors.diploma_fourth_sec.message}
                    />
                    <InputField
                        label='IV sem Maximum Marks'
                        registerProps={register("diploma_fourth_max")}
                        type='number'
                        error={errors.diploma_fourth_max && errors.diploma_fourth_max.message}
                    />
                    <InputField
                        label='IV sem percentage'
                        registerProps={register("diploma_fourth_per")}
                        type='number'
                        readOnly={true}
                        error={errors.diploma_fourth_per && errors.diploma_fourth_per.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='V sem Marks Secured'
                        registerProps={register("diploma_fifth_sec")}
                        type='number'
                        error={errors.diploma_fifth_sec && errors.diploma_fifth_sec.message}
                    />
                    <InputField
                        label='V sem Maximum Marks'
                        registerProps={register("diploma_fifth_max")}
                        type='number'
                        error={errors.diploma_fifth_max && errors.diploma_fifth_max.message}
                    />
                    <InputField
                        label='V sem percentage'
                        registerProps={register("diploma_fifth_per")}
                        type='number'
                        readOnly={true}
                        error={errors.diploma_fifth_per && errors.diploma_fifth_per.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='VI sem Marks Secured'
                        registerProps={register("diploma_sixth_sec")}
                        type='number'
                        error={errors.diploma_sixth_sec && errors.diploma_sixth_sec.message}
                    />
                    <InputField
                        label='VI sem Maximum Marks'
                        registerProps={register("diploma_sixth_max")}
                        type='number'
                        error={errors.diploma_sixth_max && errors.diploma_sixth_max.message}
                    />
                    <InputField
                        label='VI sem percentage'
                        registerProps={register("diploma_sixth_per")}
                        type='number'
                        readOnly={true}
                        error={errors.diploma_sixth_per && errors.diploma_sixth_per.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='VII sem Marks Secured'
                        registerProps={register("diploma_seventh_sec")}
                        type='number'
                        error={errors.diploma_seventh_sec && errors.diploma_seventh_sec.message}
                    />
                    <InputField
                        label='VII sem Maximum Marks'
                        registerProps={register("diploma_seventh_max")}
                        type='number'
                        error={errors.diploma_seventh_max && errors.diploma_seventh_max.message}
                    />
                    <InputField
                        label='VII sem percentage'
                        registerProps={register("diploma_seventh_per")}
                        type='number'
                        readOnly={true}
                        error={errors.diploma_seventh_per && errors.diploma_seventh_per.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='VIII sem Marks Secured'
                        registerProps={register("diploma_eighth_sec")}
                        type='number'
                        error={errors.diploma_eighth_sec && errors.diploma_eighth_sec.message}
                    />
                    <InputField
                        label='VIII sem Maximum Marks'
                        registerProps={register("diploma_eighth_max")}
                        type='number'
                        error={errors.diploma_eighth_max && errors.diploma_eighth_max.message}
                    />
                    <InputField
                        label='VIII sem percentage'
                        registerProps={register("diploma_eighth_per")}
                        type='number'
                        readOnly={true}
                        error={errors.diploma_eighth_per && errors.diploma_eighth_per.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='IX sem Marks Secured'
                        registerProps={register("diploma_ninenth_sec")}
                        type='number'
                        error={errors.diploma_ninenth_sec && errors.diploma_ninenth_sec.message}
                    />
                    <InputField
                        label='IX sem Maximum Marks'
                        registerProps={register("diploma_ninenth_max")}
                        type='number'
                        error={errors.diploma_ninenth_max && errors.diploma_ninenth_max.message}
                    />
                    <InputField
                        label='IX sem percentage'
                        registerProps={register("diploma_ninenth_per")}
                        type='number'
                        readOnly={true}
                        error={errors.diploma_ninenth_per && errors.diploma_ninenth_per.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='X sem Marks Secured'
                        registerProps={register("diploma_tenth_sec")}
                        type='number'
                        error={errors.diploma_tenth_sec && errors.diploma_tenth_sec.message}
                    />
                    <InputField
                        label='X sem Maximum Marks'
                        registerProps={register("diploma_tenth_max")}
                        type='number'
                    />
                    <InputField
                        label='X sem percentage'
                        registerProps={register("diploma_tenth_per")}
                        type='number'
                        readOnly={true}
                        error={errors.diploma_tenth_per && errors.diploma_tenth_per.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='UG sem Marks Secured'
                        registerProps={register("ug_mark_sec")}
                        type='number'
                        error={errors.ug_mark_sec && errors.ug_mark_sec.message}
                    />
                    <InputField
                        label='UG sem Maximum Marks'
                        registerProps={register("ug_mark_max")}
                        type='number'
                        error={errors.ug_mark_max && errors.ug_mark_max.message}
                    />
                    <InputField
                        label='UG sem percentage'
                        registerProps={register("ug_mark_per")}
                        type='number'
                        readOnly={true}
                        error={errors.ug_mark_per && errors.ug_mark_per.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='I + II Percentage'
                        registerProps={register("I_II")}
                        type='number'
                        readOnly={true}
                        error={errors.I_II && errors.I_II.message}
                    />
                    <InputField
                        label='III + IV Percentage'
                        registerProps={register("III_IV")}
                        type='number'
                        readOnly={true}
                        error={errors.III_IV && errors.III_IV.message}
                    />
                    <InputField
                        label='V + VI Percentage'
                        registerProps={register("V_VI")}
                        type='number'
                        readOnly={true}
                        error={errors.V_VI && errors.V_VI.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='VII + VIII Percentage'
                        registerProps={register("VII_VIII")}
                        type='number'
                        readOnly={true}
                        error={errors.VII_VIII && errors.VII_VIII.message}
                    />
                    <InputField
                        label='IX + X Percentage'
                        registerProps={register("IX_X")}
                        type='number'
                        readOnly={true}
                        error={errors.IX_X && errors.IX_X.message}
                    />
                </Row>
                <Row>
                    <InputField
                        label='Entrance Marks Secured'
                        registerProps={register("entrance_secured")}
                        type='number'
                        error={errors.entrance_secured && errors.entrance_secured.message}
                    />
                    <InputField
                        label='Entrance Maximum Marks'
                        registerProps={register("entrance_max")}
                        type='number'
                        error={errors.entrance_max && errors.entrance_max.message}
                    />
                    <InputField
                        label='Entrance percentage'
                        registerProps={register("entrance_percenteage")}
                        type='number'
                        readOnly={true}
                        error={errors.entrance_percenteage && errors.entrance_percenteage.message}
                    />
                </Row>
            </Form>
        </div>
    )
}

export default MarkDetails