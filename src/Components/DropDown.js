import '../css/DropDown.css'

function DropDown({ label, options, registerProps, value, error, required, sorted = true }) {

    let sorted_options = options ? Object.entries(options) : undefined;

    sorted_options = (sorted && options) ? Object.entries(options).sort((a, b) => a[1].localeCompare(b[1])) : sorted_options;


    return (
        <div>
            <div className='dropDown'>
                <div className='dropdown-label'>
                    {label}
                    {required && <span className='required'>*</span>}
                </div>
                <select className='dropdown' {...registerProps}>
                    {sorted_options &&
                        sorted_options.map(element => (
                            <option key={element[0]} value={value === "value" ? element[1] : element[0]}>
                                {element[1]}
                            </option>
                        ))

                    }
                </select>
            </div>
            <div className='dropdown-error'>{error}</div>
        </div>
    )
}

export default DropDown
