import {
    Button
} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {FaEarthAmericas} from "react-icons/fa6";
import {useContext} from "react";
import {AddIcon} from "@chakra-ui/icons";

// Main Register Component
const BrowseOrganizationButton = () => {
    const navigate = useNavigate();
    const { name } = useParams();
    return(
        <Button
            width={"100%"}
            backgroundColor={"#F9F9F9"}
            color={"#7E3BB5"}
            border={"2px"}
            borderColor={"#F9F9F9"}
            borderRadius={"full"}
            cursor="pointer"
            _hover={{
                transform: "scale(1.05)", // Scale up slightly on hover
                transition: "transform 0.2s ease-in-out"
            }}// Smooth transition effect
            onClick={() => navigate(`/dashboard/organizations`)}
        >
            <AddIcon/>
        </Button>
    )
}

export default BrowseOrganizationButton;
