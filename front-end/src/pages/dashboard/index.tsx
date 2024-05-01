import { useGetIdentity } from "@refinedev/core";
import { IIdentity} from "../../interfaces";
import { StudentDashboardPage } from "./studentDashboard";
import { LecturerDashboardPage } from "./lecturerDashboard";
import { redirect } from "react-router-dom";


export const DashboardPage: React.FC = () => {
  const { data: user } = useGetIdentity<IIdentity>();

  // console.log(user);  
  
  if (user?.index) {
    return <StudentDashboardPage />
  }
  else if (user?.id)  {
    return <LecturerDashboardPage />
  }
  else {
    redirect('/student-login')
  }
};
