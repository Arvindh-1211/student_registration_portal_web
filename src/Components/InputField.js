import '../css/InputField.css';

function InputField(props) {
    return (
        <div>
            <div className='InputField'>
                <div className='inputfield-label'>
                    {props.label}
                    {props.required && <span className='required'>*</span>}
                </div>
                <input
                    className='inputfield'
                    type={props.type}
                    placeholder={props.placeholder}
                    {...props.registerProps}
                    readOnly={props.readOnly}
                    step='0.01'
                    autoComplete={props.autoComplete}
                />
            </div>
            <div className='inputfield-error'>{props.error}</div>
        </div>
    )
}

export default InputField