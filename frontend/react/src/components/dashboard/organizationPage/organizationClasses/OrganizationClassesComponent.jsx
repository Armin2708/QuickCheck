import {Box} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {
    getOrganizationClasses, searchClassesInOrganization,
} from "../../../../services/client/classes.js";
import SearchBar from "../../../shared/SearchBar.jsx";
import OrganizationClassListComponent from "./OrganizationClassListComponent.jsx";
import CreateClassButton from "../../browseClass/CreateClassButton.jsx";

export default function OrganizationClassesComponent({name:organizationName, id:organizationId, isAdmin, fullUser}){
    const [classes, setClasses] = useState([]);
    const [search, setSearch] = useState([])

    const fetchClasses = () => {
        getOrganizationClasses(organizationName)
            .then((res) => {
                setClasses(res.data);
            })
            .catch((error) => {
                console.error("Error fetching classrooms:", error);
            });
    };

    const fetchSearchClasses = (input) => {
        searchClassesInOrganization(organizationName,input)
            .then((res) => {
                setClasses(res.data);
            })
            .catch((error) => {
                console.error("Error fetching classrooms:", error);
            });
    };

    useEffect(() => {
        if (organizationName){
            fetchClasses();
        }
    }, [organizationName]);

    return (

        <Box>
            <SearchBar
                fetchSearch={fetchSearchClasses}
                fetchAll={fetchClasses}
                search={search}
                setSearch={setSearch}
            />
            {isAdmin() && (
                <Box paddingTop={"20px"}>
                    <CreateClassButton onSuccess={fetchClasses} organizationName={organizationName} organizationId={organizationId} fullUser={fullUser}  />
                </Box>
            )}
            <OrganizationClassListComponent organizationName={organizationName} classes={classes} onSuccess={fetchClasses} isAdmin={isAdmin}/>
        </Box>
    );
}