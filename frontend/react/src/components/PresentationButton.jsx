import {Button, Text} from "@chakra-ui/react";

export default function PresentationButton({children,width,height,color, hoverColor,clickColor, handleNavigate}){
    return(
        <Button
            paddingX="20px"
            paddingY="20px"
            borderRadius="10px"
            justify="center"
            align="center"
            background={color}
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
            width={width}
            height={height}
            _hover={{ background: hoverColor }}  // Hover effect
            _active={{
                transform: "scale(0.95)",  // Scale down a bit on click
                background: clickColor,  // Change background when active
            }}
            onClick={handleNavigate}
        >
            {children}
        </Button>
    )
}