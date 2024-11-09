import { useNavigate } from 'react-router-dom';
import '../css/Success.css';

function Success() {
    const navigate = useNavigate();
    const handleClick= () =>{
        navigate('/')
    }
    return (
        <div>
            <div className='success'>
                <div className="success-container">
                    <div className="icon">✓</div>
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
                    <div className='h1'>Success!</div>
                    <div>Application submitted successfully.</div>
                    <div className='btns'>
                        <button className='btn' onClick={handleClick}>Create another</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Success;
