import {
    Button
} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {FaEarthAmericas} from "react-icons/fa6";
import {useContext} from "react";

// Main Register Component
const BrowseOrganizationButton = () => {
    const navigate = useNavigate();
    const { name } = useParams();
    return(
        <Button
            leftIcon={<FaEarthAmericas />
            }
            backgroundColor={"#7E3BB5"}
            color={"white"}

            _active={{
                transform: "scale(1)" // Return to original size when clicked
            }}
            onClick={() => navigate(`/dashboard/organizations`)}
        >
            Browse Organization
        </Button>
    )
}

export default BrowseOrganizationButton;
