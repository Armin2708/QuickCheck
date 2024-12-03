import {Box} from "@chakra-ui/react";
import SearchBar from "../../../shared/SearchBar.jsx";
import UserListComponent from "../../../userList/UserListComponent.jsx";
import {useEffect, useState} from "react";
import {getUsersInOrganization, searchUsersInOrganization} from "../../../../services/client/users.js";
import OrganizationUserListComponent from "./OrganizationUserListComponent.jsx";

export default function OrganizationUsersComponent({id:organizationId,name:organizationName}){

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search,setSearch] = useState("")

    const fetchUsersInOrganization = () => {
        setLoading(true); // Start loading
        getUsersInOrganization(organizationId)
            .then(res => {
                if (Array.isArray(res.data)) {
                    setUsers(res.data);
                } else {
                    console.error('Expected an array but got:', res.data);
                }
            })
            .catch(error => {
                console.error('Error users:', error);
            })
            .finally(() => {
                setLoading(false); // Stop loading after fetch
            });
    };

    const fetchUsersInOrganizationOnSearch = (search) => {
        setLoading(true); // Start loading
        searchUsersInOrganization(organizationId,search)
            .then(res => {
                setUsers(res.data);
            })
            .catch(error => {
                console.error('Error users:', error);
            })
            .finally(() => {
                setLoading(false); // Stop loading after fetch
            });
    };

    useEffect(() => {
        if (organizationId){
            fetchUsersInOrganization();
        }
    }, [organizationId]);

    return(
        <Box>
            <SearchBar
                fetchSearch={fetchUsersInOrganizationOnSearch}
                fetchAll={fetchUsersInOrganization}
                search={search}
                setSearch={setSearch}
            />

            <OrganizationUserListComponent
                users={users}
                fetchUsers={fetchUsersInOrganization}
                organizationId={organizationId}
                organizationName={organizationName}
            />
        </Box>
    )
}