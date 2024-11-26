import { useAuth } from "../components/context/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import {getOrganizationByName} from "../services/client.js";
import {useEffect, useState} from "react";
import OrganizationPageComponent from "../components/dashboard/organizationPage/OrganizationPageComponent.jsx";

export default function OrganizationPage() {
    const { fullUser, isAdmin } = useAuth();
    const { name: organizationName } = useParams();
    const navigate = useNavigate()
    const [organization, setOrganization] = useState()

    const fetchOrganization =() =>{
        getOrganizationByName(organizationName)
            .then((res) =>{
                setOrganization(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    useEffect(() => {
        fetchOrganization()
    }, [organizationName]);

    return (
        <OrganizationPageComponent isAdmin={isAdmin} organization={organization} fullUser={fullUser}/>
    );

}