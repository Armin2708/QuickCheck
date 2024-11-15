import {Center, Spinner, VStack} from "@chakra-ui/react";

import { useAuth } from "../components/context/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import WeeklyCalendar from "../components/classList/Calendar.jsx";
import NotificationComponent from "../components/dashboard/notifications/NotificationComponent.jsx";
import LeaveOrganizationButton from "../components/dashboard/organizationList/LeaveOrganizationButton.jsx";
import ClassListWrap from "../components/shared/dashboard/ClassListWrap.jsx";

export default function ClassListPage({}) {

    const weeklyTasks = {
        Monday: ["Team meeting at 10 AM", "Project deadline at 3 PM"],
        Tuesday: ["Doctor's appointment at 2 PM", "Gym session at 5 PM"],
        Wednesday: ["Work on report", "Dinner with friends"],
        Thursday: ["Client presentation at 1 PM"],
        Friday: ["Submit weekly update", "Watch a movie"],
        Saturday: ["Family picnic", "Grocery shopping"],
        Sunday: ["Relax and plan next week"],
    };
    const { fullUser } = useAuth();
    const { name: organizationName } = useParams();
    const navigate = useNavigate()

    return (
        <ClassListWrap>
            <WeeklyCalendar tasks={weeklyTasks} orgName={organizationName} />
            <VStack>
                <NotificationComponent/>
                <LeaveOrganizationButton
                    name={organizationName}
                    onSuccess={() =>{
                        navigate("/dashboard")
                    }}
                    fullUser={fullUser}/>
            </VStack>
        </ClassListWrap>
    );

}