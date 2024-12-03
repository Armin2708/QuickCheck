import {Box, Button, Stack, Wrap, WrapItem} from "@chakra-ui/react";
import { useEffect, useState } from "react";


import BrowseClassCard from "../components/dashboard/browseClass/BrowseClassCard.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import CreateClassButton from "../components/dashboard/browseClass/CreateClassButton.jsx";
import {useAuth} from "../components/context/AuthContext.jsx";
import {getClassesOfUserInOrganization, getOrganizationClasses} from "../services/client/classes.js";
import {getOrganizationByName} from "../services/client/organizations.js";


export default function BrowseClassPage() {
    const [classes, setClasses] = useState([]);
    const [joinedClass, setJoinedClass] = useState([]);
    const [organization, setOrganization] = useState()


    const {name:organizationName} = useParams()
    const {fullUser,isAdmin,isInstructor} = useAuth()

    const navigate = useNavigate();

    const fetchOrganization = () =>{
        getOrganizationByName(organizationName)
            .then((res) =>{
                setOrganization(res.data)
            })
            .catch((err) =>{
                console.log(err)
            })
    }


    const fetchClasses = () => {
        getOrganizationClasses(organizationName)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setClasses(res.data);
                } else {
                    console.error("Expected an array but got:", res.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching classrooms:", error);
            });
    };

    const fetchUserClasses = () => {
        getClassesOfUserInOrganization(fullUser.id,organizationName)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setJoinedClass(res.data);
                } else {
                    console.error("Expected an array but got:", res.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching classrooms:", error);
            });
    };

    useEffect(() => {
        if (fullUser && organizationName){
            fetchClasses();
            fetchUserClasses();
            fetchOrganization()
        }
    }, [fullUser,organizationName]);

    return (
            <Wrap justify={"center"}>
                <Box p="4">
                    <Stack direction={"row"}>
                        <Button
                            onClick={()=>{
                                navigate(`/dashboard/${organizationName}`)
                            }}
                            leftIcon={<FaArrowLeft />}
                        >
                            Return
                        </Button>
                        {(isAdmin() || isInstructor()) && <CreateClassButton onSuccess={fetchClasses} organizationName={organizationName} organizationId={organization?.id} fullUser={fullUser} />}
                    </Stack>
                    <Wrap justify={"center"} spacing={"30px"}>
                        {Array.isArray(classes) && classes.length > 0 ? (
                            classes.map((classObject) => (
                                <WrapItem key={classObject.id}>
                                        <BrowseClassCard {...classObject} joinedClass={joinedClass} userId={fullUser?.id} />
                                </WrapItem>
                            ))
                        ) : (
                            <WrapItem>No Classes in {organizationName}.</WrapItem>
                        )}
                    </Wrap>
                </Box>
            </Wrap>
    );
}
