import React from 'react'
import ImportStudent from '../Components/ImportStudent'
import AddUser from '../Components/AddUser'
import ProtectedComponent from '../Components/ProtectedComponent'

function AdminHome() {
    return (
        <div>
            <ProtectedComponent users={['admin']}>
                <AddUser />
            </ProtectedComponent>

            <ImportStudent />
        </div>
    )
}

export default AdminHome