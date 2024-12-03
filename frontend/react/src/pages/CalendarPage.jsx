import HeadSection from "../components/HeadSection.jsx";
import PageWrap from "../components/PageWrap.jsx";
import Calendar from "../components/calendar/Calendar.jsx";

export default function CalendarPage(){
    return(
        <PageWrap pageName={"Calendar"} >
            <HeadSection/>

            <Calendar/>

        </PageWrap>
    )
}