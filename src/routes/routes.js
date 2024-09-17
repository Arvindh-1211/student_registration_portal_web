import LandingPage from "../pages/LandingPage";
import PersonalDetails from "../pages/PersonalDetails";
import ParentDetails from "../pages/ParentDetails";

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
]

export default routes;