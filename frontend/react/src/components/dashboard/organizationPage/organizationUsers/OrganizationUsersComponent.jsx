import {Box} from "@chakra-ui/react";
import SearchBar from "../../../shared/SearchBar.jsx";
import UserListComponent from "../../../userList/UserListComponent.jsx";
import {useEffect, useState} from "react";
import {getUsersInOrganization, searchUsersInOrganization} from "../../../../services/client/users.js";

export default function OrganizationUsersComponent({id}){

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search,setSearch] = useState("")

    const fetchUsersInOrganization = () => {
        setLoading(true); // Start loading
        getUsersInOrganization(id)
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
        searchUsersInOrganization(id,search)
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
        if (id){
            fetchUsersInOrganization();
        }
    }, [id]);

    return(
        <Box>
            <SearchBar
                fetchSearch={fetchUsersInOrganizationOnSearch}
                fetchAll={fetchUsersInOrganization}
                search={search}
                setSearch={setSearch}
            />

            <UserListComponent users={users} fetchUsers={fetchUsersInOrganizationOnSearch}/>
        </Box>
    )
}