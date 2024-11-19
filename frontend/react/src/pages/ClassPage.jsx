import {useAuth} from "../components/context/AuthContext.jsx";
import DashboardWrap from "../components/dashboard/DashboardWrap.jsx";
import OrganizationListComponent from "../components/dashboard/organizationList/OrganizationListComponent.jsx";
import ClassListComponent from "../components/dashboard/classList/ClassListComponent.jsx";
import ClassPageComponent from "../components/dashboard/classPage/ClassPageComponent.jsx";

export default function ClassPage(){

    const {fullUser,isAdmin,isUser} = useAuth()

    return (
            <ClassPageComponent fullUser={fullUser} isUser={isUser} isAdmin={isAdmin}/>
    )
}
