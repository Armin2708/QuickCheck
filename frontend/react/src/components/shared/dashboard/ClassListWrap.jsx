import DashboardWrap from "./DashboardWrap.jsx";

import ClassListComponent from "../../classList/ClassListComponent.jsx";

export default function ClassListWrap({children}) {

    return (
        <DashboardWrap>
            <ClassListComponent/>
            {children}
        </DashboardWrap>
    );

}