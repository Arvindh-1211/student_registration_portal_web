import LandingPage from "../pages/LandingPage";
import PersonalDetails from "../pages/PersonalDetails";

const routes = [
    {
        path: '/new',
        element: <LandingPage />
    },
    {
        path: '/personal_details',
        element: <PersonalDetails />
    },
]

export default routes;