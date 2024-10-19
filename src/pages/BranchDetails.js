import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import "../css/BranchDetails.css"

import services from '../services/services'
import { setApplicationNo } from '../store/applicationNoSlice'

function BranchCard(props) {
    return (
        <div className='branchCard'>
            <div className='branch-degree'>{props.degree}</div>
            <div>{props.branch}</div>
            {(props.degree === "B.E." || props.degree === "B.Tech.") ? (
                <div className='button-container'>
                    <input className='button' type='button' value="Regular" onClick={props.regular} />
                    <input className='button' type='button' value="Lateral" onClick={props.lateral} />
                </div>
            ) : (
                <div className='button-container'>
                    <input className='button' type='button' value="Apply Now!" onClick={props.regular} />
                </div>
            )}
        </div>
    )
}

function BranchDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // const [courses, setCourses] = useState()
    const [branchDet, setBranchDet] = useState()
    const application_no = useSelector((state) => state.applicationNo.value)

    // useEffect(() => {
    //     const fetchCourses = async () => {
    //         const result = await services.fetchFromMaster('branch')
    //         setCourses(result)
    //     }
    //     fetchCourses()
    // }, [])

    useEffect(() => {
        if (branchDet) {
            handleSubmit()
        }
    }, [branchDet]);

    const courses = [
        { "course_id": 1, "branch_name": "CIVIL ENGINEERING" },
        { "course_id": 1, "branch_name": "AERONAUTICAL ENGINEERING" },
        { "course_id": 1, "branch_name": "COMPUTER SCIENCE AND ENGINEERING" },
        { "course_id": 1, "branch_name": "ELECTRICAL AND ELECTRONICS ENGINEERING" },
        { "course_id": 1, "branch_name": "ELECTRONICS AND COMMUNICATION ENGINEERING" },
        { "course_id": 1, "branch_name": "ELECTRONICS AND INSTRUMENTATION ENGINEERING" },
        { "course_id": 1, "branch_name": "MECHANICAL ENGINEERING" },
        { "course_id": 9, "branch_name": "INFORMATION TECHNOLOGY" },
        { "course_id": 9, "branch_name": "TEXTILE TECHNOLOGY" },
        { "course_id": 9, "branch_name": "BIOTECHNOLOGY" },
        { "course_id": 9, "branch_name": "FASHION TECHNOLOGY" },
        { "course_id": 10, "branch_name": "STRUCTURAL ENGINEERING" },
        { "course_id": 10, "branch_name": "COMPUTER SCIENCE AND ENGINEERING" },
        { "course_id": 10, "branch_name": "POWER ELECTRONICS AND DRIVES" },
        { "course_id": 10, "branch_name": "APPLIED ELECTRONICS" },
        { "course_id": 10, "branch_name": "COMMUNICATION SYSTEMS" },
        { "course_id": 10, "branch_name": "EMBEDDED SYSTEMS" },
        { "course_id": 10, "branch_name": "VLSI DESIGN" },
        { "course_id": 10, "branch_name": "ENGINEERING DESIGN" },
        { "course_id": 10, "branch_name": "CAD/CAM" },
        { "course_id": 10, "branch_name": "SOFTWARE ENGINEERING" },
        { "course_id": 11, "branch_name": "BIOTECHNOLOGY" },
        { "course_id": 12, "branch_name": "COMPUTER APPLICATIONS" },
        { "course_id": 13, "branch_name": "MASTER OF BUSINESS ADMINISTRATION" },
        { "course_id": 14, "branch_name": "SOFTWARE ENGINEERING" },
        { "course_id": 1, "branch_name": "MECHATRONICS" },
        { "course_id": 15, "branch_name": "COMPUTER TECHNOLOGY" },
        { "course_id": 15, "branch_name": "INFORMATION TECHNOLOGY" },
        { "course_id": 10, "branch_name": "COMPUTER INTEGRATED MANUFACTURING" },
        { "course_id": 14, "branch_name": "COMPUTER TECHNOLOGY" },
        { "course_id": 11, "branch_name": "TEXTILE TECHNOLOGY" },
        { "course_id": 9, "branch_name": "INDUSTRIAL BIO TECHNOLOGY" },
        { "course_id": 1, "branch_name": "AUTOMOBILE ENGINEERING" },
        { "course_id": 10, "branch_name": "INDUSTRIAL SAFETY ENGINEERING" },
        { "course_id": 10, "branch_name": "INSTRUMENTATION ENGINEERING" },
        { "course_id": 10, "branch_name": "INDUSTRIAL AUTOMATION & ROBOTICS" },
        { "course_id": 1, "branch_name": "AGRICULTURE ENGINEERING" },
        { "course_id": 9, "branch_name": "FOOD TECHNOLOGY" },
        { "course_id": 16, "branch_name": "INFORMATION AND COMMUNICATION ENGINEERING" },
        { "course_id": 16, "branch_name": "TECHNOLOGY" },
        { "course_id": 16, "branch_name": "CIVIL ENGINEERING" },
        { "course_id": 16, "branch_name": "MECHANICAL ENGINEERING " },
        { "course_id": 16, "branch_name": "ELECTRICAL ENGINEERING" },
        { "course_id": 16, "branch_name": "SCIENCE AND HUMANITIES" },
        { "course_id": 16, "branch_name": "MANAGEMENT SCIENCES" },
        { "course_id": 1, "branch_name": "BIOMEDICAL ENGINEERING" },
        { "course_id": 9, "branch_name": "COMPUTER SCIENCE AND BUSINESS SYSTEMS" },
        { "course_id": 9, "branch_name": "COMPUTER TECHNOLOGY" },
        { "course_id": 1, "branch_name": "INFORMATION SCIENCE AND ENGINEERING" },
        { "course_id": 9, "branch_name": "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE" },
        { "course_id": 9, "branch_name": "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING" },
        { "course_id": 1, "branch_name": "COMPUTER SCIENCE AND DESIGN" },
        { "course_id": 9, "branch_name": "AGRICULTURAL ENGINEERING" },
        { "course_id": 1, "branch_name": "MECHATRONICS ENGINEERING" },
        { "course_id": 16, "branch_name": "ELECTRONICS AND COMMUNICATION ENGINEERING" }
    ]

    courses.sort((a, b) => a.branch_name.localeCompare(b.branch_name));
    courses.sort((a, b) => a.course_id - b.course_id);

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
        <div className='BranchDetails'>
            <div className='course-card'>
                <div className="form-header">Departments</div>
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
            </div>
        </div>
    )
}

export default BranchDetails
