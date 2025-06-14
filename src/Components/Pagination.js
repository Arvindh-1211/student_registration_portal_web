import { useSelector } from 'react-redux';
import '../css/Pagination.css'

import { NavLink, useLocation } from "react-router-dom";

function Pagination() {
    const location = useLocation()
    const auth = useSelector((state) => state.auth)

    const routes = [
        '/personal_details',
        '/parent_details',
        '/address_details',
        '/contact_details',
        '/tnea_details',
        '/scholarship_details',
        '/mark_details',
        '/additional_details',
    ]

    console.log(auth);
    
    if (auth?.role === 'MANAGEMENT') {
        routes.splice(routes.indexOf('/tnea_details'), 1)
    }

    return (
        routes.includes(location.pathname) &&
        (
            < div className='paginationContainer' >
                <div className='pagination'>
                    {routes.map((route, index) => (
                        <NavLink key={index + 1} to={route}>
                            <div>{index + 1}</div>
                        </NavLink>
                    ))}
                </div>
            </div >
        )
    )
}

export default Pagination