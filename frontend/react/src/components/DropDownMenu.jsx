import {IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";

export default function DropDownMenu(){
    const navigate = useNavigate();

    const handleUsers = () => {
        navigate("/users"); // Change to the desired route
    };

    const handleAdmins = () => {
        navigate("/admins"); // Change to the desired route
    };

    const handleClassrooms = () => {
        navigate("/classrooms"); // Change to the desired route
    };

    return(
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
            />
            <MenuList>
                <MenuItem icon={<AddIcon />} onClick={handleUsers}>
                    Users
                </MenuItem>
                <MenuItem icon={<ExternalLinkIcon />} onClick={handleAdmins}>
                    Admins
                </MenuItem>
                <MenuItem icon={<RepeatIcon />} onClick={handleClassrooms}>
                    Classrooms
                </MenuItem>
            </MenuList>
        </Menu>
    )
}