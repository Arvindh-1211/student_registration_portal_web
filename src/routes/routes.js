import BranchDetails from "../pages/BranchDetails";
import PersonalDetails from "../pages/PersonalDetails";
import ParentDetails from "../pages/ParentDetails";
import AddressDetails from "../pages/AddressDetails";
import ContactDetails from "../pages/ContactDetails";
import TNEADetails from "../pages/TNEADetails";
import ScholarshipDetails from "../pages/ScholarshipDetails";
import AdditionalDetails from "../pages/AdditionalDetails";
import MarkDetails from "../pages/MarkDetails";

const routes = [
    {
        path: '/',
        element: <BranchDetails />
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
    {
        path: '/contact_details',
        element: <ContactDetails />
    },
    {
        path: '/tnea_details',
        element: <TNEADetails />
    },
    {
        path: '/scholarship_details',
        element: <ScholarshipDetails />
    },
    {
        path: '/additional_details',
        element: <AdditionalDetails />
    },
    {
        path: '/mark_details',
        element: <MarkDetails />
    },
]

export default routes;