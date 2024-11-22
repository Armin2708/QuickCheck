import {useAuth} from "../components/context/AuthContext.jsx";

import ClassPageComponent from "../components/dashboard/classPage/ClassPageComponent.jsx";

export default function ClassPage(){

    const {fullUser,isAdmin,isUser} = useAuth()

    return (
            <ClassPageComponent fullUser={fullUser} isUser={isUser} isAdmin={isAdmin}/>
    )
}
