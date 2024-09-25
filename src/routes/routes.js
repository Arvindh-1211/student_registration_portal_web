import LandingPage from "../pages/LandingPage";
import PersonalDetails from "../pages/PersonalDetails";
import ParentDetails from "../pages/ParentDetails";
import AddressDetails from "../pages/AddressDetails";

const routes = [
    {
        path: '/new',
        element: <LandingPage />
    },
    {
        path: '/personal_details',
        element: <PersonalDetails />
    },
    {
        path: '/parent_details',
        element: <ParentDetails />
    },
    {
        path: '/address_details',
        element: <AddressDetails />
    },
]

export default routes;