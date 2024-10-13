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
<<<<<<< HEAD
                <NavLink to='/tnea_details'><div>5</div></NavLink>
                <NavLink to='/scholarship_details'><div>6</div></NavLink>
                <NavLink to='/mark_details'><div>7</div></NavLink>
                <NavLink to='/additional_details'><div>8</div></NavLink>
=======
                <NavLink to='/mark_details'><div>7</div></NavLink>
>>>>>>> 5d09a2b8761ce4895a74495b2fb82d6caacbffac
            </div>
        </div>
    )
}

export default Pagination