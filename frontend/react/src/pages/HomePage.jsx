import Presentation from "../homePageComponents/Presentation.jsx";
import Header from "../homePageComponents/Header.jsx";
import SupportedBy from "../homePageComponents/SupportedBy.jsx";
import SneakPeek from "../homePageComponents/SneakPeek.jsx";
import {Divider, Stack} from "@chakra-ui/react";
import InfoTabs from "../homePageComponents/Comments.jsx";
import Tabs from "../homePageComponents/Tabs.jsx";
import Efficiency from "../homePageComponents/Efficiency.jsx";
import JoinQuickCheck from "../homePageComponents/JoinQuickCheck.jsx";
import Footer from "../homePageComponents/Footer.jsx";
import Comments from "../homePageComponents/Comments.jsx";
import SideBar from "../shared/SideBar.jsx";


export default function HomePage({children}){
    return(
        <Stack>
            <Header/>
            <SideBar/>
            {/*<Presentation/>
            <Divider/>
            <SupportedBy/>
            <SneakPeek/>
            <Comments/>
            <Tabs/>
            <Efficiency/>
            <JoinQuickCheck/>
            <Footer/>*/}
        </Stack>
    )
}