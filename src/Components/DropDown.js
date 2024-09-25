import '../css/DropDown.css'

function DropDown(props) {
    return (
        <div>
            <div className='dropdown-label'>{props.label}</div>
            <select className='dropdown' {...props.registerProps}>
                {Object.keys(props.options).map((key) => (
                    <option key={key} value={key} selected={props.value === key}>
                        {props.options[key]}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DropDown
