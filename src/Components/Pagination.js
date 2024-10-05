import '../css/Pagination.css'

import { NavLink } from "react-router-dom";

function Pagination() {
    return (
        <div className='paginationContainer'>
            <div className='pagination'>
                <NavLink to='/personal_details'><div>1</div></NavLink>
                <NavLink to='/parent_details'><div>2</div></NavLink>
                <NavLink to='/address_details'><div>3</div></NavLink>
                <NavLink to='/contact_details'><div>4</div></NavLink>
            </div>
        </div>
    )
}

export default Pagination