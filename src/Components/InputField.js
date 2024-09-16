import '../css/InputField.css';

function InputField(props) {
    return (
        <div>
            <div className='InputField'>
                <div className='inputfield-label'>{props.label}</div>
                <input
                    className='inputfield'
                    type={props.type}
                    {...props.registerProps}
                    // onChange={props.onChange}
                    // value={props.value}
                    disabled={props.disabled}
                />
            </div>
            <div className='inputfield-error'>{props.error}</div>
        </div>
    )
}

export default InputField