import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import PageWrap from "../components/PageWrap.jsx";
import HeadSection from "../components/HeadSection.jsx";
import SearchBar from "../components/shared/SearchBar.jsx";
import UserListComponent from "../components/userList/UserListComponent.jsx";
import {getUsers, searchUsers} from "../services/client/users.js";

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
        fetchUsers();
    }, []);

    return (
            <PageWrap pageName={"Users"}>
                <HeadSection>
                    <SearchBar
                        fetchSearch={fetchUsersOnSearch}
                        fetchAll={fetchUsers}
                        search={search}
                        setSearch={setSearch}/>
                </HeadSection>

                <UserListComponent users={users} fetchUsers={fetchUsers}/>

            </PageWrap>
    );
}
