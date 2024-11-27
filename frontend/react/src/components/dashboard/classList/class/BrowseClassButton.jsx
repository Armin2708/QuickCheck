import {
    Button,
} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {AddIcon} from "@chakra-ui/icons";

// Main Register Component
const BrowseClassButton = () => {
    const navigate = useNavigate();
    const { name } = useParams();
    return(
        <Button
            borderRadius={"10px"}
            height={'40px'}
            width={"40px"}
            backgroundColor={"#7E3BB5"}
            color={"white"}

            _active={{
                transform: "scale(1)" // Return to original size when clicked
            }}
            onClick={() => navigate(`/dashboard/${name}/classes`)}
        >
          <AddIcon/>
        </Button>
    )
}

export default BrowseClassButton;
