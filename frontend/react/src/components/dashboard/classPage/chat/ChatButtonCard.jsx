import {Button, Text} from "@chakra-ui/react";
import React from "react";

export default function ChatButtonCard({id,name,setChatId}){

    const handleOnClick = () =>{
        setChatId(id);
    }
    return(
        <Button onClick={()=> {
            handleOnClick()
        }}>
            <Text>{name}</Text>
        </Button>
    )
}