import '../css/DropDown.css'

function DropDown({label, options, registerProps, value, error, sorted=true}) {

    const sorted_options = sorted ? Object.values(options).sort() : options;

    return (
        <div>
            <div className='dropdown-label'>{label}</div>
            <select className='dropdown' {...registerProps}>
                {sorted_options &&
                    Object.keys(sorted_options).map((key) => (
                        <option key={key} value={value === "value" ? sorted_options[key] : key}>
                            {sorted_options[key]}
                        </option>
                    ))
                }
            </select>
            <div className='dropdown-error'>{error}</div>
        </div>
    )
}

export default DropDown
