import PresentationSection from "../homePageComponents/PresentationSection.jsx";
import SupportedBy from "../homePageComponents/SupportedBy.jsx";
import SneakPeek from "../homePageComponents/SneakPeek.jsx";
import {Divider} from "@chakra-ui/react";
import AdvantageTabs from "../homePageComponents/AdvantageTabs.jsx";
import EfficiencySection from "../homePageComponents/EfficiencySection.jsx";
import JoinQuickCheck from "../homePageComponents/JoinQuickCheck.jsx";
import CommunityComments from "../homePageComponents/CommunityComments.jsx";
import HeaderFooterWrapper from "../shared/HeaderFooterWrapper.jsx";


export default function HomePage(){
    return(
        <HeaderFooterWrapper>
            <PresentationSection/>
            <Divider/>
            <SupportedBy/>
            <SneakPeek/>
            <CommunityComments/>
            <AdvantageTabs/>
            <EfficiencySection/>
            <JoinQuickCheck/>
        </HeaderFooterWrapper>

    )
}