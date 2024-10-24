import PresentationSection from "../components/homePage/PresentationSection.jsx";
import SupportedBy from "../components/homePage/SupportedBy.jsx";
import SneakPeek from "../components/homePage/SneakPeek.jsx";
import { Center, Divider, Spinner } from "@chakra-ui/react";
import AdvantageTabs from "../components/homePage/AdvantageTabs.jsx";
import EfficiencySection from "../components/homePage/EfficiencySection.jsx";
import JoinQuickCheck from "../components/homePage/JoinQuickCheck.jsx";
import CommunityComments from "../components/homePage/CommunityComments.jsx";
import HeaderFooter from "../components/shared/HeaderFooter.jsx";
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
        <HeaderFooter>
            <PresentationSection />
            <Divider />
            <SupportedBy />
            <SneakPeek />
            <CommunityComments />
            <AdvantageTabs />
            <EfficiencySection />
            <JoinQuickCheck />
        </HeaderFooter>
    );
}
