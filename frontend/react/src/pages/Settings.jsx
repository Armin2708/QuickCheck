import {
    Text,
} from "@chakra-ui/react";
import HeadSection from "../components/HeadSection.jsx";
import UserProfileCard from "../components/userProfile/UserProfileCard.jsx";
import PageWrap from "../components/PageWrap.jsx";

export default function Settings(){
    return(
        <PageWrap pageName={"Settings"}>
            <HeadSection/>

            <Text>Settings Page Coming Soon...</Text>

        </PageWrap>
    )
}