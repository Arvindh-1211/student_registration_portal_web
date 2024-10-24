import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "../css/BranchDetails.css";

import services from '../services/services';
import { setApplicationNo } from '../store/applicationNoSlice';

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
    );
}

function BranchDetails() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [courses, setCourses] = useState([]); // Initialize as an empty array
    const [branchDet, setBranchDet] = useState();

    useEffect(() => {
        const fetchCourses = async () => {
            const result = await services.fetchFromMaster('branch');
            if (result && typeof result === 'object') {
                const coursesArray = Object.values(result).map(course => ({
                    course_id: course.course_id,
                    branch_name: course.branch_name,
                    branch_id: course.branch_id
                }));

                const sortedBranches = coursesArray.sort((a, b) => a.branch_name.localeCompare(b.branch_name))
                const sortedCourses = sortedBranches.sort((a, b) => a.course_id - b.course_id)

                setCourses(sortedCourses);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        if (branchDet) {
            handleSubmit();
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
    };

    const handleSubmit = async () => {
        const response = await services.createNewApplication(branchDet);
        dispatch(setApplicationNo(response.application_no));
        navigate('/personal_details');
    };

    return (
        <div className='BranchDetails'>
            <div className='course-card'>
                <div className="form-header">DEPARTMENTS</div>
                <div className='course-list'>
                    {courses.map((course) => (
                        <BranchCard
                            key={course.course_id}
                            degree={degree[course.course_id]}
                            branch={course.branch_name}
                            regular={() => {
                                setBranchDet({ branch_id: course.branch_id, student_cat_id: 11 });
                            }}
                            lateral={() => {
                                setBranchDet({ branch_id: course.branch_id, student_cat_id: 12 });
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BranchDetails;