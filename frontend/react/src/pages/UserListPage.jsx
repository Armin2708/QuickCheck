import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getOrganizationsOfUser, getUsers, searchUsers} from "../services/client.js";
import {Box, Flex, Spinner, Stack, Text, Wrap, WrapItem, Center} from "@chakra-ui/react";
import UserProfileCard from "../components/userProfile/UserProfileCard.jsx";
import PageWrap from "../components/PageWrap.jsx";
import HeadSection from "../components/HeadSection.jsx";
import UserListSearchBar from "../components/userList/UserListSearchBar.jsx";
import UserListComponent from "../components/userList/UserListComponent.jsx";

export default function UserListPage() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [search,setSearch] = useState("")

    const fetchUsers = () => {
        setLoading(true); // Start loading
        getUsers()
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

    const fetchUsersOnSearch = (search) => {
        setLoading(true); // Start loading
        searchUsers(search)
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
        console.log("UserListPage mounted");
        fetchUsers();
    }, []);

    return (
            <PageWrap pageName={"Users"}>
                <HeadSection>
                    <UserListSearchBar fetch={fetchUsersOnSearch} search={search} setSearch={setSearch}/>
                </HeadSection>

                <UserListComponent users={users} fetchUsers={fetchUsers}/>

            </PageWrap>
    );
}
