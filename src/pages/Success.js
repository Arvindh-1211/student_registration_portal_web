import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../css/Success.css';
import { useEffect } from 'react';

function Success() {
    const navigate = useNavigate();
    const applicationNo = useSelector((state) => state.applicationNo.value)
    const campsApplNo = useSelector((state) => state.applicationNo.campsApplNo)

    useEffect(() => {
        if(!campsApplNo){
            navigate('/personal_details')
        }
    }, [])

    const handleClick= () =>{
        navigate('/')
    }

    return (
        <div>
            <div className='success'>
                <div className="success-container">
                    <div className="tick-icon">✓</div>
                    <div className="particles">
                        <div className="particle" style={{ '--x': '-20px', '--y': '15px' }}></div>
                        <div className="particle" style={{ '--x': '25px', '--y': '-5px' }}></div>
                        <div className="particle" style={{ '--x': '25px', '--y': '-15px' }}></div>
                        <div className="particle" style={{ '--x': '-15px', '--y': '25px' }}></div>
                        <div className="particle" style={{ '--x': '-35px', '--y': '10px' }}></div>
                        <div className="particle" style={{ '--x': '35px', '--y': '-10px' }}></div>
                        <div className="particle" style={{ '--x': '-30px', '--y': '-15px' }}></div>
                        <div className="particle" style={{ '--x': '30px', '--y': '15px' }}></div>
                        <div className="particle" style={{ '--x': '15px', '--y': '35px' }}></div>
                    </div>
                    <div className='success-msg'>Success!</div>
                    {/* <div>Application submitted successfully.</div> */}
                    <div className='appl-no'>Application Number : {campsApplNo}</div>
                    <div>Application Number Temp : {applicationNo}</div>
                    <div className='button-container'>
                        <button className='create-btn' onClick={handleClick}>Create another</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Success;