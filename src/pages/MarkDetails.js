// Form-5
import { set, useForm, watch } from "react-hook-form";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

import services from "../services/services";

import InputField from '../Components/InputField'
import DropDown from '../Components/DropDown';
import Form from '../Components/Form';
import Row from "../Components/Row";


function MarkDetails() {
    const navigate = useNavigate();
    const applicationNo = useSelector((state) => state.applicationNo.value)

    const [formData, setFormData] = useState({
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

    const [options, setOptions] = useState({
        'school_board': {},
        'sch_qual_id': {},
        'sch_yr_pass': {},
        'sch_study_state': {},
        'study_medium': {},
    })

    const { handleSubmit, reset } = useForm({ defaultValues: formData });
    useEffect(() => {
        const getDefaultValues = async () => {
            const queryParams = Object.keys(formData).join(',')
            const fetchedData = await services.fetchData(applicationNo, queryParams)
            setFormData(fetchedData)
            reset(fetchedData)
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


    const { register, watch, setValue, getValues } = useForm();

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

    const pcmSec = parseFloat(physicsSecured) + parseFloat(chemistrySecured) + parseFloat(mathsSecured);
    const pcmMax = parseFloat(physicsMax) + parseFloat(chemistryMax) + parseFloat(mathsMax);
    setValue('pcm_sec', pcmSec);
    setValue('pcm_max', pcmMax);
    calculatePercentage(pcmSec, pcmMax, 'pcm_per');

    const phyChe = parseFloat(physicsSecured) + parseFloat(chemistrySecured);
    setValue('phy_che', phyChe);
    const phyChePer = phyPer + chePer;
    setValue('phy_che', (phyChePer / 2).toFixed(2));
    setValue('maths', mathPer);

    const cutOff = parseFloat(phyChe) / 2 + parseFloat(mathsSecured);
    setValue('cut_off', cutOff);

    const I_II_per = I_per + II_per;
    setValue('I_II', (I_II_per / 2).toFixed(2));

    const III_IV_per = III_per + IV_per;
    setValue('III_IV', (III_IV_per / 2).toFixed(2));

    const V_VI_per = V_per + VI_per;
    setValue('V_VI', (V_VI_per / 2).toFixed(2));

    const VII_VIII_per = VII_per + VIII_per;
    setValue('VII_VIII', (VII_VIII_per / 2).toFixed(2));

    const IX_X_per = IX_per + X_per;
    setValue('IX_X', (IX_X_per / 2).toFixed(2));


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
                    />
                </Row>
                <Row>
                    <InputField
                        label='TC Number'
                        registerProps={register("school_tc_no")}
                        type='number'
                    />
                    <InputField
                        label='TC Date'
                        registerProps={register("school_tc_date")}
                        type='date'
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
                    />
                    <DropDown
                        label="Study state"
                        options={options['sch_study_state']}
                        registerProps={register("sch_study_state")}
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
                    />
                </Row>

                <hr></hr>
                <div className="form-sub-header">Marksheet Details</div>
                <Row>
                    <InputField
                        label='Register Number 1'
                        registerProps={register("sch_reg1")}
                        type='number'
                    />
                    <InputField
                        label='Certificate Name'
                        registerProps={register("sch_cer1")}
                        type='text'
                    />
                    <InputField
                        label='Total Marks'
                        registerProps={register("sch_tot_mark1")}
                        type='number'
                    />
                </Row>
                <Row>
                    <InputField
                        label='Register Number 2'
                        registerProps={register("sch_reg2")}
                        type='number'
                    />
                    <InputField
                        label='Certificate Name'
                        registerProps={register("sch_cer2")}
                        type='text'
                    />
                    <InputField
                        label='Total Marks'
                        registerProps={register("sch_tot_mark2")}
                        type='number'
                    />
                </Row>

                <hr></hr>
                <div className="form-sub-header">HSC Details</div>
                <Row>
                    <InputField
                        label='Physics Marks Secured'
                        registerProps={register("physics_secured")}
                        type='number'
                    />
                    <InputField
                        label='Physics Maximum Marks'
                        registerProps={register("physics_max")}
                        type='number'
                    />
                    <InputField
                        label='Physics Percentage'
                        registerProps={register("physics_percentage")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='Chemistry Marks Secured'
                        registerProps={register("chemistry_secured")}
                        type='number'
                    />
                    <InputField
                        label='Chemistry Maximum Marks'
                        registerProps={register("chemistry_max")}
                        type='number'
                    />
                    <InputField
                        label='Chemistry Percentage'
                        registerProps={register("chemistry_percentage")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='Maths Marks Secured'
                        registerProps={register("maths_secured")}
                        type='number'
                    />
                    <InputField
                        label='Maths Maximum Marks'
                        registerProps={register("maths_max")}
                        type='number'
                    />
                    <InputField
                        label='Maths Percentage'
                        registerProps={register("maths_percentage")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='Biology Marks Secured'
                        registerProps={register("biology_secured")}
                        type='number'
                    />
                    <InputField
                        label='Biology Maximum Marks'
                        registerProps={register("biology_max")}
                        type='number'
                    />
                    <InputField
                        label='Biology Percentage'
                        registerProps={register("biology_percentage")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='CS Marks Secured'
                        registerProps={register("cs_secured")}
                        type='number'
                    />
                    <InputField
                        label='CS Maximum Marks'
                        registerProps={register("cs_max")}
                        type='number'
                    />
                    <InputField
                        label='CS Percentage'
                        registerProps={register("cs_percentage")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='Total Marks Secured'
                        registerProps={register("pcm_sec")}
                        type='number'
                        readOnly={true}
                    />
                    <InputField
                        label='Total Maximum Marks'
                        registerProps={register("pcm_max")}
                        type='number'
                        readOnly={true}
                    />
                    <InputField
                        label='Total Percentage'
                        registerProps={register("pcm_per")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='Physics + Chemistry Percentage'
                        registerProps={register("phy_che")}
                        type='number'
                        readOnly={true}
                    />
                    <InputField
                        label='Maths Percentage'
                        registerProps={register("maths")}
                        type='number'
                        readOnly={true}
                    />
                    <InputField
                        label='Cutoff'
                        registerProps={register("cut_off")}
                        type='number'
                        readOnly={true}
                    />
                </Row>

                <hr></hr>
                <div className="form-sub-header">Diploma/UG/PG Details</div>
                <Row>
                    <InputField
                        label='I sem Marks Secured'
                        registerProps={register("diploma_first_sec")}
                        type='number'
                    />
                    <InputField
                        label='I sem Maximum Marks'
                        registerProps={register("diploma_first_max")}
                        type='number'
                    />
                    <InputField
                        label='I sem percentage'
                        registerProps={register("diploma_first_per")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='II sem Marks Secured'
                        registerProps={register("diploma_second_sec")}
                        type='number'
                    />
                    <InputField
                        label='II sem Maximum Marks'
                        registerProps={register("diploma_second_max")}
                        type='number'
                    />
                    <InputField
                        label='II sem percentage'
                        registerProps={register("diploma_second_per")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='III sem Marks Secured'
                        registerProps={register("diploma_third_sec")}
                        type='number'
                    />
                    <InputField
                        label='III sem Maximum Marks'
                        registerProps={register("diploma_third_max")}
                        type='number'
                    />
                    <InputField
                        label='III sem percentage'
                        registerProps={register("diploma_third_per")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='IV sem Marks Secured'
                        registerProps={register("diploma_fourth_sec")}
                        type='number'
                    />
                    <InputField
                        label='IV sem Maximum Marks'
                        registerProps={register("diploma_fourth_max")}
                        type='number'
                    />
                    <InputField
                        label='IV sem percentage'
                        registerProps={register("diploma_fourth_per")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='V sem Marks Secured'
                        registerProps={register("diploma_fifth_sec")}
                        type='number'
                    />
                    <InputField
                        label='V sem Maximum Marks'
                        registerProps={register("diploma_fifth_max")}
                        type='number'
                    />
                    <InputField
                        label='V sem percentage'
                        registerProps={register("diploma_fifth_per")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='VI sem Marks Secured'
                        registerProps={register("diploma_sixth_sec")}
                        type='number'
                    />
                    <InputField
                        label='VI sem Maximum Marks'
                        registerProps={register("diploma_sixth_max")}
                        type='number'
                    />
                    <InputField
                        label='VI sem percentage'
                        registerProps={register("diploma_sixth_per")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='VII sem Marks Secured'
                        registerProps={register("diploma_seventh_sec")}
                        type='number'
                    />
                    <InputField
                        label='VII sem Maximum Marks'
                        registerProps={register("diploma_seventh_max")}
                        type='number'
                    />
                    <InputField
                        label='VII sem percentage'
                        registerProps={register("diploma_seventh_per")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='VIII sem Marks Secured'
                        registerProps={register("diploma_eighth_sec")}
                        type='number'
                    />
                    <InputField
                        label='VIII sem Maximum Marks'
                        registerProps={register("diploma_eighth_max")}
                        type='number'
                    />
                    <InputField
                        label='VIII sem percentage'
                        registerProps={register("diploma_eighth_per")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='IX sem Marks Secured'
                        registerProps={register("diploma_ninenth_sec")}
                        type='number'
                    />
                    <InputField
                        label='IX sem Maximum Marks'
                        registerProps={register("diploma_ninenth_max")}
                        type='number'
                    />
                    <InputField
                        label='IX sem percentage'
                        registerProps={register("diploma_ninenth_per")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='X sem Marks Secured'
                        registerProps={register("diploma_tenth_sec")}
                        type='number'
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
                    />
                </Row>
                <Row>
                    <InputField
                        label='UG sem Marks Secured'
                        registerProps={register("ug_mark_sec")}
                        type='number'
                    />
                    <InputField
                        label='UG sem Maximum Marks'
                        registerProps={register("ug_mark_max")}
                        type='number'
                    />
                    <InputField
                        label='UG sem percentage'
                        registerProps={register("ug_mark_per")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='I + II Percentage'
                        registerProps={register("I_II")}
                        type='number'
                        readOnly={true}
                    />
                    <InputField
                        label='III + IV Percentage'
                        registerProps={register("III_IV")}
                        type='number'
                        readOnly={true}
                    />
                    <InputField
                        label='V + VI Percentage'
                        registerProps={register("V_VI")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='VII + VIII Percentage'
                        registerProps={register("VII_VIII")}
                        type='number'
                        readOnly={true}
                    />
                    <InputField
                        label='IX + X Percentage'
                        registerProps={register("IX_X")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
                <Row>
                    <InputField
                        label='Entrance Marks Secured'
                        registerProps={register("entrance_secured")}
                        type='number'
                    />
                    <InputField
                        label='Entrance Maximum Marks'
                        registerProps={register("entrance_max")}
                        type='number'
                    />
                    <InputField
                        label='Entrance percentage'
                        registerProps={register("entrance_percenteage")}
                        type='number'
                        readOnly={true}
                    />
                </Row>
            </Form>
        </div>
    )
}

export default MarkDetails