import '../css/DropDown.css'

function DropDown(props) {
    return (
        <div>
            <div className='dropdown-label'>{props.label}</div>
            <select className='dropdown' {...props.registerProps}>
                {props.options &&
                    Object.keys(props.options).map((key) => (
                        <option key={key} value={props.value === "value" ? props.options[key] : key}>
                            {props.options[key]}
                        </option>
                    ))
                }
            </select>
            <div className='dropdown-error'>{props.error}</div>
        </div>
    )
}

export default DropDown
