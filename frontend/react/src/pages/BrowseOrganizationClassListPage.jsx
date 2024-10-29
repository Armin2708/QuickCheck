import {Box, Button, Stack, Wrap, WrapItem} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    getClassesOfUserInOrganization,
    getOrganizationClasses
} from "../services/client.js";
import SideBar from "../components/shared/SideBar.jsx";
import HeaderFooter from "../components/shared/HeaderFooter.jsx";
import BrowseClassCard from "../components/class/BrowseClassCard.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import CreateClassButton from "../components/class/CreateClassButton.jsx";
import {useAuth} from "../components/context/AuthContext.jsx";


export default function BrowseOrganizationClassListPage() {
    const [classes, setClasses] = useState([]);
    const [joinedClass, setJoinedClass] = useState([]);

    const {name:organizationName} = useParams()
    const {fullUser,isUserAdmin} = useAuth()

    const navigate = useNavigate();


    const fetchClasses = () => {
        if (!organizationName){
            return
        }
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
        if (!fullUser && !fullUser.id) {
            return
        }
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
            fetchClasses();
            fetchUserClasses();
    }, [fullUser,organizationName]);

    return (
        <HeaderFooter>
            <SideBar />
            <Wrap justify={"center"}>
                <Box p="4">
                    <Stack direction={"row"}>
                        <Button
                            onClick={()=>{
                                navigate(`/organization/${organizationName}`)
                            }}
                            leftIcon={<FaArrowLeft />}
                        >
                            Return
                        </Button>
                        {isUserAdmin() &&<CreateClassButton onSuccess={fetchClasses} />}
                    </Stack>
                    <Wrap justify={"center"} spacing={"30px"}>
                        {Array.isArray(classes) && classes.length > 0 ? (
                            classes.map((classObject) => (
                                <WrapItem key={classObject.id}>
                                        <BrowseClassCard {...classObject} joinedClass={joinedClass} />
                                </WrapItem>
                            ))
                        ) : (
                            <WrapItem>No Classes in {organizationName}.</WrapItem>
                        )}
                    </Wrap>
                </Box>
            </Wrap>
        </HeaderFooter>
    );
}
