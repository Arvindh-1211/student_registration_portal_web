import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';

import services from '../services/services'
import { setApplicationNo } from '../store/applicationNoSlice'

function BranchCard(props) {
    return (
        <div className='branchCard'>
            <div>{props.degree}</div>
            <div>{props.branch}</div>
            {(props.degree === "B.E." || props.degree === "B.Tech.") ? (
                <div>
                    <input className='button' type='button' value="Regular" onClick={props.regular} />
                    <input className='button' type='button' value="Lateral" onClick={props.lateral} />
                </div>
            ) : (
                <div>
                    <input className='button' type='button' value="Apply Now!" onClick={props.regular} />
                </div>
            )}
        </div>
    )
}

function BranchDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [courses, setCourses] = useState()
    const [branchDet, setBranchDet] = useState()
    const application_no = useSelector((state) => state.applicationNo.value)

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await services.fetchFromMaster('branch')
            setCourses(result)
        }
        fetchCourses()
    }, [])

    useEffect(() => {
        if (branchDet) {
            handleSubmit()
        }
    }, [branchDet]);

    const degree = {
        1: "B.E.",
        9: "B.Tech.",
        10: "M.E.",
        11: "M.Tech.",
        12: "M.C.A.",
        13: "M.B.A.",
        14: "M.Sc.",
        15: "B.Sc.",
        16: "Ph.D.",
    }

    const handleSubmit = async () => {
        const response = await services.createNewApplication(branchDet)
        dispatch(setApplicationNo(response.application_no))
        navigate('/personal_details')
    }

    return (
        <div className='course-list'>
            {courses &&
                Object.keys(courses).map((key) => {
                    return (
                        <BranchCard
                            key={key}
                            degree={degree[`${courses[key]['course_id']}`]}
                            branch={courses[key]['branch_name']}
                            regular={() => {
                                setBranchDet({ branch_id: key, student_cat_id: 11 })
                            }}
                            lateral={() => {
                                setBranchDet({ branch_id: key, student_cat_id: 12 })
                            }}
                        />
                    )
                })
            }
        </div>
    )
}

export default BranchDetails
