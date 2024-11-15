import {
    Box,
    Button, Image
} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {FaEarthAmericas} from "react-icons/fa6";
import {useContext} from "react";
import {AddIcon} from "@chakra-ui/icons";

// Main Register Component
const BrowseClassButton = () => {
    const navigate = useNavigate();
    const { name } = useParams();
    return(
        <Button
            borderRadius={"20px"}
            height={'70px'}
            width={"70px"}
            backgroundColor={"#7E3BB5"}
            color={"white"}

            _active={{
                transform: "scale(1)" // Return to original size when clicked
            }}
            onClick={() => navigate(`/organization/${name}/classes`)}
        >
          <AddIcon/>
        </Button>
    )
}

export default BrowseClassButton;
