import PresentationSection from "../components/homePage/PresentationSection.jsx";
import SupportedBy from "../components/homePage/SupportedBy.jsx";
import SneakPeek from "../components/homePage/SneakPeek.jsx";
import {Center, Divider, Spinner, Stack, useColorModeValue} from "@chakra-ui/react";
import AdvantageTabs from "../components/homePage/AdvantageTabs.jsx";
import EfficiencySection from "../components/homePage/EfficiencySection.jsx";
import JoinQuickCheck from "../components/homePage/JoinQuickCheck.jsx";
import CommunityComments from "../components/homePage/CommunityComments.jsx";
import HeaderFooterWrap from "../components/homePage/headerFooter/HeaderFooterWrap.jsx";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Font loading with preload and CSS rules should prevent this from flashing,
        // but this hook is a fallback in case.
        if (document.fonts.check("1em 'Inter'")) {
            setIsReady(true); // Font already loaded
        } else {
            // Wait for font to load
            document.fonts.load("1em 'Inter'").then(() => setIsReady(true));
        }
    }, []);

    if (!isReady) {
        // Show a spinner while the font is loading
        return (
            <Center minH="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    return (
        <HeaderFooterWrap>
            <Stack direction={"column"} spacing={"0px"} align="center" justify="center" paddingX={"20px"} bg={"white"}>
                <PresentationSection />
                <Divider background={"#F1F1F1"}/>
                <SupportedBy />
                <SneakPeek />
                <CommunityComments />
                <AdvantageTabs />
                <EfficiencySection />
                <JoinQuickCheck />
            </Stack>
        </HeaderFooterWrap>
    );
}
